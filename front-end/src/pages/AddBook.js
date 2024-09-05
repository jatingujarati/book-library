import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/books`, { title, author, year, genre })
      .then(() => navigate('/'))
      .catch(error => console.error('Error adding book:', error));
  };

  return (
    <>
      <div className='d-flex justify-content-center'>
        <div className='w-25'>
          <h1>Add Book</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title <span className='text-danger'>*</span></label>
              <input className="form-control" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Author <span className='text-danger'>*</span></label>
              <input className="form-control" type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Year <span className='text-danger'>*</span></label>
              <input className="form-control" type="number" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Genre <span className='text-danger'>*</span></label>
              <input className="form-control" type="text" placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} required />
            </div>
            <div className='d-grid'>
              <button type="submit" class="btn btn-primary" >Add book</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddBook;
