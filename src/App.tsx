import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { TixaeProvider } from './contexts/TixaeContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// English pages
import HomeEN from './pages/en/Home';
import ContactEN from './pages/en/Contact';
import AboutEN from './pages/en/About';
import PrivacyEN from './pages/en/Privacy';
import TermsEN from './pages/en/Terms';
import ImpressumEN from './pages/en/Impressum';
import WaitlistEN from './pages/en/Waitlist';
import FAQEN from './pages/en/FAQ';
import ZKAgentEN from './pages/en/ZKAgent';

// German pages
import HomeDE from './pages/de/Home';
import ContactDE from './pages/de/Contact';
import AboutDE from './pages/de/About';
import PrivacyDE from './pages/de/Privacy';
import TermsDE from './pages/de/Terms';
import ImpressumDE from './pages/de/Impressum';
import WaitlistDE from './pages/de/Waitlist';
import FAQDE from './pages/de/FAQ';
import ZKAgentDE from './pages/de/ZKAgent';

// Admin pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Demo1 from './pages/admin/Demo1';
import Demo2 from './pages/admin/Demo2';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle root path redirects
    if (location.pathname === '/') {
      const storedLanguage = localStorage.getItem('preferredLanguage');
      const browserLanguage = navigator.language.toLowerCase();
      const isGermanSpeaking = ['de', 'de-de', 'de-at', 'de-ch'].includes(browserLanguage);
      
      if (storedLanguage === 'de' || isGermanSpeaking) {
        navigate('/de', { replace: true });
      } else {
        navigate('/en', { replace: true });
      }
    }

    // Handle 404 errors
    if (document.title.includes('404')) {
      const language = localStorage.getItem('preferredLanguage') || 'en';
      navigate(`/${language}`, { replace: true });
    }
  }, [location, navigate]);

  return (
    <AuthProvider>
      <LanguageProvider>
        <TixaeProvider>
          <Routes>
            {/* English routes */}
            <Route path="/en" element={<HomeEN />} />
            <Route path="/en/contact" element={<ContactEN />} />
            <Route path="/en/about" element={<AboutEN />} />
            <Route path="/en/privacy" element={<PrivacyEN />} />
            <Route path="/en/terms" element={<TermsEN />} />
            <Route path="/en/impressum" element={<ImpressumEN />} />
            <Route path="/en/waitlist" element={<WaitlistEN />} />
            <Route path="/en/faq" element={<FAQEN />} />
            <Route path="/en/zkagent" element={<ZKAgentEN />} />
            <Route path="/en/admin" element={<Login />} />
            <Route
              path="/en/admin/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="demo/1" element={<Demo1 />} />
                    <Route path="demo/2" element={<Demo2 />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* German routes */}
            <Route path="/de" element={<HomeDE />} />
            <Route path="/de/contact" element={<ContactDE />} />
            <Route path="/de/about" element={<AboutDE />} />
            <Route path="/de/privacy" element={<PrivacyDE />} />
            <Route path="/de/terms" element={<TermsDE />} />
            <Route path="/de/impressum" element={<ImpressumDE />} />
            <Route path="/de/waitlist" element={<WaitlistDE />} />
            <Route path="/de/faq" element={<FAQDE />} />
            <Route path="/de/zkagent" element={<ZKAgentDE />} />
            <Route path="/de/admin" element={<Login />} />
            <Route
              path="/de/admin/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="demo/1" element={<Demo1 />} />
                    <Route path="demo/2" element={<Demo2 />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Legacy admin routes for backward compatibility */}
            <Route path="/admin" element={<Login />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="demo/1" element={<Demo1 />} />
                    <Route path="demo/2" element={<Demo2 />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<HomeEN />} />
          </Routes>
        </TixaeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;