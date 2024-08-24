const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');
const auth = require('./auth');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;
const secret = process.env.JWT_SECRET;

app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  auth.registerUser(username, password, (err, user) => {
    if (err) return res.status(500).json({ message: err });
    res.status(201).json(user);
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  auth.loginUser(username, password, (err, result) => {
    if (err) return res.status(400).json({ message: err });
    res.json(result);
  });
});

app.post('/verify-token', (req, res) => {
  const token = req.body.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  auth.verifyToken(token, (err, user) => {
    if (err) return res.status(401).json({ success: false, message: err });
    res.json({ success: true, user });
  });
});


app.post('/posts', (req, res) => {
  const { title, content, userId } = req.body;
  console.log('Received POST request at /posts');
  console.log('Request body:', req.body);

  const stmt = db.prepare('INSERT INTO Post (title, content, userId) VALUES (?, ?, ?)');
  stmt.run([title, content, userId], function (err) {
    if (err) {
      console.error('Error creating post:', err.message);
      res.status(500).json({ message: 'Error creating post', error: err.message });
    } else {
      console.log('Post created with id:', this.lastID);
      res.status(201).json({ id: this.lastID, title, content, userId });
    }
  });
  stmt.finalize();
});

// Retrieve all posts
app.get('/posts', (req, res) => {
  console.log('Received GET request at /posts');

  const stmt = db.prepare('SELECT * FROM Post');
  stmt.all((err, rows) => {
    if (err) {
      console.error('Error fetching posts:', err.message);
      res.status(500).json({ message: 'Error fetching posts', error: err.message });
    } else {
      console.log('Posts retrieved:', rows);
      res.json(rows);
    }
  });
  stmt.finalize();
});

// Retrieve a single post by id
app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  console.log(`Received GET request for post with id: ${id}`);

  const stmt = db.prepare('SELECT * FROM Post WHERE id = ?');
  stmt.get([id], (err, row) => {
    if (err) {
      console.error('Database error:', err.message);
      res.status(500).json({ message: 'Database error', error: err.message });
    } else if (row) {
      console.log('Post found:', row);
      res.json(row);
    } else {
      console.log('Post not found');
      res.status(404).json({ message: 'Post not found' });
    }
  });
  stmt.finalize();
});

app.get('/posts', (req, res) => {
  const searchTerm = req.query.search || '';
  console.log('Received GET request at /posts with search term:', searchTerm);

  const stmt = db.prepare('SELECT * FROM Post WHERE title LIKE ?');
  stmt.all(`%${searchTerm}%`, (err, rows) => {
    if (err) {
      console.error('Error fetching posts:', err.message);
      res.status(500).json({ message: 'Error fetching posts', error: err.message });
    } else {
      console.log('Posts retrieved:', rows);
      res.json(rows);
    }
  });
  stmt.finalize();
});

// Retrieve comments for a post
app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  console.log(`Received GET request for comments of post with id: ${id}`);

  const stmt = db.prepare('SELECT * FROM Comments WHERE postId = ?');
  stmt.all([id], (err, rows) => {
    if (err) {
      console.error('Error fetching comments:', err.message);
      res.status(500).json({ message: 'Error fetching comments', error: err.message });
    } else {
      res.json(rows);
    }
  });
  stmt.finalize();
});

// Add a comment to a post
app.post('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const userId = req.body.userId || null;

  console.log(`Received POST request to add comment to post with id: ${id}`);

  const stmt = db.prepare('INSERT INTO Comments (text, postId, userId) VALUES (?, ?, ?)');
  stmt.run([text, id, userId], function (err) {
    if (err) {
      console.error('Error adding comment:', err.message);
      res.status(500).json({ message: 'Error adding comment', error: err.message });
    } else {
      res.status(201).json({ id: this.lastID, text, postId: id, userId });
    }
  });
  stmt.finalize();
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
