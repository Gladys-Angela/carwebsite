import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <Badge variant="secondary" className="mb-4">
          🚗 Over 1,200 Premium Cars Available
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Find Your Dream Car
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover premium vehicles from trusted dealers. Whether you're buying, selling, or renting, 
          we make car ownership simple and affordable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            Browse Cars
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8">
            Sell Your Car
          </Button>
        </div>
        
        {/* Featured badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Badge variant="secondary" className="px-4 py-2">
            ✓ Verified Dealers
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            ✓ Best Prices
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            ✓ Instant Financing
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            ✓ Test Drive Available
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
