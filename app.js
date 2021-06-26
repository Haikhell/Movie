const express = require('express')
const path = require('path');
const mustache = require('mustache-express');
const methodOverride = require('method-override');
const body_parser = require('body-parser');
const fileupload = require('express-fileupload')
const mongoose = require('mongoose');

const myError = require('./myError');
const mstMoviesRouter = require('./routers/mstMovies');
const config = require('./config');

const db = config["db"];
const apps = config["app"];

const dbUrl = `mongodb://${db["host"]}:${db["port"]}/${db["name"]}`;
const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const app = express()
app.use(fileupload({
    useTempFiles: false
}));

app.use(body_parser.urlencoded({
    extended: true
}));
app.use(body_parser.json());

const port = apps["port"];

const viewsDir = path.join(__dirname, './views');

app.engine("mst", mustache(path.join(viewsDir, "partials")));
app.set('views', viewsDir);
app.set('view engine', 'mst');

app.use(methodOverride('_method'));

app.use(express.static('public'));
app.use(express.static('data'));

app.post('/movies', body_parser.urlencoded({
    extended: true
}));

app.use('/movies', mstMoviesRouter)

app.get('/about', (req, res) => {
    res.render('about', {
        head_title: 'About',
        about_current: 'current'
    });
});

app.get('/', (req, res) => {
    res.render('index', {
        head_title: 'ZAK ROZ',
        home_current: 'current'
    });
});

app.use((req, res) => {
    throw new myError(400, 'command not found');
});

app.use((err, req, res, next) => {
    console.log('error caught\n{')
    console.log('    status code: ' + err.status_code + ', message: ' + err.message + '\n}');

    res.status(err.status_code).render('error', {
        head_title: 'Error',
        status_code: err.status_code,
        message: err.message,
    });
});

app.listen(port, async () => {
    console.log(`Server ready\nExample app listening at http://localhost:${port}`);
    const client = await mongoose.connect(dbUrl, connectOptions);
    console.log('Mongo database connected');
});
