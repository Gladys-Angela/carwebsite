import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import api from '@/api';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div>
        <Navigation />
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Order Confirmation</h1>
        <p>Thank you for your order!</p>
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Total:</strong> ${order.totalPrice.toLocaleString()}</p>
        <p><strong>Status:</strong> {order.status}</p>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;