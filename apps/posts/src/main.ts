/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { EventType, Post, PostCreatedEvent } from "@udemy.com/global/types"
import axios from "axios";
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

const posts: Record<string, Post> = {};

app.post("/events", (req, res) => {
  res.status(204).send()
})

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = uuidv4();
  const { title }: { title: string } = req.body;
  posts[id] = { id, title };

  const event: PostCreatedEvent = {
    data: posts[id],
    type: EventType.PostCreated,
  }
  axios.post("http://localhost:4005/events", event).catch((error) => console.error(error));

  res.status(201).send(posts[id])
});

const port = process.env.port || 4000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
