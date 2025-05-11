import { useEffect, useState } from 'react';
import { Game } from '../types/Game';
import { fetchGames } from '../api/games';

/**
 * Custom hook to fetch a list of games from the backend API.
 */
export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    fetchGames()
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Unknown error');
        setLoading(false);
      });
  };

  useEffect(fetchData, []);

  return { games, loading, error, refetch: fetchData };
}
