import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditBook() {
  const [book, setBook] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/books/${id}`)
      .then(response => {
        setBook(response.data.data.book);
        setTitle(response.data.data.book.title);
        setAuthor(response.data.data.book.author);
        setYear(response.data.data.book.year);
        setGenre(response.data.data.book.genre);
      })
      .catch(error => console.error('Error fetching book:', error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/books/${id}`, { title, author, year, genre })
      .then(() => navigate('/'))
  };

  if (!book) return <p>Loading...</p>;

  return (

    <>
      <div className='d-flex justify-content-center'>
        <div className='w-25'>
          <h1>Edit Book</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input className="form-control" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Author</label>
              <input className="form-control" type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Year</label>
              <input className="form-control" type="number" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Genre</label>
              <input className="form-control" type="text" placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} required />
            </div>
            <div className='d-grid'>
              <button type="submit" class="btn btn-primary" >Edit book</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditBook;
