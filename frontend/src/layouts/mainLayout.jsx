import NavBar from '@/components/common/navBar';
import TopBar from '@/components/common/topBar';
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="flex h-[100dvh] w-screen justify-center bg-black">
      <div className="relative flex h-full w-full max-w-[390px] flex-col bg-white overflow-hidden">
        <TopBar />

        <main className="no-scrollbar flex-1 overflow-y-auto pb-[calc(64px+env(safe-area-inset-bottom))] touch-pan-y">
          <Outlet />
        </main>

        <NavBar />
      </div>
    </div>
  );
}
