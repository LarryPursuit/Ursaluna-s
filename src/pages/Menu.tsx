import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MenuItem } from '../types';
import { useCartStore } from '../store/cart';
import { Plus, Minus, ShoppingBag } from 'lucide-react';

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { items: cartItems, addItem, updateQuantity } = useCartStore();

  useEffect(() => {
    async function fetchMenuItems() {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('available', true)
        .order('category');

      if (error) {
        console.error('Error fetching menu items:', error);
        return;
      }

      setMenuItems(data);
      setLoading(false);
    }

    fetchMenuItems();
  }, []);

  const getItemQuantity = (itemId: string) => {
    const item = cartItems.find(item => item.id === itemId);
    return item?.quantity || 0;
  };

  const categories = [...new Set(menuItems.map(item => item.category))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
        <p className="text-lg text-gray-600">Discover our delicious selection of dishes</p>
      </div>

      {categories.map(category => (
        <div key={category} className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 capitalize">
            {category.replace('-', ' ')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems
              .filter(item => item.category === category)
              .map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                      <span className="text-lg font-bold text-orange-500">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    
                    {getItemQuantity(item.id) === 0 ? (
                      <button
                        onClick={() => addItem(item)}
                        className="w-full bg-orange-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => updateQuantity(item.id, getItemQuantity(item.id) - 1)}
                          className="p-2 rounded-lg bg-orange-100 text-orange-500 hover:bg-orange-200"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <span className="font-semibold text-lg">
                          {getItemQuantity(item.id)}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, getItemQuantity(item.id) + 1)}
                          className="p-2 rounded-lg bg-orange-100 text-orange-500 hover:bg-orange-200"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}