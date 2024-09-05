import React from 'react';
import { Link } from 'react-router-dom';

function BookList({ books }) {
  return (
    <ul>
      {books.map(book => (
        <li key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.year}</p>
          <p>{book.genre}</p>
          <Link to={`/edit/${book._id}`}><button>Edit</button></Link>
          <Link to={`/book/${book._id}`}><button>View Details</button></Link>
        </li>
      ))}
    </ul>
  );
}

export default BookList;
