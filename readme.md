# Ursaluna's Restaurant Application

A modern, full-stack restaurant ordering system built with React, TypeScript, and Supabase.

## Features

- 🍽️ Browse restaurant menu with categories
- 🛒 Real-time cart management
- 👤 User authentication and profiles
- 📍 Multiple delivery addresses support
- 📱 Responsive design
- 🚀 Fast and reliable ordering system

## Tech Stack

- **Frontend:**

  - React 18
  - TypeScript
  - Tailwind CSS
  - Vite
  - Zustand (State Management)
  - Lucide React (Icons)

- **Backend:**
  - Supabase (Database & Authentication)
  - Row Level Security (RLS)
  - Real-time subscriptions

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Route components
├── store/         # Zustand store
├── types/         # TypeScript interfaces
└── lib/           # Utilities and configurations
```

## Key Features

### Authentication

- Email/password authentication
- Protected routes
- Profile management

### Menu Management

- Categorized menu items
- Dynamic pricing
- Availability status

### Cart System

- Real-time updates
- Quantity management
- Special instructions

### Order Management

- Order history
- Status tracking
- Delivery/pickup options

### Profile Management

- Personal information
- Multiple delivery addresses
- Order history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
