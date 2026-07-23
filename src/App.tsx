/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SiteContentProvider } from './contexts/SiteContentContext';
import Home from './pages/Home';

// 첫 화면(Home)은 즉시 로드, 나머지 라우트/무거운 위젯은 코드 스플리팅으로 지연 로드
const CmsEditOverlay = lazy(() => import('./components/CmsEditOverlay'));
const ChatBot = lazy(() => import('./components/ChatBot'));
const Greeting = lazy(() => import('./pages/Greeting'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const Facility = lazy(() => import('./pages/Facility'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Organization = lazy(() => import('./pages/Organization'));
const Directions = lazy(() => import('./pages/Directions'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const MainController = lazy(() => import('./pages/MainController'));
const Display = lazy(() => import('./pages/Display'));
const Others = lazy(() => import('./pages/Others'));
const Process = lazy(() => import('./pages/Process'));
const Downloads = lazy(() => import('./pages/Downloads'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BusinessPage = lazy(() => import('./pages/BusinessPage'));
const BusinessHomeAppliance = lazy(() => import('./pages/BusinessHomeAppliance'));
const BusinessIndustrial = lazy(() => import('./pages/BusinessIndustrial'));
const BusinessMedical = lazy(() => import('./pages/BusinessMedical'));
const BusinessRenewable = lazy(() => import('./pages/BusinessRenewable'));
const BusinessSmartIoT = lazy(() => import('./pages/BusinessSmartIoT'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

export default function App() {
  return (
    <SiteContentProvider>
      <Router>
        <Suspense fallback={null}>
          <CmsEditOverlay />
          <ChatBot />
        </Suspense>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/greeting" element={<Greeting />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/facility" element={<Facility />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/directions" element={<Directions />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/business/home-appliance" element={<BusinessHomeAppliance />} />
            <Route path="/business/industrial" element={<BusinessIndustrial />} />
            <Route path="/business/medical" element={<BusinessMedical />} />
            <Route path="/business/renewable" element={<BusinessRenewable />} />
            <Route path="/business/smart-iot" element={<BusinessSmartIoT />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/main-controller" element={<MainController />} />
            <Route path="/display" element={<Display />} />
            <Route path="/others" element={<Others />} />
            <Route path="/process" element={<Process />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
      </Router>
    </SiteContentProvider>
  );
}
