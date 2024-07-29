const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];

  res.status(200).send(comments);
});

app.post('/posts/:id/comments', (req, res) => {
  const {content} = req.body;
  const commentId = randomBytes(4).toString('hex');

  // find the comments for the postid
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({id: commentId, content});

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () => console.log('Listening on port 4001'));
