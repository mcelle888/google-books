import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import BookList from "./containers/ResultsContainer/BookList";
import Nav from "./components/Navigation/Nav";
import { SearchProvider } from "./context/SearchContext";
import { getBooksfromSearch } from "./services/google-books-service";

function App() {
  return (
    <SearchProvider>
      <section>
        <Header />
        <BookList />
        <Nav />
      </section>
    </SearchProvider>
  );
}

export default App;

