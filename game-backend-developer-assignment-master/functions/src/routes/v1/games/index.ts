import { Router } from 'express';
import { getGames } from '../../../apis/firestore/games';
import { getFirestore } from '../../../apis/firestore/getFirestore';
import { HttpError } from '../../../classes/HttpError';

const router = Router();

// GET all games
router.get('/', async (_req, res) => {
  const games = await getGames();
  res.status(200).json(games);
});

// POST /api/v1/games
router.post('/', async (req, res, next) => {
  try {
    const game = req.body;
    if (!game?.id) throw new HttpError('Game ID is required', 400);

    await getFirestore().collection('games').doc(game.id).set(game);
    res.status(201).json({ message: 'Game created', id: game.id });
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/games/:id
router.put('/:id', async (req, res, next) => {
  try {
    const game = req.body;
    const { id } = req.params;
    if (!id) throw new HttpError('Game ID is required', 400);

    await getFirestore().collection('games').doc(id).update(game);
    res.status(200).json({ message: 'Game updated', id });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/games/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new HttpError('Game ID is required', 400);

    await getFirestore().collection('games').doc(id).delete();
    res.status(200).json({ message: 'Game deleted', id });
  } catch (error) {
    next(error);
  }
});

export default router;
