import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Listen for new comments from the server
  useEffect(() => {
    socket.on('newComment', (comment) => {
      setComments((prevComments) => [...prevComments, comment]);
    });
  }, []);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the new comment to the server
    socket.emit('newComment', newComment);

    // Clear the input field
    setNewComment('');
  };

  return (
    <div>
      <h1>Live Comments</h1>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <button type='submit'>Add Comment</button>
      </form>
    </div>
  );
}

export default App;
