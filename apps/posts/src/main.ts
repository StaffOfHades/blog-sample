/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import axios from "axios";
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

const posts = {};

app.post("/events", (req, res) => {
  res.status(204).send()
})

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = uuidv4();
  const { title } = req.body;
  posts[id] = { id, title };

  axios.post("http://localhost:4005/events", {
    data: posts[id],
    type: "PostCreated",
  }).catch((error) => console.error(error));

  res.status(201).send(posts[id])
});

const port = process.env.port || 4000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
