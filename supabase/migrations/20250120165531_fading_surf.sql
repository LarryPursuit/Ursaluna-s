/*
  # Update spring rolls image URL

  1. Changes
    - Update the image URL for the Crispy Spring Rolls menu item to a more reliable image
*/

DO $$ 
BEGIN 
  UPDATE menu_items 
  SET image_url = 'https://images.unsplash.com/photo-1548507200-902b0b8241aa?auto=format&fit=crop&w=800&q=80'
  WHERE name = 'Crispy Spring Rolls';
END $$;