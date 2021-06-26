const fetch = require("node-fetch");

const MoviesRepository = require('../repositories/moviesRepository');
const StarsRepository = require('../repositories/starsRepository');
const MediaController = require('./media');
const myError = require('../myError');
const movieRepository = new MoviesRepository();
const starRepository = new StarsRepository();

const page_size = 6;

module.exports = {
    async getMovies(req, res, next) {
        try {
            const page_str = req.query.page;
            const title_search = req.query.title;
            const search_selection = req.query.search_selection;
            const sort = req.query.sort;
            let page;
            if (page_str === undefined) page = 1;
            else {
                page = Number(page_str);
                if (isNaN(page)) return next(new myError(400, 'page is not a number'));
                if (!Number.isInteger(page)) return next(new myError(400, 'page is not an integer'));
                if (page < 1) return next(new myError(400, 'invalid page value (page < 1)'));
            }
            let movies = await movieRepository.getMovies();

            if (title_search && search_selection) {
                if (search_selection == "Movie") {
                    movies = movies.filter(item => item.title.includes(title_search));
                } else if (search_selection == "Actors") {
                    const allresults = movies.map((obj) => {
                        const new_obj = {
                            title: obj.title,
                            id: obj._id,
                            fullname: obj.stars.map(obj => obj.fullname.includes(title_search)).some((element) => element === true)
                        };
                        return new_obj;
                    });
                    movies = [];
                    for (let result of allresults) {
                        if (result.fullname === true) {
                            movies.push(result);
                        }
                    }
                }
            }

            const size = movies.length;
            const max_page = Math.ceil(size / page_size);
            const offset = page_size * (page - 1);
            if (offset === 0 && size === 0) {
                const paginator_pages = []
                paginator_pages.push({
                    element_text: '<-'
                })
                paginator_pages.push({
                    element_text: '->'
                })
                res.status(200).render('movies', {
                    head_title: 'MOVIES',
                    movies_page: null,
                    movies_current: 'current',
                    paginator_pages: paginator_pages,
                    title_query: title_search
                });
                return;
            }
            if (offset >= size) return next(new myError(400, 'offset is bigger than movies number (page size is 8)'));

            const movies_page = movies.slice(offset, offset + page_size);
            const arr = [];

            for (const movie of movies_page) {
                arr.push({
                    id: movie.id,
                    title: movie.title
                });
            }
            if (sort == "") arr.sort((a, b) => a.title !== b.title ? a.title < b.title ? -1 : 1 : 0);

            const paginator_pages = []

            let title_query = '';
            if (!(title_search === undefined)) title_query = '&title=' + title_search;


            if (page === 1) paginator_pages.push({
                element_text: '<-'
            })
            else paginator_pages.push({
                element_page: page - 1,
                element_text: '<-',
                title_query: title_search
            })

            //let pages = []

            if (page > 5) {
                paginator_pages.push({
                    element_page: 1,
                    element_text: 1,
                    title_query: title_search
                })
                if (page != 6) paginator_pages.push({
                    element_text: '...'
                })
            }
            for (i = Math.max(page - 4, 1); i < page; i++) {
                paginator_pages.push({
                    element_page: i,
                    element_text: i,
                    title_query: title_search
                })
            }
            paginator_pages.push({
                element_text: page
            })
            for (i = page + 1; i <= Math.min(page + 4, max_page); i++) {
                paginator_pages.push({
                    element_page: i,
                    element_text: i,
                    title_query: title_search
                })
            }
            if (page < max_page - 4) {
                if (page != max_page - 5) paginator_pages.push({
                    element_text: '...'
                })
                paginator_pages.push({
                    element_page: max_page,
                    element_text: max_page,
                    title_query: title_search
                })
            }

            if (offset + page_size < size) paginator_pages.push({
                element_page: page + 1,
                element_text: '->',
                title_query: title_search
            })
            else paginator_pages.push({
                element_text: '->'
            })

            params = {
                head_title: 'TV SHOWS',
                movies_page: arr,
                movies_current: 'current',
                paginator_pages,
                title_query: title_search,
                id: req.params.id
            }
            res.status(200).render('movies', params);
        } catch (err) {
            return next(new myError(500, err.message));
        }
    },

    async getMovieById(req, res, next) {
        try {
            const id_str = req.params.id
            const obj = await movieRepository.getMoviesById(id_str)
            if (obj === null)
                return next(new myError(404, 'movie not found'));
            else {
                res.status(200).render('movie', {
                    head_title: 'MOVIE',
                    movies_current: '',
                    movie: obj
                });
            }
        } catch (err) {
            return next(new myError(500, err.message));
        }
    },

    async createMovie(req, res, next) {
        try {
            let body = req.body
            const arrStars = body.stars.split(',');
            let = [];
            body.stars = [];
            for (let word of arrStars) {
                if (word[0] == " ") {
                    word = word.slice(1);
                }
                let item = await starRepository.getStarsByName(word);
                if (item == null) {
                    const new_body = { fullname: word }
                    item = await starRepository.addStars(new_body)
                }
                body.stars.push(item._id)
            }
            const movieObj = await movieRepository.addMovies(body)
            res.status(303).redirect('/movies/' + movieObj._id)
        } catch (err) {
            return next(new myError(500, err.message));
        }
    },

    async importMovie(req, res, next) {
        try {
            const body = req.body
            body.fileUrl = await MediaController.addMediaFile(body.fileUrl, req)
            const response = await fetch(body.fileUrl);
            let movies = await response.text();
            movies = movies.split("\r\n")
            let obj_2_create = {
                title: undefined,
                ReleaseYear: undefined,
                format: undefined,
                stars: undefined,
            };
            for (let str_movie_attribute of movies) {
                str_movie_attribute = str_movie_attribute.trim();
                if (str_movie_attribute.startsWith('Title: ')) {
                    obj_2_create.title = str_movie_attribute.slice(7)
                }
                else if (str_movie_attribute.startsWith('Release Year: ')) {
                    obj_2_create.ReleaseYear = str_movie_attribute.slice(14)
                }
                else if (str_movie_attribute.startsWith('Format: ')) {
                    obj_2_create.format = str_movie_attribute.slice(8)
                }
                else if (str_movie_attribute.startsWith('Stars: ')) {
                    str_movie_attribute = str_movie_attribute.slice(7)
                    const stars_id = [];
                    const arrStars = str_movie_attribute.split(',');
                    for (let word of arrStars) {
                        if (word[0] == " ") {
                            word = word.slice(1);
                        }
                        let item = await starRepository.getStarsByName(word);
                        if (item == null) {
                            const new_body = { fullname: word }
                            item = await starRepository.addStars(new_body)
                        }
                        stars_id.push(item._id)
                    }
                    obj_2_create.stars = stars_id
                } else {
                    obj_2_create = {};
                }
                if (obj_2_create.title && obj_2_create.ReleaseYear && obj_2_create.format && obj_2_create.stars) {
                    const movieObj = await movieRepository.addMovies(obj_2_create)
                    obj_2_create = {};
                }
            }
            res.status(303).redirect('/movies')
        } catch (err) {
            return next(new myError(500, err.message));
        }
    },

    async deleteMovieById(req, res, next) {
        try {
            const id_str = req.params.id
            const obj = await movieRepository.deleteMovies(id_str)
            if (obj === null) return next(new myError(404, 'movie not found'));
            else
                res.status(303).redirect('/movies')
        } catch (err) {
            return next(new myError(500, err.message));
        }
    },
};