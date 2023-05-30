require('dotenv').config()

const express = require("express");
const http = require('http')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express();

const auth = require('./controllers/auth')


//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
    secret: process.env.SECRET_TOKEN,
    resave: false,
    maxAge: 1000 * 60 * 60 * 24,
    saveUninitialized: false,
    cookie: { secure: false }
}))

//routes
app.use('/api/user', auth)

//error handler
app.all('*', (req, res, next) => {
    res.status(404).send('Not Found');
});
app.use((err, req, res, next) => {
    res.status(500).send(err)
})

//server (http for now)
http.createServer(app).listen(process.env.PORT, () => {
    console.log("Server running on http://localhost:3000")
})