const config = require('./config/config');

const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const Router = require('./Router');
const cors = require('cors');
const bodyParser = require('body-parser')
const multer = require('multer')

const { Datastore } = require('@google-cloud/datastore');
const { DatastoreStore } = require('@google-cloud/connect-datastore');

const decodeIDToken = require('./authenticateToken')

const datastore = new Datastore({ projectId: config.projectId });

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  })

app.use(express.static(path.join(__dirname, 'index.html')));
app.use(express.json());
app.options("*", cors({ origin: [config.client] }));
app.use(cors({ origin: [config.client] }));
app.enable('trust proxy');
app.use(decodeIDToken);
app.disable('x-powered-by')
app.use(multerMid.single('file'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

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

app.listen(config.port, () => {
    console.log(`Example app listening at http://localhost:${config.port}`)
  })