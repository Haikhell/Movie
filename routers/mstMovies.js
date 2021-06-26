const mstMovieRouter = require('express').Router();

const mstMovieController = require('../controllers/mstMovies')
const myError = require('./../myError');

mstMovieRouter
    .get('/', mstMovieController.getMovies)
    .get('/new', (req, res) => {
        res.status(200).render('new', { head_title: 'New movie', movies_current: '', required: "required" })
    })
    .get('/import', (req, res) => {
        res.status(200).render('import', { head_title: 'import movie', movies_current: '', required: "required" })
    })
    .get('/:id', mstMovieController.getMovieById)
    .post('/', mstMovieController.createMovie)
    .post('/file-import', mstMovieController.importMovie)
    .delete('/:id', mstMovieController.deleteMovieById);

mstMovieRouter.use((req, res) => {
    throw new myError(400, 'command not found');
});

module.exports = mstMovieRouter;