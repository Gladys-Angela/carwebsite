import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import api from '@/api';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get('/cart');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  const handleRemove = async (itemId) => {
    try {
      await api.delete(`/cart/items/${itemId}`);
      const response = await api.get('/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      await api.put(`/cart/items/${itemId}`, { quantity });
      const response = await api.get('/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  if (!cart) {
    return (
      <div>
        <Navigation />
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  const subtotal = cart.items.reduce((acc, item) => {
    const price = item.type === 'Sale' ? item.car.price : item.car.hireRate;
    return acc + price * item.quantity;
  }, 0);

  return (
    <div>
      <Navigation />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        {cart.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-4">
                        <img src={item.car.image} alt={item.car.model} className="w-24 h-24 object-cover rounded-lg" />
                        <div>
                          <h2 className="font-semibold">{item.car.make} {item.car.model}</h2>
                          <p className="text-muted-foreground">{item.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${item.type === 'Sale' ? item.car.price.toLocaleString() : item.car.hireRate.toLocaleString()}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</Button>
                          <span>{item.quantity}</span>
                          <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
                        </div>
                        <Button variant="link" size="sm" onClick={() => handleRemove(item.id)}>Remove</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <Button asChild className="w-full">
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;