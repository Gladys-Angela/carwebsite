import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <Link to="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            Dashboard
          </Link>
          <Link to="/admin/cars" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            Cars
          </Link>
          <Link to="/admin/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            Orders
          </Link>
          <Link to="/admin/users" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            Users
          </Link>
        </nav>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;