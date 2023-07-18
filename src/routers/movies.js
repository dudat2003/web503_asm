import { Router } from 'express'
import {
    getAllMovies, getMovieById, addMovie, createMovie, updateMovie, deleteMovie,


} from '../controllers/moviesController'

const router = Router()

router.get("/add", createMovie)

//Movies Router
router.get("/", getAllMovies)
router.get("/:id", getMovieById)

router.post("/", addMovie)
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie)

//Cast Router
router.get("/movies/casts", getAllCasts)
router.get("/casts/:id", getCastById)

router.post("/casts", addCast)
router.put('/casts/:id', updateCast);
router.delete('/casts/:id', deleteCast)

//Genres Router
router.get('/genres', getAllGenres);
router.get('/genres/:id', getGenreById);

router.post('/genres', addGenre);
router.put('/genres/:id', updateGenre);
router.delete('/genres/:id', deleteGenre);

export default router