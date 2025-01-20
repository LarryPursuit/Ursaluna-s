import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { supabase } from '../lib/supabase';

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
      // Handle authentication
      return;
    }

    setLoading(true);
    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: session.data.session.user.id,
          total: total(),
          type: orderType,
          delivery_address: orderType === 'delivery' ? address : null,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map(item => ({
        order_id: order.id,
        menu_item_id: item.id,
        quantity: item.quantity,
        price: item.price,
        special_instructions: item.special_instructions
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/menu')}
          className="text-orange-500 hover:text-orange-600"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {items.map(item => (
          <div key={item.id} className="flex items-center py-4 border-b last:border-b-0">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1 ml-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="p-1 text-red-500 hover:bg-red-50 rounded-md ml-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Order Type</h3>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="pickup"
                checked={orderType === 'pickup'}
                onChange={(e) => setOrderType(e.target.value as 'pickup')}
                className="mr-2"
              />
              Pickup
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="delivery"
                checked={orderType === 'delivery'}
                onChange={(e) => setOrderType(e.target.value as 'delivery')}
                className="mr-2"
              />
              Delivery
            </label>
          </div>
        </div>

        {orderType === 'delivery' && (
          <div className="mb-4">
            <label className="block font-semibold mb-2">Delivery Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={3}
            />
          </div>
        )}

        <div className="flex justify-between items-center text-xl font-semibold mb-4">
          <span>Total:</span>
          <span>${total().toFixed(2)}</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading || (orderType === 'delivery' && !address)}
          className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}