import '../css/app.css';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { DashboardPage } from '@/pages/dashboard-page';
import { LoginPage } from '@/pages/login-page';

function AppShell() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    async function handleLogin() {
        await new Promise((resolve) => setTimeout(resolve, 900));
        setIsAuthenticated(true);
        navigate('/dashboard');
    }

    function handleLogout() {
        setIsAuthenticated(false);
        navigate('/login');
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={isAuthenticated ? 'auth' : 'guest'}
                initial={{ opacity: 0, scale: 0.99, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.01, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
            >
                <Routes>
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/dashboard/:section?" element={isAuthenticated ? <DashboardPage onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
                    <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
}

function App() {
    return (
        <HashRouter>
            <AppShell />
        </HashRouter>
    );
}

const container = document.getElementById('app');

if (container) {
    createRoot(container).render(<App />);
}
