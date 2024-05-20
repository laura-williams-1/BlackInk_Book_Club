import { useEffect, useState } from "react";
const API_URL = import.meta.env.API_URL;
const RAPIDAPI_KEY = import.meta.env.REACT_APP_RAPIDAPI_KEY;
const RAPIDAPI_HOST = import.meta.env.REACT_APP_RAPIDAPI_HOST;

const BooksCarousel = () => {
  const [books, setBooks] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
        const response = await fetch(`${API_URL}/african`, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const { data } = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      }
    }
    getBooks();
  }, []);
  console.log(API_URL);
  return (
    <div>
      <ul>
        {books.map((book) => (
          <div key={book.bookId}>
            <li>
              <h3>{book.title}</h3>
            </li>
            <li>{book.author}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default BooksCarousel;
