import { useEffect, useState } from "react";
import { Menu, X, User, Heart, ShoppingCart, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const user = localStorage.getItem('user');
      if (user) {
        setUser(JSON.parse(user));
      } else {
        setUser(null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">DriveElite</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
            {user && user.role === 'admin' && (
              <Link to="/admin" className="text-foreground hover:text-primary transition-colors">Admin</Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-4 w-4" />
              </Link>
            </Button>
            {token ? (
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-foreground hover:text-primary">Home</Link>
              <Link to="/about" className="block px-3 py-2 text-foreground hover:text-primary">About</Link>
              <Link to="/contact" className="block px-3 py-2 text-foreground hover:text-primary">Contact</Link>
              {user && user.role === 'admin' && (
                <Link to="/admin" className="block px-3 py-2 text-foreground hover:text-primary">Admin</Link>
              )}
              <div className="flex items-center space-x-2 px-3 py-2">
                {token ? (
                  <Button onClick={handleLogout} variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/login">
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link to="/register">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
