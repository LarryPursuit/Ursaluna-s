import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Clock, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div 
        className="relative h-[500px] rounded-xl overflow-hidden mb-12"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-5xl font-bold mb-4">Delicious Food Delivered</h1>
            <p className="text-xl mb-8">Experience the finest cuisine from our kitchen to your table</p>
            <Link 
              to="/menu" 
              className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <ChefHat className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Expert Chefs</h3>
          <p className="text-gray-600">Crafted with passion by our experienced culinary team</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Quick Delivery</h3>
          <p className="text-gray-600">Fast and reliable delivery to your doorstep</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Pickup</h3>
          <p className="text-gray-600">Convenient pickup options at your preferred time</p>
        </div>
      </div>
    </div>
  );
}