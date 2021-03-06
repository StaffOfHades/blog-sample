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
import * as bodyParser from "body-parser";
import * as express from 'express';
import * as morgan from "morgan";
import * as process from 'process';

const eventBusService = process.env.EVENTS_SERVICE || "http://localhost:4005"

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
    axios.post(`${eventBusService}/events`, moderationEvent).catch((error) => console.error(error));
  } else {
    res.status(204).send();
    return;
  }
  res.status(201).send()
})

const port = process.env.PORT || 4003;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
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
