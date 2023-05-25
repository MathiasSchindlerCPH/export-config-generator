import React, { useState } from 'react';
import { Tag, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CustomTagComponent = () => {
  const [tags, setTags] = useState([]); // State to store the tags
  const [inputVisible, setInputVisible] = useState(false); // State to toggle input visibility
  const [inputValue, setInputValue] = useState(''); // State to store the input value

  // Function to handle adding a new tag
  const handleAddTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, { name: inputValue, color: getRandomColor() }]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  // Function to handle removing a tag
  const handleRemoveTag = (removedTag) => {
    const updatedTags = tags.filter((tag) => tag.name !== removedTag);
    setTags(updatedTags);
  };

  // Function to generate a random color
  const getRandomColor = () => {
    const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9', '#7265e6', '#ffbf00', '#ff7f50', '#20b2aa', '#5f9ea0'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div>
      {tags.map((tag) => (
        <Tag key={tag.name} closable onClose={() => handleRemoveTag(tag.name)} color={tag.color}>
          {tag.name}
        </Tag>
      ))}
      {inputVisible && (
        <Input
          type="text"
          size="small"
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleAddTag}
          onPressEnter={handleAddTag}
        />
      )}
      {!inputVisible && (
        <Tag onClick={() => setInputVisible(true)} style={{ background: '#fff', borderStyle: 'dashed' }}>
          <PlusOutlined /> Add Tag
        </Tag>
      )}
    </div>
  );
};

export default CustomTagComponent;
