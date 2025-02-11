const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];

  res.status(200).send(comments);
});

app.post('/posts/:id/comments', async (req, res) => {
  const {content} = req.body;
  const commentId = randomBytes(4).toString('hex');

  // find the comments for the postid
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({id: commentId, content, status: 'pending'});

  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {id: commentId, content, status: 'pending', postId: req.params.id},
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  const {type, data} = req.body;

  if (type === 'CommentModerated') {
    const {id, postId, content, status} = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);

    comment.status = status;

    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        content,
        status,
        postId,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => console.log('Listening on port 4001'));
