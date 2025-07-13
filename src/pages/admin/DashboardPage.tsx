import React, { useEffect, useState } from 'react';
import socket from '../../services/socket';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({ sales: 0, inventory: 0 });

  useEffect(() => {
    socket.on('stats', (data) => {
      setStats(data);
    });

    return () => {
      socket.off('stats');
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-bold">Sales</h2>
          <p className="text-2xl">{stats.sales}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-bold">Inventory</h2>
          <p className="text-2xl">{stats.inventory}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;