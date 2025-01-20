import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Utensils, ShoppingCart, User, LogOut } from "lucide-react";
import { useCartStore } from "../store/cart";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const cartItems = useCartStore((state) => state.items);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Utensils className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-xl">Ursaluna's</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/menu" className="text-gray-700 hover:text-orange-500">
              Menu
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-orange-500" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link to="/profile">
              <User className="h-6 w-6 text-gray-700 hover:text-orange-500" />
            </Link>
            {isAuthenticated && (
              <button
                onClick={handleSignOut}
                className="text-gray-700 hover:text-orange-500"
                aria-label="Sign out"
              >
                <LogOut className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
