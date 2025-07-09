import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, Fuel, Settings, Phone } from "lucide-react";
import api from "@/api";

const BuyCarsPage = () => {
  const [cars, setCars] = useState([]);

  const handleAddToCart = async (carId, type) => {
    try {
      await api.post('/cart', { carId, type, quantity: 1 });
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map((car) => (
            <Card key={car.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={car.image}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 left-2 bg-primary">
                    {car.condition}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">
                    {car.year} {car.make} {car.model}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{car.averageRating}</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary mb-3">
                  ${car.price.toLocaleString()}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {car.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {car.mileage.toLocaleString()} miles
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Settings className="h-4 w-4" />
                      {car.transmission}
                    </div>
                    <div className="flex items-center gap-1">
                      <Fuel className="h-4 w-4" />
                      {car.fuelType}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {car.features.split(',').slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature.trim()}
                    </Badge>
                  ))}
                  {car.features.split(',').length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{car.features.split(',').length - 2} more
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  {car.type === 'Sale' ? (
                    <Button className="flex-1" size="sm" onClick={() => handleAddToCart(car.id, 'Sale')}>
                      Add to Cart
                    </Button>
                  ) : (
                    <Button className="flex-1" size="sm" onClick={() => handleAddToCart(car.id, 'Hire')}>
                      Hire Now
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Listed by {car.dealer.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyCarsPage;