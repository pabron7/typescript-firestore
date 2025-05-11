import { useEffect, useState } from 'react';
import { Game } from '../types/Game';

const API_URL = 'http://127.0.0.1:5004/demo-project/europe-west3/api/v1/games/';

/**
 * Custom hook to fetch a list of games from the backend API.
 *
 * Loads data from the Firestore emulator via a REST endpoint
 * Exposes loading and error states
 * Returns typed game array
 *
 * @returns {Object} games - list of games
 * @returns {boolean} loading - whether the fetch is still in progress
 * @returns {string | null} error - error message if the request fails
 */
export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch games');
        return res.json();
      })
      .then((data: Game[]) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Unknown error');
        setLoading(false);
      });
  }, []);

  return { games, loading, error };
}
