process.env.FIRESTORE_EMULATOR_HOST = 'localhost:5005';

import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { Game } from '../../../admin/src/types/Game';
import { getFirestore } from '../../src/apis/firestore/getFirestore';

const filePath = resolve(process.cwd(), '../games.json');

console.log('Loading games.json...');
const raw = readFileSync(filePath, 'utf-8');
const games: Game[] = JSON.parse(raw);
console.log(`Loaded ${games.length} games from JSON`);

async function seedGames() {
  const db = getFirestore();
  const batch = db.batch();

  console.log('Starting Firestore batch write...');
  for (const game of games) {
    const ref = db.collection('games').doc(game.id);
    batch.set(ref, game);
  }

  await batch.commit();
  console.log(`Seeded ${games.length} games into Firestore.`);
}

seedGames().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
