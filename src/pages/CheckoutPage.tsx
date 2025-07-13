import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import api from '@/api';
import { useToast } from '@/components/ui/use-toast';

const CheckoutPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "Authentication required",
        description: "Please log in to proceed with checkout.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create the order in the database
      const response = await api.post('/orders', {
        shippingInfo: {
          name,
          email,
          address
        }
      });
      
      if (response.data) {
        toast({
          title: "Order placed successfully!",
          description: "Thank you for your purchase! Your order has been received and will be processed shortly.",
        });
        
        // Navigate to order confirmation page with order ID
        setTimeout(() => {
          navigate(`/confirmation/${response.data._id}`);
        }, 2000);
      }
    } catch (error: any) {
      console.error('Order creation failed:', error);
      toast({
        title: "Order failed",
        description: error.response?.data?.message || "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Navigation />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="•••• •••• •••• ••••" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry-date">Expiry Date</Label>
                      <Input id="expiry-date" placeholder="MM/YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="•••" required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">Place Order</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
