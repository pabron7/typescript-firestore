import { Layout } from "antd";
import { GameTable } from "../components/GameTable";
import type { Game } from '../types/Game';
import gamesRaw from '../../../games.json';

const games = gamesRaw as Game[];


const { Header, Content } = Layout;

export const AdminPage = () => {
  return (
    <Layout>
      <Header style={{ color: "white", fontSize: "20px" }}>Admin</Header>
      <Content style={{ padding: "2rem" }}>
        <GameTable games={games} />
      </Content>
    </Layout>
  );
};
