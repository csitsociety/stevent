const config = require('./src/config.js');

const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const Router = require('./src/Router');
const cors = require('cors');
const bodyParser = require('body-parser')
const multer = require('multer')
const { Translate } = require('@google-cloud/translate').v2;
const { Datastore } = require('@google-cloud/datastore');
const { DatastoreStore } = require('@google-cloud/connect-datastore');

const translate = new Translate({
  projectId: config.projectId,
});

const decodeIDToken = require('./src/authenticateToken')

const datastore = new Datastore({ projectId: config.projectId });

const multerMid = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
});

app.use(express.static(path.join(__dirname, 'index.html')));
app.use(express.json());
const clientRegex = new RegExp(config.client)
app.options("*", cors({ origin: [clientRegex] }));
app.use(cors({ origin: [clientRegex] }));
app.enable('trust proxy');
app.use(decodeIDToken);
app.disable('x-powered-by')
app.use(multerMid.any())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'));

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

new Router(app, datastore, translate);

app.get('/', function(req, res) {
    console.log(req)
    res.send('<pre>Stevent API - 2021')
});

app.listen(config.port, () => {
    console.log(`app listening at http://localhost:${config.port}`)
  })
