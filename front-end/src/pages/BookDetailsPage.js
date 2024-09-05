import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function BookDetailsPage() {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}books/${id}`)
      .then(response => {
        setBook(response.data.data.book)
      })
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className='d-flex justify-content-center'>
      <div>
        <h1>Book Details</h1>
        <p><strong>Title:</strong> {book.title}</p>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Year:</strong> {book.year}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <Link to="/" className='btn btn-primary'>Back to Home</Link>
      </div>
    </div>
  );
}

export default BookDetailsPage;
