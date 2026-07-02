import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import RequireAuth from './components/RequireAuth';
import Header from './components/Header';
import HomePage from './components/HomePage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import PostFormPage from './pages/admin/PostFormPage';

function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><BlogListPage /></PublicLayout>} />
          <Route path="/blog/:slug" element={<PublicLayout><BlogPostPage /></PublicLayout>} />

          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/posts" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
          <Route path="/admin/posts/new" element={<RequireAuth><PostFormPage /></RequireAuth>} />
          <Route path="/admin/posts/:id/edit" element={<RequireAuth><PostFormPage /></RequireAuth>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </HelmetProvider>
  );
}
