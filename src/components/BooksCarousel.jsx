import { useEffect, useState } from "react";
const API_URL = process.env.API_URL;
const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.REACT_APP_RAPIDAPI_HOST;

const BooksCarousel = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    async function getBooks() {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": RAPIDAPI_HOST,
        },
      };
      try {
        const response = await fetch(`${API_URL}/african`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`, options);
        }
        const { data } = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      }
    }
    getBooks();
  }, []);
  console.log(books);
  return <div>{/* <ul>{books.maps((book, (key = {book.})))}</ul> */}</div>;
};

export default BooksCarousel;
