import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./../BooksAPI";
import Shelf from "./Shelf";

const SHELVES = {
  CURRENTLY_READING: "currentlyReading",
  WANT_TO_READ: "wantToRead",
  READ: "read"
};

export default class BooksList extends React.PureComponent {
  state = {
    shelf: {
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

      this.setState({ shelf: { currentlyReading, wantToRead, read } });
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
          shelf: {
            currentlyReading: books[0],
            wantToRead: books[1],
            read: books[2]
          }
        })
      );
    });
  };

  render() {
    const { currentlyReading, wantToRead, read } = this.state.shelf;

    return (
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
            <Shelf books={read} title="Read" updateBook={this.updateBook} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}
