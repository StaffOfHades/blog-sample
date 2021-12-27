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
import axios from "axios";
import * as bodyParser from "body-parser";
import * as express from 'express';
import * as morgan from "morgan";
import * as process from 'process';

const eventBusService = process.env.EVENTS_SERVICE || "http://localhost:4005"

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

const posts: Record<string, PostAggregate>  = {};

const handleEvent = (event: Event): Event | undefined => {
  if (isPostCreatedEvent(event)) {
    posts[event.data.id] = { ...event.data, comments: {} };

    return undefined;
  }

  if (isCommentCreatedEvent(event)) {
    const { postId, ...comment } = event.data;
    if (posts[postId] !== undefined) {
      posts[postId].comments[comment.id] = comment;
    }

    return undefined
  }

  if (isCommentUpdatedEvent(event)) {
    const { id, postId, ...comment } = event.data;
    if (posts[postId] !== undefined && posts[postId].comments[id] !== undefined) {
      posts[postId].comments[id] = {
        ...posts[postId].comments[id],
        ...comment,
      }
    }

    return undefined;
  }

  return event;
}

app.post("/events", (req, res) => {
  const event: Event = req.body;

  if (handleEvent(event) !== undefined) {
    res.status(204).send();
    return;
  }
  res.status(201).send()
})

app.get('/posts', (req, res) => {
  res.send(posts);
});

const port = process.env.PORT || 4002;
const server = app.listen(port, async () => {
  console.log(`Listening at http://localhost:${port}/`);

  try {
    const { data } = await axios.get<Array<Event>>(`${eventBusService}/events`)
    for (let event of data) {
      if (handleEvent(event) === undefined) {
        console.log("Processing existing event of type ", event.type)
      }
    }
  } catch (error) {
    console.error(error)
  }
});
server.on('error', console.error);

process.on('SIGINT', () => {
  console.info("Process interrupted")
  process.exit(0)
})
process.on('SIGTERM', () => {
  console.info("Process terminated")
  process.exit(0)
})
