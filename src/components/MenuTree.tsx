'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { addMenu, deleteMenu, selectMenu } from '../store/menuSlice';

interface Menu {
  id: string;
  name: string;
  depth: number;
  parentId: string | null;
}

interface MenuTreeProps {
  menus: Menu[];
  parentId?: string | null;
  depth?: number;
}

const MenuTree: React.FC<MenuTreeProps> = ({ menus, parentId = null, depth = 0 }) => {
  const dispatch = useDispatch();

  const handleAddMenu = (parentId: string | null, depth: number) => {
    const newMenu = {
      id: Date.now().toString(),
      name: 'New Menu',
      parentId,
      depth: depth + 1,
    };
    dispatch(addMenu(newMenu));
  };

  return (
    <ul>
      {menus
        .filter(menu => menu.parentId === parentId)
        .map(menu => (
          <li key={menu.id} style={{ marginLeft: depth * 20 }}>
            <div
              className="flex items-center justify-between group hover:bg-gray-100 p-2 rounded"
            >
              <span>{menu.name}</span>
              <div className="flex items-center space-x-2">
                <button
                  className="hidden group-hover:block text-blue-500"
                  onClick={() => handleAddMenu(menu.id, menu.depth)}
                >
                  +
                </button>
                <button onClick={() => dispatch(selectMenu(menu))}>Edit</button>
                <button onClick={() => dispatch(deleteMenu(menu.id))}>Delete</button>
              </div>
            </div>
            <MenuTree menus={menus} parentId={menu.id} depth={depth + 1} />
          </li>
        ))}
    </ul>
  );
};

export default MenuTree;
