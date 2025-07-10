import { useEffect, useState } from "react";
import { Star, MapPin, Calendar, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "@/api";

const FeaturedCars = () => {
  const [featuredCars, setFeaturedCars] = useState([]);

  const handleAddToCart = async (carId, type) => {
    try {
      await api.post('/cart', { carId, type, quantity: 1 });
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const response = await api.get('/cars/featured');
        setFeaturedCars(response.data);
      } catch (error) {
        console.error("Error fetching featured cars:", error);
      }
    };
    fetchFeaturedCars();
  }, []);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Featured Vehicles</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our handpicked selection of premium vehicles from trusted dealers
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {featuredCars.map((car) => (
          <Card key={car.id} className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
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
                  <Button className="flex-1" size="sm" onClick={() => handleAddToCart(car.id, 'Sale')}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                ) : (
                  <Button className="flex-1" size="sm" onClick={() => handleAddToCart(car.id, 'Hire')}>
                    Hire Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCars;
