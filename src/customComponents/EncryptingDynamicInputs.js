import React, { useState } from 'react';
import { Select, Button, Row, Col, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';


const { Option } = Select;

const EncryptingDynamicInputs = ({ onInputChange }) => {
    const [inputs, setInputs] = useState([{ id: 1, includeInReport: '', field: '' }]);
    const [nextId, setNextId] = useState(2);

    const handleInputChange = (id, key, value) => {
        const updatedInputs = inputs.map(input =>
            input.id === id ? { ...input, [key]: value } : input
        );
        setInputs(updatedInputs);
        onInputChange(updatedInputs); // Pass the updated inputs to the parent component
    };

    const handleAddInput = () => {
        const newInput = { id: nextId, value: '' };
        setInputs([...inputs, newInput]);
        setNextId(nextId + 1);
    };

    const handleRemoveInput = id => {
        const updatedInputs = inputs.filter(input => input.id !== id);
        setInputs(updatedInputs);
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
                                onBlur={event => handleInputChange(input.id, 'field', event.target.value)}
                            />
                        </Col>
                        <Col span={6}>
                            <Select
                                onChange={value => handleInputChange(input.id, 'includeInReport', value)}
                                style={{ width: '100%' }}
                                placeholder="Include in Report?"
                            >
                                <Option value={true}>Yes</Option>
                                <Option value={false}>No</Option>
                            </Select>
                        </Col>
                        {inputs.length > 1 && (
                            <Col span={2}>
                                <Button onClick={() => handleRemoveInput(input.id)}><DeleteOutlined /></Button>
                            </Col>
                        )}
                    </Row>
                </div>
            ))}
        </div>
    );
};

export default EncryptingDynamicInputs;
