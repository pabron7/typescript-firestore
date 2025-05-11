import { Layout } from "antd";
import { GameTable } from "../components/GameTable";
import games from "../../../games.json";

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
