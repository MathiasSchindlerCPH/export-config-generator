import React, { useState } from 'react';
import { Form, Input, Button, Select, Divider, Collapse, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import './FormComponent.css'; // Create a new CSS file for your component
import EncryptingDynamicInputs from '../customComponents/EncryptingDynamicInputs';
import FilteringDynamicInputs from '../customComponents/FilteringDynamicInputs';
import SplittingDynamicInputs from '../customComponents/SplittingDynamicInputs';

import SE_logo from '../media/SE_logo.jpeg';

const FormComponent = () => {
    // State for encryptingInputs
    const [encryptingInputs, setEncryptingInputs] = useState([]);
    const [filteringInputs, setFilteringInputs] = useState([]);
    const [sortingInputs, setSortingInputs] = useState([]);

    const handleEncryptingInputsChange = (updatedInputs) => {
        setEncryptingInputs(updatedInputs);
        console.log(encryptingInputs);
    };

    const handleFilteringInputsChange = (updatedInputs) => {
        setFilteringInputs(updatedInputs);
        console.log(filteringInputs);
    };

    const handleSortingInputsChange = (updatedInputs) => {
        setSortingInputs(updatedInputs);
        console.log(sortingInputs);
    };

    const { Panel } = Collapse;

    const navigate = useNavigate();

    const onFinish = (values) => {
        const {
            dataSource,
            subfolder,
            sourceType,
            sourcePath,
            encryptPath,
            filterPath,
            sortingPathPreRegion,
            sortingPathPostRegion,
            endpoint,
            payload,
            encryptionKey
        } = values;

        const encryptFieldsForJson = encryptingInputs.map(({ field, includeInReport }) => ({ field, includeInReport }));
        const sortFieldsForJson = sortingInputs.map(({ fieldName, type, order }) => ({ fieldName, type, order }));

        const exportFilesKey = subfolder; // Use subfolder as the key

        const exportConfig = {
            dataSource: dataSource || "",
            exportFiles: {
                [exportFilesKey]: {
                    id: subfolder || "",
                    versioning: { currentVersion: "0000", currentVersionDate: "", currentVersionChangedBy: "" },
                    sourceType: sourceType || "",
                    ...(endpoint && payload && {
                        endpoint,
                        payload: {
                            data: JSON.parse(payload),
                        },
                    }),
                    paths: {
                        sourcePath: sourcePath || "",
                        encryptPath: encryptPath || "",
                        filterPath: filterPath || "",
                        sortingPathPreRegion: sortingPathPreRegion || "",
                        sortingPathPostRegion: sortingPathPostRegion || "",
                    },
                    stringCols: [],
                    timestampCols: [],
                    dropCols: [],
                    encryptionKey: encryptionKey || "",
                    encryptionFields: encryptFieldsForJson || [],
                    filterFields: [],
                    sortingRegion: [],
                    sortingFields: sortFieldsForJson || [],
                },
            },
        };

        const json = JSON.stringify(exportConfig, null, 2);
        console.log(json);
        navigate('/json', { state: { json } });
    };



    return (
        <div className='page-container'>
            <div className='logo-container'>
                <img src={SE_logo} alt="Logo" className="logo-image" />
            </div>
            <div className='title-container'>
                <h1>Export Config Generator</h1>
            </div>

            <div className='form-container '>
                <Form onFinish={onFinish}>

                    <Collapse defaultActiveKey={['1']} ghost>
                        <Panel header={<Divider orientation="left">Location</Divider>} key="1">
                            <Form.Item name="dataSource" label="Data Source">
                                <Input />
                            </Form.Item>
                            <Form.Item name="subfolder" label="Subfolder">
                                <Input />
                            </Form.Item>
                        </Panel>
                    </Collapse>

                    <Collapse ghost>
                        <Panel header={<Divider orientation="left">Type</Divider>} key="1">
                            <Form.Item name="sourceType" label="Source Type">
                                <Select
                                    defaultValue="local"
                                    style={{ width: 240 }}
                                    options={[
                                        { value: 'remote-versions', label: 'Remote (Versioning)' },
                                        { value: 'remote-concat', label: 'Remote (Appending)' },
                                        { value: 'local', label: 'Local' }
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                noStyle
                                shouldUpdate={(prevValues, currentValues) =>
                                    prevValues.sourceType !== currentValues.sourceType
                                }
                            >
                                {({ getFieldValue }) => {
                                    const sourceType = getFieldValue('sourceType');
                                    if (sourceType === 'remote-versions' || sourceType === 'remote-concat') {
                                        return (
                                            <>
                                                <Form.Item name="endpoint" label="Endpoint">
                                                    <Input addonBefore="http://" placeholder="www." />
                                                </Form.Item>
                                                <Form.Item name="payload" label="Payload">
                                                    <Input.TextArea style={{ minHeight: '50px' }} autoSize />
                                                </Form.Item>
                                            </>
                                        );
                                    }
                                    return null;
                                }}
                            </Form.Item>
                        </Panel>
                    </Collapse>

                    <Collapse ghost>
                        <Panel header={<Divider orientation="left">Paths</Divider>} key="1">
                            <Form.Item name="sourcePath" label="Path to Raw Folder">
                                <Input defaultValue='/scratch/<LAB>/<DATAMGT>/raw/<DATASOURCE>/<SUBFOLDER>/' />
                            </Form.Item>
                            <Form.Item name="encryptPath" label="Path to Encrypted Folder">
                                <Input defaultValue='/scratch/<LAB>/<DATAMGT>/encrypted/<DATASOURCE>/<SUBFOLDER>/' />
                            </Form.Item>
                            <Form.Item name="filterPath" label="Path to Filtered Folder">
                                <Input defaultValue='/scratch/<LAB>/<DATAMGT>/filtered/<DATASOURCE>/<SUBFOLDER>/' />
                            </Form.Item>

                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <Form.Item name="sortingPathPreRegion" label="Path to Shared Data (Before region split):" labelCol={{span: 24}}>
                                        <Input defaultValue='/scratch/<LAB>/shared_data' />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="sortingPathPostRegion" label="Path to Shared Data (After region split):" labelCol={{span: 24}}>
                                        <Input defaultValue='raw/admin/<DATASOURCE>/<SUBFOLDER>' />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>

                    <Collapse ghost>
                        <Panel header={<Divider orientation="left">Fields</Divider>} key="1">
                            <Collapse ghost>
                                <Panel header="Encryption Fields" key="1">
                                    <Form.Item name="encryptionKey" label="Encryption Key">
                                        <Select
                                            placeholder="Please Select Encryption Key"
                                            style={{ width: 240 }}
                                            options={[
                                                { value: 'firebaseId', label: 'firebaseId' },
                                                { value: 'idTea', label: 'idTea' },
                                                { value: 'idMonk', label: 'idMonk' },
                                                { value: 'idMonkGroup', label: 'idMonkGroup' },
                                                { value: 'idMonkStudent', label: 'idMonkStudent' },
                                                { value: 'idGroup', label: 'idGroup' },
                                                { value: 'id', label: 'id' }
                                            ]}
                                        />
                                    </Form.Item>

                                    <EncryptingDynamicInputs onInputChange={handleEncryptingInputsChange} />
                                </Panel>
                            </Collapse>
                            <Collapse ghost>
                                <Panel header="Filter Fields" key="1">
                                    <FilteringDynamicInputs onInputChange={handleFilteringInputsChange} />
                                </Panel>
                            </Collapse>
                            <Collapse ghost>
                                <Panel header="Splitting Fields" key="1">
                                    <SplittingDynamicInputs onInputChange={handleSortingInputsChange} />
                                </Panel>
                            </Collapse>
                        </Panel>
                    </Collapse>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default FormComponent;