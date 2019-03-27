import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./../BooksAPI";
import Shelf from "./Shelf";

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
            <Shelf
              books={this.state.currentlyReading}
              title="Currently Reading"
            />
            <Shelf books={this.state.wantToRead} title="Want to Read" />
            <Shelf books={this.state.read} title="Read" />
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
