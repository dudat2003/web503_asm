import { Router } from 'express'
import { getAllMovies, getMovieById, addMovie, createMovie, updateMovie, deleteMovie } from '../controllers/moviesController'
import castsRouter from './castsRouter'
import genresRouter from './genresRouter'

const router = Router()

router.get("/add", createMovie)

//Movies Router
router.get("/", getAllMovies)
router.get("/:id", getMovieById)

router.post("/", addMovie)
router.put('/:id/:castId', updateMovie);
router.delete('/:id', deleteMovie)


export default router