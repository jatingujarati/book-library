import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate()
  const handleApi = async () => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/books`)
        .then(response => setBooks(response.data.data.books))
        .catch(error => console.error('Error fetching books:', error));
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    handleApi()
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/books/${id}`).then(() => handleApi());
        setBooks(books.filter(book => book.id !== id));
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const handleView = (id) => {
    navigate(`book/${id}`)
  }
  const handleEdit = (id) => {
    navigate(`edit/${id}`)
  }

  const handleSearch = async (search) => {
    await axios.get(`${process.env.REACT_APP_API_URL}/books?search=${search}`).then((response) => setBooks(response.data.data.books));
  }

  return (
    <div className="container mt-4" >
      <div className='d-flex justify-content-between'>
        <h1>Book List</h1>
        <div className='d-flex gap-2 form-group align-items-end mb-2'>
          <input type='text' className='form-control' placeholder='Search' onChange={(e) => handleSearch(e.target.value)} />
          <button className="btn btn-primary" onClick={() => navigate("/add")}>Add</button>
        </div>
      </div>
      <table border="1" cellPadding="10" cellSpacing="0" className="table" >
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Genre</th>
            <th className='d-flex justify-content-center' >Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>{book.genre}</td>
              <td className='d-flex justify-content-center gap-1'>
                <button className='btn btn-success btn-sm' onClick={() => handleView(book._id)}>View Details</button>
                <button className='btn btn-secondary btn-sm' onClick={() => handleEdit(book._id)}>Edit</button>
                <button className='btn btn-danger btn-sm' onClick={() => handleDelete(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
