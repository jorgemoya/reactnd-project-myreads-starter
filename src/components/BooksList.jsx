import React from "react";
import { Link } from "react-router-dom";
import CurrentlyReading from "./Bookshelves/CurrentlyReading";
import WantToRead from "./Bookshelves/WantToRead";
import Read from "./Bookshelves/Read";
import * as BooksAPI from "./../BooksAPI";

export default class BooksList extends React.PureComponent {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      console.log(books);
      const currentlyReading = books.filter(
        book => book.shelf === "currentlyReading"
      );

      const wantToRead = books.filter(book => book.shelf === "wantToRead");

      const read = books.filter(book => book.shelf === "read");

      this.setState({ currentlyReading, wantToRead, read });
    });
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <CurrentlyReading books={this.state.currentlyReading} />
            <WantToRead books={this.state.wantToRead} />
            <Read books={this.state.read} />
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
