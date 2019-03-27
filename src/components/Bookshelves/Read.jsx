import React from "react";
import Book from "../Book";

export default class Read extends React.PureComponent {
  render() {
    const { books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book book={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
