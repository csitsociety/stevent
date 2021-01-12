const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const Router = require('./Router')
const cors = require('cors')

const {Datastore} = require('@google-cloud/datastore')
const {DatastoreStore} = require('@google-cloud/connect-datastore')

const datastore = new Datastore({
    projectId: "cc-assignment-clubs"
})

app.use(express.static(path.join(__dirname, 'index.html')))
app.use(express.json())
app.options("*", cors({origin: ["http://localhost:3001", "https://localhost:3001"], credentials: true}))
app.use(cors({origin: ["http://localhost:3001", "https://localhost:3001"], credentials: true}))
app.enable('trust proxy')

app.use(session({
    store: new DatastoreStore({
        kind: 'express-sessions',
        expirationMs: 1825 * 86400 * 1000,
        dataset: datastore
    }),
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 86400 * 1000),
        httpOnly: false
    }
}))

const entity = {
    key: datastore.key(['User', "s3787033"]),
    data: {
        username: "s3787033",
        password: "123"
    }
}

datastore.upsert(entity)

new Router(app, datastore)

app.get('/', function(req, res) {
    res.send("Hello world")
})

app.listen(3000)