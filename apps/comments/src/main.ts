/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  CommentCreatedEvent,
  CommentUpdatedEvent,
  Event,
  EventType,
  ModerationComment,
  ModerationStatus,
  isCommentModeratedEvent
} from "@udemy.com/global/types"
import axios from "axios";
import * as bodyParser from "body-parser";
import * as express from 'express';
import * as morgan from "morgan";
import * as process from 'process';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

const commentsByPostId: Record<string, Record<string, ModerationComment>> = {};

interface Params {
  id: string;
}

app.post("/events", (req, res) => {
  const event: Event = req.body;

  if (isCommentModeratedEvent(event)) {
    const { id, postId, status } = event.data;
    if (commentsByPostId[postId] !== undefined && commentsByPostId[postId][id] !== undefined) {
      commentsByPostId[postId][id].status = status;

      const event: CommentUpdatedEvent = {
        data: {
          id,
          postId,
          status,
        },
        type: EventType.CommentUpdated,
      }
      axios.post("http://localhost:4005/events", event).catch((error) => console.error(error));
    }
  } else {
    res.status(400).send({ status: "Invalid event" });
    return;
  }
  res.status(201).send()
})

app.get('/posts/:id/comments', (req, res) => {
  const { id: postId }: Params = req.params
  res.send(Object.values(commentsByPostId[postId] ?? {}));
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = uuidv4();
  const { id: postId }: Params = req.params
  const { content }: { content: string; } = req.body;
  if (commentsByPostId[postId] === undefined) {
    commentsByPostId[postId] = {}
  }
  commentsByPostId[postId][commentId] = { content, id: commentId, status: ModerationStatus.Pending };

  const event: CommentCreatedEvent = {
    data: {
      ...commentsByPostId[postId][commentId],
      postId,
    },
    type: EventType.CommentCreated,
  }
  axios.post("http://localhost:4005/events", event).catch((error) => console.error(error));

  res.status(201).send(Object.values(commentsByPostId[postId]))
});

const port = process.env.PORT || 4001;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);

process.on('SIGINT', () => {
  console.info("Process interrupted")
  process.exit(0)
})
