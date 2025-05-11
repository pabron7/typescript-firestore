import type { Game } from '../types/Game';

const BASE_URL = 'http://127.0.0.1:5004/demo-project/europe-west3/api/v1/games';

/**
 * Fetch all games 
 */
export async function fetchGames(): Promise<Game[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch games');
  return res.json();
}

/**
 * Create a new game
 */
export async function createGame(game: Game): Promise<void> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(game),
  });
  if (!res.ok) throw new Error('Failed to create game');
}

/**
 * Update an existing game
 */
export async function updateGame(id: string, game: Partial<Game>): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(game),
  });
  if (!res.ok) throw new Error('Failed to update game');
}

/**
 * Delete a game
 */
export async function deleteGame(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete game');
}
