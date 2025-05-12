import { getFirestore } from '../apis/firestore/getFirestore';
import { HttpError } from '../classes/HttpError';

/**
 * Appends a new expansion ID to the base game's `expansions` array.
 * Ensures no duplicates and throws if base game does not exist.
 */
export async function addExpansionToBase(baseGameId: string, expansionId: string) {
  const db = getFirestore();
  const ref = db.collection('games').doc(baseGameId);
  const snap = await ref.get();

  if (!snap.exists) throw new HttpError(`Base game with ID ${baseGameId} not found`, 404);

  const data = snap.data()!;
  const expansions: string[] = Array.isArray(data.expansions) ? data.expansions : [];

  if (!expansions.includes(expansionId)) {
    await ref.update({ expansions: [...expansions, expansionId] });
  }
}

/**
 * Removes a deleted expansion ID from the base game's `expansions` array.
 * Silently ignores if base game does not exist or if ID isn't present.
 */
export async function removeExpansionFromBase(baseGameId: string, expansionId: string) {
  const db = getFirestore();
  const ref = db.collection('games').doc(baseGameId);
  const snap = await ref.get();

  if (!snap.exists) return;

  const data = snap.data()!;
  const expansions: string[] = Array.isArray(data.expansions) ? data.expansions : [];

  await ref.update({
    expansions: expansions.filter((id) => id !== expansionId),
  });
}
