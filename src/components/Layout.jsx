import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="flex h-full">
            <Sidebar />
            <main className="flex-1 flex items-center justify-center overflow-y-auto bg-zinc-900 text-white">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
