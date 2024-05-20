import { useEffect, useState } from "react";
const API_URL = process.env.API_URL;
const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.REACT_APP_RAPIDAPI_HOST;

const BooksCarousel = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadingModal = <h1>Loading...</h1>;
  const errorModal = <h1>Oops we have an Error:{error}</h1>;
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
        // console.log("fetch", fetch(`${API_URL}/african`, options));
        const response = await fetch(`${API_URL}/african`, options);
        if (!response.ok) {
          // console.log("error", error);
          throw new Error(`Error: ${response.statusText}`);
        }
        const booksData = await response.json();

        if (booksData) {
          setBooks(booksData);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }

    getBooks();
  }, []);

  if (loading) {
    return loadingModal;
  }
  if (error) {
    return errorModal;
  }
  const booksList = (
    <div>
      <ul>
        {books.map((book) => (
          <div key={book.bookId}>
            <li>
              <h3>{book.title}</h3>
            </li>{" "}
            <img src={book.imgUrl} alt={book.title}></img>
            <li>{book.authors}</li>
            <img></img>
          </div>
        ))}
      </ul>
    </div>
  );
  console.log([books]);
  return <div>{booksList}</div>;
};

export default BooksCarousel;
