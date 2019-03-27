import React from "react";
import "./App.css";
import Search from "./components/Search";
import BooksList from "./components/BooksList";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class BooksApp extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path="/" component={BooksList} />
            <Route path="/search" component={Search} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
