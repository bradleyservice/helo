require('dotenv').config();

const express = require('express');
const massive = require('massive');
const session = require('express-session');
const ctrl = require('./controller');

const app = express();

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env;

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log('db up my dude')
}).catch(err => console.log(err));

app.post('/api/auth/register', ctrl.register);

app.post('/api/auth/login', ctrl.login);

app.get('/api/posts', ctrl.getAllPosts);

app.get('/api/post/:postid', ctrl.getOnePost);

app.post('/api/post/:userid', ctrl.createPost);

app.listen(SERVER_PORT, () => console.log(`server is at port ${SERVER_PORT}`));
