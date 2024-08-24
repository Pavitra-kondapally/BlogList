import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostForm.css';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to add posts.');
      // Redirect to login page if needed or keep user on the same page
      // navigate('/login?message=login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Title and content are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4000/posts', { title, content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (error) {
      setError(`Failed to create post: ${error.message}`);
    }
  };

  return (
    <div className="post-form">
      <h2>Create a New Post</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {localStorage.getItem('token') ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
         <p></p>
      )}
    </div>
  );
}

export default PostForm;
