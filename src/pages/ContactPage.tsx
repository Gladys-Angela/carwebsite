import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ContactPage = () => {
  return (
    <div className="bg-gray-50">
      <Navigation />
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Get in Touch</h1>
          <p className="mt-4 text-lg text-gray-600">
            We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>
        <div className="mt-16 max-w-2xl mx-auto">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" required rows={6} />
            </div>
            <Button type="submit" className="w-full py-6 text-lg">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;