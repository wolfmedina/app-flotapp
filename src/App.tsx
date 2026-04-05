import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import RouteInProgress from './RouteInProgress';
import Login from './Login';
import POD from './POD';
import Inspection from './Inspection';
import ReportIncident from './ReportIncident';
import RoutesScreen from './Routes';
import MyStats from './MyStats';
import Ranking from './Ranking';
import Expenses from './Expenses';
import Documents from './Documents';
import UnitHealth from './UnitHealth';
import SupportChat from './SupportChat';
import Trips from './Trips';
import Profile from './Profile';
import TripDetails from './TripDetails';
import ColdChain from './ColdChain';
import RouteAlerts from './RouteAlerts';
import Forms from './Forms';
import FormDetail from './FormDetail';
import Settings from './Settings';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/route-in-progress" element={<RouteInProgress />} />
          <Route path="/pod" element={<POD />} />
          <Route path="/inspection" element={<Inspection />} />
          <Route path="/report-incident" element={<ReportIncident />} />
          <Route path="/offline" element={<RoutesScreen />} />
          <Route path="/routes" element={<RoutesScreen />} />
          <Route path="/route-alerts" element={<RouteAlerts />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/form-detail/:formId" element={<FormDetail />} />
          
          {/* New Routes */}
          <Route path="/stats" element={<MyStats />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/unit-health" element={<UnitHealth />} />
          <Route path="/support-chat" element={<SupportChat />} />
          <Route path="/cold-chain" element={<ColdChain />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/trip-details/:id" element={<TripDetails />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Fallback routes for other nav items */}
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}
