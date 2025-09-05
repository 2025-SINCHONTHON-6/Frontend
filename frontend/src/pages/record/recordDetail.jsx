import React from 'react';
import { Outlet } from 'react-router-dom';

export default function RecordDetail() {
  return (
    <div className="min-h-[100dvh] w-auto bg-black flex justify-center">
      <main className="relative w-full max-w-[390px] bg-white">
        <Outlet />
      </main>
    </div>
  );
}
