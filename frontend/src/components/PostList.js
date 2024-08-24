import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="post-list-container">
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="search-icon"></i>
        </div>
      </div>
      <div className="post-list">
        {filteredPosts.length === 0 ? (
          <p>No Posts found!</p>
        ) : (
          filteredPosts.map((post) => (
            <div className="post-card" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content.substring(0, 100)}...</p>
              <Link to={`/posts/${post.id}`}>Read More</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PostList;
