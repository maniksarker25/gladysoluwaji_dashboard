import React from 'react';
import { Input } from 'antd';
import { LuSearch } from 'react-icons/lu';

const SearchInput = ({ value, onChange, onSearch, placeholder = 'Search', style }) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onPressEnter={(e) => onSearch?.(e.target.value)}
      allowClear
      prefix={<LuSearch className="text-slate-400 mr-1" />}
      style={{ width: 320, maxWidth: '100%', borderRadius: 12, height: 42, ...style }}
    />
  );
};

export default SearchInput;
