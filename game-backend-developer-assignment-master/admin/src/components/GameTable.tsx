import { Table, Button, Modal, Space } from 'antd';
import { useState } from 'react';
import { Game } from '../types/Game';
import { GameForm, GameFormValues } from './GameForm';

interface Props {
  games: Game[];
  onCreate: (game: GameFormValues) => void;
  onUpdate: (id: string, game: GameFormValues) => void;
  onDelete: (id: string) => void;
}

export const GameTable = ({ games, onCreate, onUpdate, onDelete }: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  const dataSource = games.map((game) => ({ ...game, key: game.id }));

  const openEdit = (game: Game) => {
    setEditingGame(game);
    setModalOpen(true);
  };

  const openCreate = () => {
    setEditingGame(null);
    setModalOpen(true);
  };

  const handleSubmit = (values: GameFormValues) => {
    if (editingGame) {
      onUpdate(editingGame.id, values);
    } else {
      onCreate(values);
    }
    setModalOpen(false);
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Year', dataIndex: 'releaseYear', key: 'releaseYear' },
    { title: 'Publisher', dataIndex: 'publisher', key: 'publisher' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, game: Game) => (
        <Space>
          <Button onClick={() => openEdit(game)}>Edit</Button>
          <Button danger onClick={() => onDelete(game.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={openCreate} style={{ marginBottom: '1rem' }}>
        Add Game
      </Button>

      <Table dataSource={dataSource} columns={columns} />

      <Modal
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
        title={editingGame ? 'Edit Game' : 'Add Game'}
      >
        <GameForm
          initialValues={editingGame || undefined}
          onSubmit={handleSubmit}
          submitText={editingGame ? 'Update' : 'Create'}
        />
      </Modal>
    </>
  );
};
