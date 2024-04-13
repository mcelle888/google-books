import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import BookList from "./containers/ResultsContainer/BookList";
import { SearchProvider } from "./context/SearchContext";

function App() {
  
  return (
    <SearchProvider>
      <section>
        <Header />
        <BookList />
      </section>
    </SearchProvider>
  );
}

export default App;

