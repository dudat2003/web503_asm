import { Router } from 'express'
import { getAllMovies, getMovieById, addMovie, createMovie, updateMovie, deleteMovie } from '../controllers/moviesController'


const router = Router()

router.get("/add", createMovie)

//Movies Router
router.get("/", getAllMovies)
router.get("/:id", getMovieById)

router.post("/", addMovie)
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie)


export default router