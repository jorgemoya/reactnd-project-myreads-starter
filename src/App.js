import React from "react";
import "./App.css";
import Search from "./components/Search";
import Shelf from "./components/Shelf";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

export const SHELVES = {
  CURRENTLY_READING: "currentlyReading",
  WANT_TO_READ: "wantToRead",
  READ: "read"
};

class BooksApp extends React.PureComponent {
  state = {
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      const currentlyReading = [];
      const wantToRead = [];
      const read = [];

      books.forEach(book => {
        switch (book.shelf) {
          case SHELVES.CURRENTLY_READING:
            currentlyReading.push(book);
            break;
          case SHELVES.WANT_TO_READ:
            wantToRead.push(book);
            break;
          case SHELVES.READ:
            read.push(book);
            break;
          default:
            break;
        }
      });

      this.setState({ shelves: { currentlyReading, wantToRead, read } });
    });
  }

  updateBook = (book, newShelf) => {
    return BooksAPI.update(book, newShelf).then(shelf => {
      Promise.all([
        Promise.all(
          shelf.currentlyReading.map(bookId =>
            BooksAPI.get(bookId).then(book => book)
          )
        ),
        Promise.all(
          shelf.wantToRead.map(bookId =>
            BooksAPI.get(bookId).then(book => book)
          )
        ),
        Promise.all(
          shelf.read.map(bookId => BooksAPI.get(bookId).then(book => book))
        )
      ]).then(books =>
        this.setState({
          shelves: {
            currentlyReading: books[0],
            wantToRead: books[1],
            read: books[2]
          }
        })
      );
    });
  };

  render() {
    const { currentlyReading, wantToRead, read } = this.state.shelves;

    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      <Shelf
                        books={currentlyReading}
                        title="Currently Reading"
                        updateBook={this.updateBook}
                      />
                      <Shelf
                        books={wantToRead}
                        title="Want to Read"
                        updateBook={this.updateBook}
                      />
                      <Shelf
                        books={read}
                        title="Read"
                        updateBook={this.updateBook}
                      />
                    </div>
                  </div>
                  <div className="open-search">
                    <Link to="/search">
                      <button>Add a book</button>
                    </Link>
                  </div>
                </div>
              )}
            />
            <Route
              path="/search"
              render={() => <Search updateBook={this.updateBook} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
