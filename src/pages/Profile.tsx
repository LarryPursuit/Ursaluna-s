import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types';
import Auth from '../components/Auth';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    newAddress: ''
  });

  useEffect(() => {
    async function fetchProfile() {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setUser(data);
      setFormData({
        full_name: data?.full_name || '',
        phone: data?.phone || '',
        newAddress: ''
      });
      setLoading(false);
    }

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: formData.full_name,
        phone: formData.phone
      })
      .eq('id', session.session.user.id);

    if (error) {
      console.error('Error updating profile:', error);
      return;
    }

    setUser(prev => prev ? {
      ...prev,
      full_name: formData.full_name,
      phone: formData.phone
    } : null);
    setEditing(false);
  };

  const addAddress = async () => {
    if (!formData.newAddress || !user) return;

    const updatedAddresses = [...(user.addresses || []), formData.newAddress];
    const { error } = await supabase
      .from('profiles')
      .update({ addresses: updatedAddresses })
      .eq('id', user.id);

    if (error) {
      console.error('Error adding address:', error);
      return;
    }

    setUser(prev => prev ? {
      ...prev,
      addresses: updatedAddresses
    } : null);
    setFormData(prev => ({ ...prev, newAddress: '' }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto">
        <Auth />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <p className="mt-1">{user.full_name || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <p className="mt-1">{user.phone || 'Not set'}</p>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
            >
              Edit Profile
            </button>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Saved Addresses</h3>
          <div className="space-y-4">
            {user.addresses && user.addresses.map((address, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-md">
                {address}
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.newAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, newAddress: e.target.value }))}
                placeholder="Add new address"
                className="flex-1 p-2 border rounded-md"
              />
              <button
                onClick={addAddress}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}