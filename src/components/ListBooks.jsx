import React from "react";
import Book from "./Book";

export default class ListBooks extends React.PureComponent {
  render() {
    const { books, updateBook } = this.props;

    return (
      <>
        {books.map(book => (
          <li key={book.id}>
            <Book book={book} updateBook={updateBook} />
          </li>
        ))}
      </>
    );
  }
}
