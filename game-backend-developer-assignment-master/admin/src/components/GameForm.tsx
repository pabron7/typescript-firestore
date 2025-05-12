import { Form, Input, InputNumber, Button, Select } from 'antd';
import { useEffect, useState } from 'react';
import { Game } from '../types/Game';
import { generateId } from '../utils/generateId';
import { useGames } from '../hooks/useGames';

export type GameFormValues = Omit<Game, 'id'> & { id?: string };

interface GameFormProps {
  initialValues?: Partial<Game>;
  onSubmit: (values: GameFormValues) => void;
  submitText?: string;
  loading?: boolean;
}

export const GameForm = ({
  initialValues,
  onSubmit,
  submitText = 'Submit',
  loading = false,
}: GameFormProps) => {
  const [form] = Form.useForm();
  const { games } = useGames();
  const [type, setType] = useState<Game['type']>('BaseGame');

  const isEditMode = Boolean(initialValues?.id); // ← Detect edit mode
  const baseGames = games.filter((g) => g.type === 'BaseGame');

  useEffect(() => {
    const id = initialValues?.id || generateId();
    form.setFieldsValue({ ...initialValues, id });
    setType(initialValues?.type || 'BaseGame');
  }, [initialValues]);

  const handleFinish = (values: GameFormValues) => {
      // Normalize the submitted values to ensure defaults and structure
    const safeValues: Game = {
      ...values,
      id: values.id || generateId(), // fallback Id
      players: {
        min: values.players?.min ?? 1,
        max: values.players?.max ?? 1,
      },
      expansions: values.type === 'BaseGame' ? [] : undefined,
      baseGame: values.type === 'Expansion' ? values.baseGame : undefined,
      standalone: values.type === 'Expansion' ? values.standalone ?? false : undefined,
    };
  
    onSubmit(safeValues);
  };
  
  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      {/* Hidden ID */}
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>

      {/* Always Editable */}
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Publisher" name="publisher">
        <Input />
      </Form.Item>

      <Form.Item label="Release Year" name="releaseYear">
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Min Players" name={['players', 'min']}>
        <InputNumber min={1} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Max Players" name={['players', 'max']}>
        <InputNumber min={1} style={{ width: '100%' }} />
      </Form.Item>

      {/* Only editable on creation */}
      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: 'Type is required' }]}
      >
        <Select onChange={setType} disabled={isEditMode}>
          <Select.Option value="BaseGame">Base Game</Select.Option>
          <Select.Option value="Expansion">Expansion</Select.Option>
        </Select>
      </Form.Item>

      {type === 'Expansion' && (
        <>
          <Form.Item
            label="Base Game"
            name="baseGame"
            rules={[{ required: true, message: 'Base Game is required' }]}
          >
            <Select placeholder="Select base game" disabled={isEditMode}>
              {baseGames.map((bg) => (
                <Select.Option key={bg.id} value={bg.id}>
                  {bg.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Standalone" name="standalone">
            <Select >
              <Select.Option value={true}>Yes</Select.Option>
              <Select.Option value={false}>No</Select.Option>
            </Select>
          </Form.Item>
        </>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};

