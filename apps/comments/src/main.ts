/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const { id: postId } = req.params
  res.send(Object.values(commentsByPostId[postId] ?? {}));
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = uuidv4();
  const { id: postId } = req.params
  const { content } = req.body;
  if (commentsByPostId[postId] === undefined) {
    commentsByPostId[postId] = {}
  }
  commentsByPostId[postId][commentId] = { content, id: commentId };

  res.status(201).send(Object.values(commentsByPostId[postId]))
});

const port = process.env.port || 4001;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
