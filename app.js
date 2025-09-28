require('dotenv').config()
const session = require('express-session')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const db = require('./config/db')
const marketplace = require('./routes/marketplace')
const express = require('express')


const app = express();
const port = process.env.PORT || 3000

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));


app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


app.use('/marketplace', marketplace)
app.use('/auth', authRoutes)

app.listen(port, () => {console.log(`Listening on port ${port}`)})