import React from "react";
import ListBooks from "./ListBooks";

export default class Shelf extends React.PureComponent {
  render() {
    const { books, title, updateBook } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <ListBooks books={books} updateBook={updateBook} />
      </div>
    );
  }
}
