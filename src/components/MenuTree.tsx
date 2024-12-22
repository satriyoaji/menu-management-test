'use client';

import React, { useState } from 'react';
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
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const handleAddMenu = (parentId: string | null, depth: number) => {
    const newMenu = {
      id: Date.now().toString(),
      name: 'New Menu',
      parentId,
      depth: depth + 1,
    };
    dispatch(addMenu(newMenu));
  };

  const toggleExpand = (menuId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const isExpanded = (menuId: string) => expandedItems[menuId];

  const getChildMenus = (parentId: string | null) => {
    return menus.filter(menu => menu.parentId === parentId);
  };

  return (
    <ul className={`relative pl-4 border-l border-gray-300`}>
      {getChildMenus(parentId).map(menu => (
        <li key={menu.id} className="relative pb-2">
          {/* Connecting Line */}
          <div className="flex items-center">
            <span
              className={`absolute left-[-1.5rem] h-full border-l border-gray-300`}
              aria-hidden="true"
            ></span>
            {getChildMenus(menu.id).length > 0 && (
              <button
                onClick={() => toggleExpand(menu.id)}
                className="mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {isExpanded(menu.id) ? '▼' : '►'}
              </button>
            )}
            <div
              className="flex-1 flex items-center justify-between group hover:bg-gray-100 p-2 rounded"
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
          </div>
          {isExpanded(menu.id) && (
            <MenuTree menus={menus} parentId={menu.id} depth={depth + 1} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuTree;
