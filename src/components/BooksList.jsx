import React from "react";
import { Link } from "react-router-dom";
import CurrentlyReading from "./Bookshelves/CurrentlyReading";
import WantToRead from "./Bookshelves/WantToRead";
import Read from "./Bookshelves/Read";

export default class BooksList extends React.PureComponent {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <CurrentlyReading />
            <WantToRead />
            <Read />
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
