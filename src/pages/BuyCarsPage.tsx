import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, Fuel, Settings, Phone, ShoppingCart } from "lucide-react";
import api from "@/api";
import SearchFilters from "@/components/SearchFilters";
import { Car } from "@/types";

const BuyCarsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);

  const handleAddToCart = async (carId: string, type: 'Sale' | 'Hire') => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add items to cart');
        return;
      }

      await api.post('/cart', { carId, type, quantity: 1 });
      alert('Item added to cart!');
    } catch (error: any) {
      console.error('Error adding item to cart:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add item to cart';
      alert(errorMessage);
    }
  };

  const handleSearch = async (filters: any) => {
    try {
      const response = await api.get('/cars', { params: filters });
      setCars(response.data.cars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars');
        setCars(response.data.cars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">All Cars</h1>
        <div className="mb-8">
          <SearchFilters onSearch={handleSearch} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cars.map((car) => (
            <Card key={car._id} className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={car.image}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    {car.condition}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 bg-card">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl">
                    {car.make} {car.model}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-5 w-5" />
                    <span className="text-sm font-semibold">{car.averageRating}</span>
                  </div>
                </div>
                <p className="text-lg font-semibold text-primary mb-3">
                  ${car.price.toLocaleString()}
                </p>
                <div className="text-sm text-muted-foreground space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{car.location}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  {car.type === 'Sale' ? (
                    <Button className="flex-1" size="sm" onClick={() => handleAddToCart(car._id, 'Sale')}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  ) : (
                    <Button className="flex-1" size="sm" onClick={() => handleAddToCart(car._id, 'Hire')}>
                      Hire Now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyCarsPage;
