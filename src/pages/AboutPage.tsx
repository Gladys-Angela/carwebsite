import Navigation from "@/components/Navigation";

const AboutPage = () => {
  return (
    <div>
      <Navigation />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="mt-4">
          Welcome to DriveElite, your premier destination for buying and hiring top-quality vehicles. Our mission is to provide a seamless and enjoyable experience for car enthusiasts and everyday drivers alike.
        </p>
        <p className="mt-4">
          Founded in 2024, DriveElite has quickly become a trusted name in the automotive industry. We pride ourselves on our extensive selection of vehicles, competitive pricing, and exceptional customer service. Whether you're looking to purchase your dream car or need a reliable vehicle for a weekend getaway, we have you covered.
        </p>
        <p className="mt-4">
          Our team is passionate about cars and dedicated to helping you find the perfect vehicle to fit your needs and budget. We believe in transparency and honesty, and we strive to build long-lasting relationships with our customers.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;