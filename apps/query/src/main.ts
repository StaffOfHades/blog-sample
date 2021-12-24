/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  Event,
  PostAggregate,
  isCommentCreatedEvent,
  isCommentUpdatedEvent,
  isPostCreatedEvent
} from "@udemy.com/global/types"
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as morgan from "morgan";

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

const posts: Record<string, PostAggregate>  = {};

app.post("/events", (req, res) => {
  const event: Event = req.body;

  if (isPostCreatedEvent(event)) {
    posts[event.data.id] = { ...event.data, comments: {} };
  } else if (isCommentCreatedEvent(event)) {
    const { postId, ...comment } = event.data;
    if (posts[postId] !== undefined) {
      posts[postId].comments[comment.id] = comment;
    }
  } else if (isCommentUpdatedEvent(event)) {
    const { id, postId, ...comment } = event.data;
    if (posts[postId] !== undefined && posts[postId].comments[id] !== undefined) {
      posts[postId].comments[id] = {
        ...posts[postId].comments[id],
        ...comment,
      }
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
