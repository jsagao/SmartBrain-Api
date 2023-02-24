// adding line is package.json "start": "nodemon server.js"
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: '5432',
        user: 'postgres',
        password: 'admin',
        database: 'smart-brain'
    }
});


const app = express();
const PORT = process.env.PORT || 3030;
app.use(bodyParser.json()) // have to use bodyparser here installed and uexpress() because sending it as a JSON
app.use(cors());


app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', signin.handleSignin(db, bcrypt))

//dependency injection
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

//requesting response
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// res = this is working
// /signin --> POST success or fail
// /register --> POST = user
// /profile/:userId --> GET = user
// /image --> PUT --> user 
