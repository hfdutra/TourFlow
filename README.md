# TourFlow - B2B SaaS for Tour Operators

TourFlow is a comprehensive white-label platform designed for tour operators in Portugal to manage bookings, fleet, operations, and B2B agent networks.

## 🚀 Features

### Core Platform
- **Dashboard**: Real-time KPIs, revenue tracking, and operational alerts.
- **Product Management**: Create and manage day trips, multi-day tours, and excursions.
- **Departures**: Calendar view for managing schedules, capacity, and assignments.

### Operations
- **Fleet Management**: Manage coaches, amenities, and interactive seat layouts.
- **Routes**: Define pickup points with Google Maps/Mapbox integration concepts.
- **Mobile Check-in**: PWA-ready scanner for drivers and guides.

### Sales & CRM
- **Booking Engine**: Public-facing wizard for customers (B2C).
- **Agent Portal**: Dedicated area for B2B partners to manage bookings and commissions.
- **CRM**: Customer profiles, history, and segmentation.
- **Invoicing**: SAFT-compliant invoicing flow (Vendus integration simulation).

### Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Charts**: Recharts
- **PWA**: Manifest & Service Worker included

## 🛠️ Setup & Running

This project is built to run directly in the browser environment or via a standard React build process.

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/tourflow.git

# Install dependencies
npm install

# Start development server
npm start
```

## 🔐 Test Credentials (Mock Data)

Since this is a frontend prototype with mock data, use the following credentials to test different roles:

### Operator Admin (Dashboard)
- **Email**: `admin@verticaltur.pt`
- **Password**: (Any value)

### B2B Agent (Agent Portal)
- **URL**: `/agent`
- **Login**: Auto-login simulation for demo purposes.

## 📱 PWA Features

The application is PWA-ready.
- **Install**: Click the "Instalar App" banner on mobile devices.
- **Offline**: Basic caching for static assets via Service Worker.
- **Mobile**: Responsive design optimized for field operations (Check-in).

## 📁 Project Structure

```
/src
  /components    # Reusable UI components (Buttons, Cards, Badges)
  /pages         # Route components (Dashboard, Tours, Bookings)
  /services      # Mock data and API services
  /types         # TypeScript definitions
  /public        # Static assets (manifest, icons)
```

## 📄 License

Proprietary software. All rights reserved.
