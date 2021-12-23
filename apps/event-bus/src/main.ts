/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import axios from "axios"
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as morgan from "morgan";

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.post('/events', (req, res) => {
  const event = req.body;

  Promise.allSettled([
    axios.post("http://localhost:4000/events", event),
    axios.post("http://localhost:4001/events", event),
    axios.post("http://localhost:4002/events", event),
  ]).catch((error) => res.status(502).send(error));

  res.status(202).send({ status: "OK" })
});

const port = process.env.port || 4005;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);