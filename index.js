require('dotenv').config()

const express = require("express");
const http = require('http')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express();

const auth = require('./controllers/auth')
const profile = require('./controllers/profile')
const vendor = require('./controllers/vendor/curd')


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
app.use('/api/profile', profile)
app.use('/api/user', auth)
app.use('/api/vendor',vendor)


app.use((err, req, res, next) => {
    
    res.status(500).send(err)
    
})



const host = process.env.HOST || "localhost"
const port = process.env.PORT || 3000
http.createServer(app).listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
}
)
