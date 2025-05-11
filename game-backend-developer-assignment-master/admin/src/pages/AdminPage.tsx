import { Layout, message } from 'antd';
import { GameTable } from '../components/GameTable';
import { useGames } from '../hooks/useGames';
import { createGame, updateGame, deleteGame } from '../api/games';

const { Header, Content } = Layout;

/**
 * AdminPage is the main container for managing game data.
 *
 * Uses `useGames` to fetch game data from the backend
 * Displays loading and error states
 * Passes fetched data into `GameTable` component
 */
export const AdminPage = () => {
  const { games, loading, error, refetch } = useGames();

  const handleCreate = async (game: any) => {
    try {
      await createGame(game);
      message.success('Game created');
      refetch();
    } catch {
      message.error('Failed to create game');
    }
  };

  const handleUpdate = async (id: string, game: any) => {
    try {
      await updateGame(id, game);
      message.success('Game updated');
      refetch();
    } catch {
      message.error('Failed to update game');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGame(id);
      message.success('Game deleted');
      refetch();
    } catch {
      message.error('Failed to delete game');
    }
  };

  return (
    <Layout>
      <Header style={{ color: 'white', fontSize: '20px' }}>Admin</Header>
      <Content style={{ padding: '2rem' }}>
        {loading && <p>Loading games...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && (
          <GameTable
            games={games}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </Content>
    </Layout>
  );
};
