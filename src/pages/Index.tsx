import { useState } from "react";
import { Search, Filter, Star, Calendar, MapPin, Phone, Mail, Settings, Fuel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import FeaturedCars from "@/components/featuredCars";
import SearchFilters from "@/components/SearchFilters";
import HeroSection from "@/components/HeroSection";
import api from "@/api";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleAddToCart = async (carId: number, type: string) => {
    try {
      await api.post('/cart', { carId, type, quantity: 1 });
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await api.get(`/cars?search=${searchQuery}`);
      setSearchResults(response.data.cars);
    } catch (error) {
      console.error("Error searching cars:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Search Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-6 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by make, model, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleSearch}>
              Search Cars
            </Button>
          </div>
          
          {showFilters && (
            <div className="mt-6 pt-6 border-t">
              <SearchFilters />
            </div>
          )}
        </div>
      </section>

      {/* Featured Cars */}
      {searchResults.length > 0 ? (
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Search Results</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((car) => (
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
        </section>
      ) : (
        <FeaturedCars />
      )}

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-primary">1,200+</h3>
              <p className="text-muted-foreground">Cars Available</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary">850+</h3>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary">24/7</h3>
              <p className="text-muted-foreground">Customer Support</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary">5 Star</h3>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">DriveElite</h3>
              <p className="text-muted-foreground">
                Your premier destination for quality cars. Find your perfect vehicle today.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Buy Cars</a></li>
                <li><a href="#" className="hover:text-primary">Sell Cars</a></li>
                <li><a href="#" className="hover:text-primary">Finance</a></li>
                <li><a href="#" className="hover:text-primary">Insurance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>(254) 756974567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>info@driveelite.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Nairobi,Kenya</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 DriveElite Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
