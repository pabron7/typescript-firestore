import { Table } from 'antd';
import { Game } from '../types/Game';

interface Props {
  games: Game[];
}

export const GameTable = ({ games }: Props) => {
  const dataSource = games.map((game) => ({ ...game, key: game.id }));

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Year', dataIndex: 'releaseYear', key: 'releaseYear' },
    { title: 'Publisher', dataIndex: 'publisher', key: 'publisher' },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};
