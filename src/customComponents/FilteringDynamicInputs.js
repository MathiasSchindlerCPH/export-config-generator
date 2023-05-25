import React, { useState } from 'react';
import { Select, Button, Row, Col, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import CustomTagComponent from './CustomTagComponent';

const { Option } = Select;

const FilteringDynamicInputs = ({ onInputChange }) => {
    const [inputs, setInputs] = useState([{ id: 1 }]);
    const [nextId, setNextId] = useState(2);

    const handleInputChange = (id, key, value) => {
        const updatedInputs = inputs.map(input => {
            if (input.id === id) {
                return {
                    id,
                    [key]: value === 'true' ? true : false
                };
            } else if (!['noConsent', 'consentReceived', 'manuallyAdd'].includes(key)) {
                return {
                    id,
                    [key]: value
                };
            }
            return input;
        });

        setInputs(updatedInputs);
        onInputChange(updatedInputs);
    };


    const handleAddInput = () => {
        const newInput = { id: nextId };
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
                                onBlur={e => handleInputChange(input.id, e.target.value, e.target.value)}
                            />
                        </Col>
                        <Col span={6}>
                            <Select
                                onChange={value => handleInputChange(input.id, 'noConsent', value)}
                                style={{ width: '100%' }}
                                placeholder="noConsent"
                            >
                                <Option value="-">-</Option>
                                <Option value="true">True</Option>
                                <Option value="false">False</Option>
                            </Select>
                        </Col>
                        <Col span={6}>
                            <Select
                                onChange={value => handleInputChange(input.id, 'consentReceived', value)}
                                style={{ width: '100%' }}
                                placeholder="consentReceived"
                            >
                                <Option value="-">-</Option>
                                <Option value="true">True</Option>
                                <Option value="false">False</Option>
                            </Select>
                        </Col>
                        <Col span={6}>
                            <CustomTagComponent />
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

export default FilteringDynamicInputs;
