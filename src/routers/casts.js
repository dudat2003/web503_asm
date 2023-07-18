import Router from 'express';
import { getAllCasts, getCastById, addCast, updateCast, deleteCast } from '../controllers/moviesController';

const router = Router();

router.get('/', getAllCasts);
router.get('/:id', getCastById);
router.post('/', addCast);
router.put('/:id', updateCast);
router.delete('/:id', deleteCast);

export default router;