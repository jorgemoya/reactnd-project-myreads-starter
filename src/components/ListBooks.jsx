import React from "react";
import Book from "./Book";

const ListBooks = props => {
  const { books, updateBook } = props;

  return (
    <>
      {books.map(book => (
        <li key={book.id}>
          <Book book={book} updateBook={updateBook} />
        </li>
      ))}
    </>
  );
};

export default ListBooks;
