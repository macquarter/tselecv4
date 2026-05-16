/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SiteContentProvider } from './contexts/SiteContentContext';
import Home from './pages/Home';
import Greeting from './pages/Greeting';
import HistoryPage from './pages/HistoryPage';
import Facility from './pages/Facility';
import Certifications from './pages/Certifications';
import Organization from './pages/Organization';
import Directions from './pages/Directions';
import ProductsPage from './pages/ProductsPage';
import MainController from './pages/MainController';
import Display from './pages/Display';
import Others from './pages/Others';
import Process from './pages/Process';
import Downloads from './pages/Downloads';
import NewsPage from './pages/NewsPage';
import BusinessHomeAppliance from './pages/BusinessHomeAppliance';
import BusinessIndustrial from './pages/BusinessIndustrial';
import BusinessMedical from './pages/BusinessMedical';
import BusinessRenewable from './pages/BusinessRenewable';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ChatBot from './components/ChatBot';

export default function App() {
  return (
    <SiteContentProvider>
      <Router>
        <ChatBot />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/greeting" element={<Greeting />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/facility" element={<Facility />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/directions" element={<Directions />} />
          <Route path="/business/home-appliance" element={<BusinessHomeAppliance />} />
          <Route path="/business/industrial" element={<BusinessIndustrial />} />
          <Route path="/business/medical" element={<BusinessMedical />} />
          <Route path="/business/renewable" element={<BusinessRenewable />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/main-controller" element={<MainController />} />
          <Route path="/display" element={<Display />} />
          <Route path="/others" element={<Others />} />
          <Route path="/process" element={<Process />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </SiteContentProvider>
  );
}
