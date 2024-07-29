import React, {useState} from 'react';
import axios from 'axios';

const CommentCreate = ({postId}) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      `http://localhost:4001/posts/${postId}/comments`,
      {
        content,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    setContent('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='content'>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type='text'
            className='form-control mb-3'
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
