import React from "react";
import ShelfSwitcher from "./ShelfSwitcher";

const Book = props => {
  const { book, updateBook } = props;

  /**
   * @description Updates the shelf of an existing book
   * @constructor
   * @param {string} newShelf - New shelf the book will be linked to
   */
  function updateShelf(newShelf) {
    updateBook(book, newShelf);
  }

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
        <ShelfSwitcher shelf={book.shelf} updateShelf={updateShelf} />
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors && (
        <div className="book-authors">{book.authors.join(", ")}</div>
      )}
    </div>
  );
};

export default Book;
