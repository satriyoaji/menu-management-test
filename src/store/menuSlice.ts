import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Menu {
  id: string;
  name: string;
  depth: number;
  parentId: string | null;
}

interface MenuState {
  menus: Menu[];
  selectedMenu: Menu | null;
}

const initialState: MenuState = {
  menus: [],
  selectedMenu: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenus(state, action: PayloadAction<Menu[]>) {
      state.menus = action.payload;
    },
    selectMenu(state, action: PayloadAction<Menu | null>) {
      state.selectedMenu = action.payload;
    },
    addMenu(state, action: PayloadAction<Menu>) {
      state.menus.push(action.payload);
    },
    updateMenu(state, action: PayloadAction<Menu>) {
      const index = state.menus.findIndex(menu => menu.id === action.payload.id);
      if (index !== -1) {
        state.menus[index] = action.payload;
      }
    },
    deleteMenu(state, action: PayloadAction<string>) {
      state.menus = state.menus.filter(menu => menu.id !== action.payload);
    },
  },
});

export const { setMenus, selectMenu, addMenu, updateMenu, deleteMenu } = menuSlice.actions;
export default menuSlice.reducer;