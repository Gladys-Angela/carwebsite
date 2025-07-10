import Navigation from "@/components/Navigation";

const AboutPage = () => {
  return (
    <div className="bg-gray-50">
      <Navigation />
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">About DriveElite</h1>
          <p className="mt-4 text-lg text-gray-600">
            Your trusted partner in buying and hiring premium vehicles.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img src="/car-images/about.png" alt="About Us" className="rounded-lg shadow-2xl" />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-gray-600">
              Our mission is to provide a seamless, enjoyable, and trustworthy experience for car enthusiasts and everyday drivers alike. We believe in quality, transparency, and building long-lasting relationships with our customers.
            </p>
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <p className="text-gray-600">
              Founded in 2024, DriveElite has quickly become a leading name in the automotive industry. We pride ourselves on our curated selection of high-quality vehicles, competitive pricing, and unparalleled customer service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;