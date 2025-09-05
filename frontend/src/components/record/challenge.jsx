import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Challenge() {
  return (
    <div className="min-h-[100dvh] w-auto bg-black flex justify-center">
      <main className="relative w-full max-w-[390px] bg-white">
        <Outlet />
      </main>
    </div>
  );
}
