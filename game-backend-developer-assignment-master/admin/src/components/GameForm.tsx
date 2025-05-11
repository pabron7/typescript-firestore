import { Form, Input, InputNumber, Button } from 'antd';
import { Game } from '../types/Game';
import { useEffect } from 'react';

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

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={initialValues}
    >
      <Form.Item
        label="ID"
        name="id"
        rules={[{ required: true, message: 'ID is required' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Name is required' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Publisher"
        name="publisher"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Release Year"
        name="releaseYear"
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: 'Type is required' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
};
