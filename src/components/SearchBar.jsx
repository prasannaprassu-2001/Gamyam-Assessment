import React, { useEffect, useState } from 'react';
import { Input } from 'reactstrap';

export default function SearchBar({ onSearch, debounceMs = 500, placeholder = '' }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      onSearch(value);
    }, debounceMs);
    return () => clearTimeout(t);
  }, [value, debounceMs, onSearch]);

  return (
    <div className="my-3">
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
