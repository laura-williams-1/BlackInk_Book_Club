import { useEffect, useState } from "react";
const API_URL = process.env.API_URL;
const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.REACT_APP_RAPIDAPI_HOST;

const BooksCarousel = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadingMessage = <h1>Loading...</h1>;
  const errorMessage = <h1>{error}</h1>;

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
        console.log("Fetching books from:", `${API_URL}/african`, options);
        const response = await fetch(`${API_URL}/african`, options);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response text:", errorText);
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const jsonResponse = await response.json();
        console.log("JSON Response:", jsonResponse);

        if (jsonResponse && jsonResponse.data) {
          setBooks(jsonResponse.data);
        } else {
          throw new Error("Data format error: No data property in response");
        }

        setLoading(false);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message);
        setLoading(false);
      }
    }

    getBooks();
  }, []);

  console.log("Environment Variables:", {
    API_URL,
    RAPIDAPI_HOST,
    RAPIDAPI_KEY,
    books,
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Oops, we have an error: {error}</h1>;
  }

  const booksList = (
    <div>
      <ul>
        {books.map((book) => (
          <div key={book.bookId}>
            <li>
              <h3>{book.title}</h3>
            </li>
            <li>{book.author}</li>
            <img
              className="book-cover"
              src={book.imgUrl}
              alt={`Book cover of ${book.title}`}
            />
          </div>
        ))}
      </ul>
    </div>
  );

  if (loading) {
    return loadingMessage;
  }

  if (error) {
    return <h1>Oops, we have an error: {error}</h1>;
  }

  return <booksList />;
};

export default BooksCarousel;
