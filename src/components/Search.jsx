import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./../BooksAPI";
import ListBooks from "./ListBooks";

export default class Search extends React.PureComponent {
  state = {
    books: [],
    query: ""
  };

  /**
   * @description Queries for books to search
   * @constructor
   * @param {Event} event - The onChange event
   */
  queryBooks = event => {
    const query = event.target.value;
    this.setState({ query });

    if (!query) {
      this.setState({ books: [] });

      return;
    }

    BooksAPI.search(query).then(books => {
      Array.isArray(books)
        ? Promise.all(books.map(book => BooksAPI.get(book.id))).then(books =>
            this.setState({ books })
          )
        : this.setState({ books: [] });
    });
  };

  /**
   * @description Updates the shelf of an existing book
   * @constructor
   * @param {object} bookToUpdate - Book object
   * @param {string} newShelf - New shelf the book will be linked to
   */
  updateBook = (bookToUpdate, newShelf) => {
    const { updateBook } = this.props;

    updateBook(bookToUpdate, newShelf).then(() => {
      const books = this.state.books.map(book => {
        if (book.id === bookToUpdate.id) {
          book.shelf = newShelf;
        }

        return book;
      });

      this.setState({ books });
    });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              value={this.state.query}
              onChange={this.queryBooks}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <ListBooks books={this.state.books} updateBook={this.updateBook} />
          </ol>
        </div>
      </div>
    );
  }
}
