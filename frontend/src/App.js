import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Navbar from './components/Navbar.js';
import PostList from './components/PostList.js'; // Your Home component
import Login from './components/Login.js'; // Your Login component
import Register from './components/Register.js'; // Your Register component
import PostForm from './components/PostForm.js'; // Your NewPost component
import Home from './components/Home.js';
import PostDetail from './components/PostDetail.js';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-post" element={<PostForm />} />
        <Route path="/postList" element={<PostList/>}/>
        <Route path="/posts/:id" element={<PostDetail />} />

      </Routes>
    </Router>
  );
}

export default App;
