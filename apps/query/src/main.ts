/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as bodyParser from "body-parser";
import * as morgan from "morgan";

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

const posts = {};

app.post("/events", (req, res) => {
  const { data, type } = req.body;

  if (type === "PostCreated") {
    posts[data.id] = { ...data, comments: [] };
  } else if (type === "CommentCreated") {
    const { postId, ...comment } = data;
    if (posts[postId] !== undefined) {
      posts[postId].comments.push(comment);
    }
  } else {
    res.status(400).send({ status: "Invalid event" });
    return;
  }
  res.status(201).send()
})

app.get('/posts', (req, res) => {
  res.send(posts);
});

const port = process.env.port || 4002;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
