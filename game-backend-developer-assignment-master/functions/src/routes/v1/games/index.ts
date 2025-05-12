import { Router } from 'express';
import { getGames } from '../../../apis/firestore/games';
import { getFirestore } from '../../../apis/firestore/getFirestore';
import { HttpError } from '../../../classes/HttpError';
import { addExpansionToBase, removeExpansionFromBase } from '../../../helpers/expansions';

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

    const db = getFirestore();
    await db.collection('games').doc(game.id).set(game);

    if (game.type === 'Expansion' && game.baseGame) {
      await addExpansionToBase(game.baseGame, game.id);
    }

    res.status(201).json({ message: 'Game created', id: game.id });
  } catch (err) {
    next(err);
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

    const db = getFirestore();
    const docRef = db.collection('games').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new HttpError(`Game with ID ${id} not found`, 404);
    }

    const game = docSnap.data();

    if (game?.type === 'Expansion' && game.baseGame) {
      await removeExpansionFromBase(game.baseGame, id);
    }

    await docRef.delete();
    res.status(200).json({ message: 'Game deleted', id });
  } catch (error) {
    next(error);
  }
});

export default router;
