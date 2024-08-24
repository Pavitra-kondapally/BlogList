import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await axios.get(`http://localhost:4000/posts/${id}`);
        const commentsResponse = await axios.get(`http://localhost:4000/posts/${id}/comments`);
        setPost(postResponse.data);
        setComments(commentsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post and comments:', error);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:4000/posts/${id}/comments`, { text: commentText }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments([...comments, { text: commentText }]);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="post-detail-container">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <h3>Comments</h3>
      <div className="comments-section">
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment, index) => (
            <p key={index}>{comment.text}</p>
          ))
        )}
      </div>
      <textarea
        placeholder="Add a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button onClick={handleCommentSubmit}>Submit Comment</button>
    </div>
  );
}

export default PostDetail;
