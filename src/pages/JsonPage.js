import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';

const JsonPage = () => {
  const location = useLocation();
  const { json } = location.state;
  const data = JSON.parse(json);

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
  
    // Extract the key from the exportFiles object
    const exportFilesKey = Object.keys(data.exportFiles)[0];
    const filename = `exportConfig_${exportFilesKey}.json`; // Add the key as a suffix
  
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  return (
    <div>
      <Button type="primary" onClick={handleDownload}>
        Download JSON
      </Button>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display the nested object */}
    </div>
  );
};

export default JsonPage;
