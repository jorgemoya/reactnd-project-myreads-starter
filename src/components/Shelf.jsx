import React from "react";
import ListBooks from "./ListBooks";

const Shelf = props => {
  const { books, title, updateBook } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          <ListBooks books={books} updateBook={updateBook} />
        </ol>
      </div>
    </div>
  );
};

export default Shelf;
