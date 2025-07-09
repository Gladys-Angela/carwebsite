import Navigation from "@/components/Navigation";

const ContactPage = () => {
  return (
    <div>
      <Navigation />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-4">
          We'd love to hear from you! Whether you have a question about our vehicles, pricing, or anything else, our team is ready to answer all your questions.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <ul className="mt-4 space-y-2">
            <li><strong>Email:</strong> contact@driveelite.com</li>
            <li><strong>Phone:</strong> (555) 123-4567</li>
            <li><strong>Address:</strong> 123 Auto Street, City, State</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;