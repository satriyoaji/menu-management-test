'use client';

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenus } from '../../store/menuSlice';
import MenuTree from '../../components/MenuTree';
import MenuForm from '../../components/MenuForm';
import { RootState } from '../../store/store';

const MenusPage: React.FC = () => {
  const dispatch = useDispatch();
  const menus = useSelector((state: RootState) => state.menu.menus);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menuTreeRef = useRef<any>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      const response = await fetch('/api/menus');
      const data = await response.json();
      dispatch(setMenus(data));
    };

    fetchMenus();
  }, [dispatch]);

  const expandAll = () => {
    if (menuTreeRef.current) {
      menuTreeRef.current.expandAllMenus();
    }
  };

  const collapseAll = () => {
    if (menuTreeRef.current) {
      menuTreeRef.current.collapseAllMenus();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Menus</h1>
      <div className="mb-4 flex justify-between items-center">
        <MenuForm />
        <div>
          <button
            onClick={expandAll}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Collapse All
          </button>
        </div>
      </div>
      <MenuTree ref={menuTreeRef} menus={menus} />
    </div>
  );
};

export default MenusPage;
