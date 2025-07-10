import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-[560px] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/car-images/home.png')" }}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Find Your Perfect Ride
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          The easiest way to buy, sell, and hire amazing cars.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg">Explore Cars</Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
            List Your Car
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
