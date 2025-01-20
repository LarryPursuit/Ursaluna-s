/*
  # Add initial menu items

  1. Data Changes
    - Insert 10 menu items across different categories:
      - Appetizers
      - Main Courses
      - Desserts
      - Beverages
*/

INSERT INTO menu_items (name, description, price, category, image_url, available) VALUES
  -- Appetizers
  ('Crispy Spring Rolls', 'Fresh vegetables wrapped in crispy pastry, served with sweet chili sauce', 8.99, 'appetizers', 'https://images.unsplash.com/photo-1544591799-27c31d032148?auto=format&fit=crop&w=800&q=80', true),
  ('Bruschetta', 'Toasted bread topped with fresh tomatoes, garlic, basil, and olive oil', 7.99, 'appetizers', 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=80', true),
  
  -- Main Courses
  ('Grilled Salmon', 'Fresh Atlantic salmon with lemon herb butter sauce and seasonal vegetables', 24.99, 'main courses', 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=800&q=80', true),
  ('Beef Tenderloin', '8oz grass-fed beef tenderloin with red wine reduction and truffle mashed potatoes', 32.99, 'main courses', 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80', true),
  ('Mushroom Risotto', 'Creamy Arborio rice with wild mushrooms, parmesan, and fresh herbs', 19.99, 'main courses', 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80', true),
  ('Margherita Pizza', 'Fresh mozzarella, tomatoes, basil, and extra virgin olive oil', 16.99, 'main courses', 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800&q=80', true),
  
  -- Desserts
  ('Tiramisu', 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream', 8.99, 'desserts', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80', true),
  ('Chocolate Lava Cake', 'Warm chocolate cake with a molten center, served with vanilla ice cream', 9.99, 'desserts', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80', true),
  
  -- Beverages
  ('Fresh Fruit Smoothie', 'Blend of seasonal fruits with yogurt and honey', 6.99, 'beverages', 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=80', true),
  ('Craft Lemonade', 'House-made lemonade with fresh mint and berries', 4.99, 'beverages', 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80', true);