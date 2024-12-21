'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMenu, updateMenu } from '../store/menuSlice';
import { RootState } from '../store/store';

const MenuForm: React.FC = () => {
  const dispatch = useDispatch();
  const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    setName(selectedMenu?.name || '');
  }, [selectedMenu]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedMenu) {
      dispatch(updateMenu({ ...selectedMenu, name }));
    } else {
      dispatch(addMenu({ id: Date.now().toString(), name, parentId: null, depth: 0 }));
    }

    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Menu Name"
        className="border rounded p-2"
      />
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Save
      </button>
    </form>
  );
};

export default MenuForm;
