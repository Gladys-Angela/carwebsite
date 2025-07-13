import React, { useEffect, useState } from 'react';
import { getOrders } from '../../services/adminService';
import { Order } from '../../types';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getOrders();
        console.log('Orders response:', response);
        setOrders(response);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching orders:', err);
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Manage Orders</h1>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Manage Orders</h1>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  const createTestOrder = async () => {
    try {
      const response = await fetch('/api/admin/orders/test', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        alert('Test order created successfully!');
        // Refresh the orders list
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating test order:', error);
      alert('Failed to create test order');
    }
  };

  const refreshOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders();
      setOrders(response);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Orders</h1>
        <div className="flex gap-2">
          <button 
            onClick={refreshOrders}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Refresh Orders
          </button>
          <button 
            onClick={createTestOrder}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create Test Order
          </button>
        </div>
      </div>
      {orders.length === 0 ? (
        <div className="mt-4">
          <p className="text-gray-500">No orders found. Orders will appear here when customers make purchases.</p>
          <p className="text-sm text-gray-400 mt-2">You can create a test order using the button above to see how the orders display works.</p>
        </div>
      ) : (
        <table className="min-w-full bg-white mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Customer</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Total Price</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{order.user?.username || 'N/A'}</td>
                <td className="border px-4 py-2">{order.user?.email || 'N/A'}</td>
                <td className="border px-4 py-2">${order.totalPrice.toLocaleString()}</td>
                <td className="border px-4 py-2">{order.status}</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersPage;
