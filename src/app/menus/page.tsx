'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenus } from '../../store/menuSlice';
import MenuTree from '../../components/MenuTree';
import MenuForm from '../../components/MenuForm';
import { RootState } from '../../store/store';

const MenusPage: React.FC = () => {
  const dispatch = useDispatch();
  const menus = useSelector((state: RootState) => state.menu.menus);

  useEffect(() => {
    const fetchMenus = async () => {
      const response = await fetch('/api/menus');
      const data = await response.json();
      dispatch(setMenus(data));
    };

    fetchMenus();
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Menus</h1>
      <MenuForm />
      <MenuTree menus={menus} />
    </div>
  );
};

export default MenusPage;
