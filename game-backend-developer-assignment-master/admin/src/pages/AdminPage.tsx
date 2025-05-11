import { Layout } from 'antd';
import { GameTable } from '../components/GameTable';
import { useGames } from '../hooks/useGames';

const { Header, Content } = Layout;

/**
 * AdminPage is the main container for managing game data.
 *
 * Uses `useGames` to fetch game data from the backend
 * Displays loading and error states
 * Passes fetched data into `GameTable` component
 */
export const AdminPage = () => {
  const { games, loading, error } = useGames();

  return (
    <Layout>
      <Header style={{ color: 'white', fontSize: '20px' }}>Admin</Header>
      <Content style={{ padding: '2rem' }}>
        {loading && <p>Loading games...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && <GameTable games={games} />}
      </Content>
    </Layout>
  );
};
