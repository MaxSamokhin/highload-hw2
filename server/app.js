import express from 'express'
import bodyParser from 'body-parser'
import * as db from './utils/DbUtils'
import {serverPort} from '../etc/config'
import cors from 'cors';
import path from 'path';

db.setUpConnection();

const app = express();

app.use(bodyParser.json());
app.use(cors({origin: '*'}));

app.use('/', express.static('./static'));


app.get('/notes', (req, res) => {
    db.listNotes().then(data => res.send(data))
}); // получение заметок

app.post('/notes', (req, res) => {
    db.createNote(req.body).then(data => res.send(data))
}); // добавление

app.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
}); // удальть по id

let port = process.env.PORT || serverPort;
const server = app.listen(port, () => {
    console.log(`App start on port ${serverPort}`)
});
