/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  CommentModeratedEvent,
  Event,
  EventType,
  ModerationStatus,
  isCommentCreatedEvent
} from "@udemy.com/global/types"
import axios from 'axios';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as morgan from "morgan";

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.post("/events", (req, res) => {
  const event: Event = req.body;

  if (isCommentCreatedEvent(event)) {
    const { content, id, postId } = event.data;

    const status = new RegExp(/orange/gi).test(content) ? ModerationStatus.Denied : ModerationStatus.Approved

    const moderationEvent: CommentModeratedEvent = {
      data: {
        id,
        postId,
        status,
      },
      type: EventType.CommentModerated,
    }
    axios.post("http://localhost:4005/events", moderationEvent).catch((error) => console.error(error));
  } else {
    res.status(400).send({ status: "Invalid event" });
    return;
  }
  res.status(201).send()
})

const port = process.env.port || 4003;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
