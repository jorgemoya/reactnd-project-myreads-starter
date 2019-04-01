import React from "react";

const ShelfSwitcher = props => {
  const { shelf, updateShelf } = props;

  return (
    <div className="book-shelf-changer">
      <select
        value={shelf ? shelf : "none"}
        onChange={e => updateShelf(e.target.value)}
      >
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default ShelfSwitcher;
