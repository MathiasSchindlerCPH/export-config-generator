import React, { useState } from 'react';
import { Select, Button, Row, Col, Input, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const SplittingDynamicInputs = ({ onInputChange }) => {
  const [inputs, setInputs] = useState([{ id: 1, fieldName: '', type: '', order: 1 }]);
  const [nextId, setNextId] = useState(2);

  const handleInputChange = (id, key, value) => {
    const updatedInputs = inputs.map(input =>
      input.id === id ? { ...input, [key]: value } : input
    );
    setInputs(updatedInputs);
    onInputChange(updatedInputs); // Pass the updated inputs to the parent component
  };

  const handleAddInput = () => {
    const newInput = { id: nextId, fieldName: '', type: '', order: nextId };
    setInputs([...inputs, newInput]);
    setNextId(nextId + 1);
  };

  const handleRemoveInput = id => {
    const updatedInputs = inputs.filter(input => input.id !== id);
    setInputs(updatedInputs);

    // Reassign the id values of the remaining inputs
    const renumberedInputs = updatedInputs.map((input, index) => ({
      ...input,
      id: index + 1,
    }));
    setInputs(renumberedInputs);
  };

  return (
    <div>
      <Button onClick={handleAddInput}>Add Input</Button>
      {inputs.map(input => (
        <div key={input.id}>
          <Row gutter={16}>
            <Col span={6}>
              <Input
                placeholder="Field Name"
                onBlur={event => handleInputChange(input.id, 'fieldName', event.target.value)}
              />
            </Col>
            <Col span={6}>
              <Select
                onChange={value => handleInputChange(input.id, 'type', value)}
                style={{ width: '100%' }}
                placeholder="Folder or File"
              >
                <Option value="dir">Folder</Option>
                <Option value="file">File</Option>
              </Select>
            </Col>
            <Col span={6}>
              <InputNumber
                defaultValue={input.order}
                onChange={event => handleInputChange(input.id, 'order', event.target.value)}
              />
            </Col>
            {inputs.length > 1 && (
              <Col span={2}>
                <Button onClick={() => handleRemoveInput(input.id)}>
                  <DeleteOutlined />
                </Button>
              </Col>
            )}
          </Row>
        </div>
      ))}
    </div>
  );
};

export default SplittingDynamicInputs;
