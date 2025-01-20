export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  available: boolean;
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  type: 'pickup' | 'delivery';
  delivery_address?: string;
  created_at: string;
}

export interface OrderItem {
  menu_item_id: string;
  quantity: number;
  price: number;
  special_instructions?: string;
  menu_item: MenuItem;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  addresses: string[];
}