import React from 'react';
import './Header.css';

function Header() {
  return (
    <header>
      <h1>My Blog</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/new">New Post</a>
      </nav>
    </header>
  );
}

export default Header;
