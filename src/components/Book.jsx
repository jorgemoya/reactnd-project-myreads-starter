import React from "react";
import ShelfSwitcher from "./ShelfSwitcher";

export default class Book extends React.Component {
  updateShelf = newShelf => {
    const { book, updateBook } = this.props;

    updateBook(book, newShelf);
  };

  render() {
    const { book } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${
                book.imageLinks ? book.imageLinks.thumbnail : ""
              }")`
            }}
          />
          <ShelfSwitcher shelf={book.shelf} updateShelf={this.updateShelf} />
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && (
          <div className="book-authors">{book.authors.join(", ")}</div>
        )}
      </div>
    );
  }
}
