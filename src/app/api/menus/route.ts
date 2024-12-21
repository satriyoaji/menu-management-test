import { NextResponse } from 'next/server';

interface Menu {
  id: string;
  name: string;
  depth: number;
  parentId: string | null;
}

let menus: Menu[] = [
  // Example initial data
  { id: '1', name: 'System Management', depth: 0, parentId: null },
  { id: '2', name: 'System Code', depth: 1, parentId: '1' },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const menuId = searchParams.get('id');

  if (menuId) {
    const menu = menus.find(menu => menu.id === menuId);
    return NextResponse.json(menu);
  }

  return NextResponse.json(menus);
}

export async function POST(req: Request) {
  const newMenu: Menu = await req.json();
  menus.push(newMenu);
  return NextResponse.json(newMenu);
}

export async function PUT(req: Request) {
  const updatedMenu: Menu = await req.json();
  menus = menus.map(menu => (menu.id === updatedMenu.id ? updatedMenu : menu));
  return NextResponse.json(updatedMenu);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const menuId = searchParams.get('id');
  menus = menus.filter(menu => menu.id !== menuId);
  return NextResponse.json({ success: true });
}
