
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PublicLayout } from './components/public/PublicLayout';
import { AgentLayout } from './components/agent/AgentLayout';
import { Login } from './pages/Login';
import { DashboardHome } from './pages/DashboardHome';
import { TourList } from './pages/Tours/TourList';
import { TourForm } from './pages/Tours/TourForm';
import { DeparturesPage } from './pages/Departures';
import { CoachList } from './pages/Coaches/CoachList';
import { CoachForm } from './pages/Coaches/CoachForm';
import { RouteList } from './pages/Routes/RouteList';
import { RouteForm } from './pages/Routes/RouteForm';
import { CustomerList } from './pages/Customers/CustomerList';
import { CustomerDetail } from './pages/Customers/CustomerDetail';
import { BookingList } from './pages/Bookings/BookingList';
import { BookingDetail } from './pages/Bookings/BookingDetail';
import { AgentList } from './pages/Agents/AgentList';
import { AgentForm } from './pages/Agents/AgentForm';
import { SalesDashboard } from './pages/Sales/SalesDashboard';
import { InvoiceList } from './pages/Sales/InvoiceList';
import { MessageCenter } from './pages/Communication/MessageCenter';
import { TemplateManager } from './pages/Communication/TemplateManager';
import { AutomationManager } from './pages/Communication/AutomationManager';
import { ReportDashboard } from './pages/Reports/ReportDashboard';
import { SettingsPage } from './pages/Settings/SettingsPage';
import { CheckInScanner } from './pages/Operations/CheckInScanner';
import { PublicTourList } from './pages/Public/PublicTourList';
import { PublicTourDetail } from './pages/Public/PublicTourDetail';
import { BookingPage } from './pages/Public/BookingPage';
import { AgentHome } from './pages/AgentPortal/AgentHome';
import { AgentBookings } from './pages/AgentPortal/AgentBookings';
import { NotFound } from './pages/NotFound';
import { InstallBanner } from './components/pwa/InstallBanner';
import { MOCK_OPERATOR, MOCK_USER, MOCK_AGENTS } from './services/mockData';
import { User, Operator } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);

  const handleLogin = () => {
    // Simulating an API login call
    setTimeout(() => {
      setUser(MOCK_USER);
      setOperator(MOCK_OPERATOR);
    }, 500);
  };

  const handleLogout = () => {
    setUser(null);
    setOperator(null);
  };

  // For public pages demo, we assume the operator is loaded based on URL slug
  // In a real app, this would be fetched from the API based on the :operatorSlug param
  const publicOperator = MOCK_OPERATOR;
  
  // For agent demo, we assume the first agent is logged in
  const currentAgent = MOCK_AGENTS[0];

  return (
    <HashRouter>
      <InstallBanner />
      <Routes>
        {/* Public Booking Engine Routes */}
        <Route path="/p/:operatorSlug" element={<PublicLayout operator={publicOperator} />}>
          <Route index element={<PublicTourList />} />
          <Route path=":tourSlug" element={<PublicTourDetail />} />
          <Route path=":tourSlug/book" element={<BookingPage />} />
        </Route>

        {/* Agent Portal Routes */}
        <Route path="/agent" element={<AgentLayout operator={MOCK_OPERATOR} agent={currentAgent} onLogout={() => window.location.href = '#/login'} />}>
          <Route index element={<AgentHome />} />
          <Route path="bookings" element={<AgentBookings />} />
        </Route>

        {/* Auth Routes */}
        <Route 
          path="/login" 
          element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />} 
        />
        
        {/* Dashboard Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            user && operator ? (
              <Layout operator={operator} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<DashboardHome />} />
          
          {/* Operations Mobile */}
          <Route path="operations/checkin" element={<CheckInScanner />} />

          {/* Tours Routes */}
          <Route path="tours" element={<TourList />} />
          <Route path="tours/new" element={<TourForm />} />
          <Route path="tours/:id" element={<TourForm />} />

          {/* Departures Routes */}
          <Route path="departures" element={<DeparturesPage />} />

          {/* Coaches Routes */}
          <Route path="coaches" element={<CoachList />} />
          <Route path="coaches/new" element={<CoachForm />} />
          <Route path="coaches/:id" element={<CoachForm />} />

          {/* Routes Management */}
          <Route path="routes" element={<div className="p-0"><RouteList /></div>} />
          <Route path="routes/new" element={<RouteForm />} />
          <Route path="routes/:id" element={<RouteForm />} />
          
          {/* Customers (CRM) */}
          <Route path="customers" element={<CustomerList />} />
          <Route path="customers/:id" element={<CustomerDetail />} />

          {/* Bookings */}
          <Route path="bookings" element={<BookingList />} />
          <Route path="bookings/:id" element={<BookingDetail />} />
          
          {/* Agents */}
          <Route path="agents" element={<AgentList />} />
          <Route path="agents/new" element={<AgentForm />} />
          <Route path="agents/:id" element={<AgentForm />} />
          
          {/* Sales & Invoicing */}
          <Route path="sales" element={<SalesDashboard />} />
          <Route path="sales/invoices" element={<InvoiceList />} />

          {/* Communication */}
          <Route path="communication" element={<MessageCenter />} />
          <Route path="communication/templates" element={<TemplateManager />} />
          <Route path="communication/automations" element={<AutomationManager />} />

          {/* Analytics & Settings */}
          <Route path="reports" element={<ReportDashboard />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Root Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
