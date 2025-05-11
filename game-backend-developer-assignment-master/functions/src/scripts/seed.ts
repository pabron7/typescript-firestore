// Point the Firestore SDK to the emulator running on localhost port 5005
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:5005';

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { getFirestore } from '../../src/apis/firestore/getFirestore';

/**
 * Resolve the absolute path to the games.json file located one level up
 * from the current working directory (usually run from /functions).
 */
const filePath = resolve(process.cwd(), '../games.json');

// Read and parse the games.json file
console.log('Loading games.json...');
const raw = readFileSync(filePath, 'utf-8');
const games = JSON.parse(raw); // Expecting an array of Game objects
console.log(`Loaded ${games.length} games from JSON`);

/**
 * Seeds the Firestore emulator with games data using a batch write.
 * 
 * This script connects to the Firestore emulator and writes all entries
 * from games.json into the "games" collection, using each game's `id`
 * as the document ID.
 */
async function seedGames() {
  const db = getFirestore();  // Get Firestore instance connected to emulator
  const batch = db.batch();   // Create a batch to execute multiple writes together

  console.log('Starting Firestore batch write...');
  for (const game of games) {
    const ref = db.collection('games').doc(game.id); // Reference each game document by ID
    batch.set(ref, game); // Queue the document write
  }

  await batch.commit();
  console.log(`Seeded ${games.length} games into Firestore.`); // Commit all batched operations
}

// Execute the seeding logic and handle any top-level errors
seedGames().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1); // Exit the process with a failure code
});
