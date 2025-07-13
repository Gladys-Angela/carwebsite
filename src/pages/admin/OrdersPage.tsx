import React, { useEffect, useState } from 'react';
import { getOrders } from '../../services/adminService';
import { Order } from '../../types';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrders();
      setOrders(response);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Orders</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Order ID</th>
            <th className="py-2">Customer</th>
            <th className="py-2">Email</th>
            <th className="py-2">Total Price</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">{order.user.username}</td>
              <td className="border px-4 py-2">{order.user.email}</td>
              <td className="border px-4 py-2">${order.totalPrice.toLocaleString()}</td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;