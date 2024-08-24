import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className='home-container'>
      <img
        src='https://cm.magefan.com/magefan_blog/blog-apps.png'
        className='blog-image'
        alt='Blog List'
      />
      <h2 className='welcome-style'>This blog application allows users to view and interact with a list of blog posts, individual post details, and add new posts. It includes user authentication, a comment system, and search functionality.</h2>
    </div>
  );
};

export default Home;