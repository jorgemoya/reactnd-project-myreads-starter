import React from "react";
import "./App.css";
import Search from "./components/Search";
import Shelf from "./components/Shelf";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

const SHELVES = {
  CURRENTLY_READING: "currentlyReading",
  WANT_TO_READ: "wantToRead",
  READ: "read"
};

class BooksApp extends React.Component {
  state = {
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      const currentlyReading = books.filter(
        book => book.shelf === SHELVES.CURRENTLY_READING
      );
      const wantToRead = books.filter(
        book => book.shelf === SHELVES.WANT_TO_READ
      );
      const read = books.filter(book => book.shelf === SHELVES.READ);

      this.setState({ shelves: { currentlyReading, wantToRead, read } });
    });
  }

  updateBook = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(shelf => {
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
            <Route path="/search" component={Search} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
