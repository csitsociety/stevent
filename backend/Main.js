const config = require('./config');

const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const Router = require('./Router');
const cors = require('cors');

const { Datastore } = require('@google-cloud/datastore');
const { DatastoreStore } = require('@google-cloud/connect-datastore');

const datastore = new Datastore({ projectId: config.projectId });

app.use(express.static(path.join(__dirname, 'index.html')));
app.use(express.json());
app.options("*", cors({ origin: [config.client] }));
app.use(cors({ origin: [config.client] }));
app.enable('trust proxy');

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
}));

new Router(app, datastore);

app.get('/', function(req, res) {
    res.send('<pre>Stevent API')
});

app.listen(config.port);
