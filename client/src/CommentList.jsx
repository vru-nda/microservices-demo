import axios from 'axios';
import React, {useEffect, useState} from 'react';

const CommentList = ({postId}) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`,
    );
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentList;
