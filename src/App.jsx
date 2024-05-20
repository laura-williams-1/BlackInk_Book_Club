import "./App.css";
import NavBar from "./components/NavBar";
import BooksCarousel from "./components/BooksCarousel";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <NavBar />
      <BooksCarousel />
    </div>
  );
}

export default App;
