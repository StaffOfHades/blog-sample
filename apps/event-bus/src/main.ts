/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Event } from "@udemy.com/global/types"
import axios from "axios"
import * as bodyParser from "body-parser";
import * as express from 'express';
import * as morgan from "morgan";
import * as process from 'process';

const commentsService = process.env.COMMENTS_SERVICE || "http://localhost:4001"
const moderationService = process.env.MODERATION_SERVICE || "http://localhost:4003"
const postsService = process.env.POSTS_SERVICE || "http://localhost:4000"
const queryService = process.env.QUERY_SERVICE || "http://localhost:4002"

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

const events: Array<Event> = []

app.get('/events', (req, res) => {
  res.send(events)
})

app.post('/events', (req, res) => {
  const event: Event = req.body;
  events.push(event)

  Promise.allSettled([
    axios.post(`${commentsService}/events`, event),
    axios.post(`${moderationService}/events`, event),
    axios.post(`${postsService}/events`, event),
    axios.post(`${queryService}/events`, event),
  ]).catch((error) => res.status(502).send(error));

  res.status(202).send({ status: "OK" })
});

const port = process.env.PORT || 4005;
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
