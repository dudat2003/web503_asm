import { Router } from 'express'
import { getAllGenres, getGenreById, deleteGenre, addGenreToMovie, updateGenreInMovie } from '../controllers/moviesController'

const router = Router()

//Genres Router
router.get('/', getAllGenres);
router.get('/:id', getGenreById);

router.post('/:id', addGenreToMovie);
router.put('/:id/:genreName', updateGenreInMovie);
router.delete('/:id', deleteGenre);

export default router

