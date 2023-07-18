import { Router } from 'express'
import { getAllGenres, getGenreById, addGenre, updateGenre, deleteGenre } from '../controllers/moviesController'

const router = Router()

//Genres Router
router.get('/genres', getAllGenres);
router.get('/genres/:id', getGenreById);

router.post('/genres', addGenre);
router.put('/genres/:id', updateGenre);
router.delete('/genres/:id', deleteGenre);

export default router

