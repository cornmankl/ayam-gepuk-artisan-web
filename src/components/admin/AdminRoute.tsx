import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ShieldIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';

interface AdminRouteProps {
  children: ReactNode;
}

interface AuthAttempt {
  timestamp: number;
  ip: string;
  success: boolean;
}

// Simple admin authentication component
const AdminLogin = ({ onAuthenticate }: { onAuthenticate: () => void }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState<AuthAttempt[]>([]);

  // Simple password check (in production, this should be handled by a proper auth service)
  const ADMIN_PASSWORD = 'ayam-gepuk-admin-2024';
  const MAX_ATTEMPTS = 3;
  const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

  const getClientIP = () => {
    // In a real app, you'd get this from the server
    return '127.0.0.1';
  };

  const isLockedOut = () => {
    const recentFailedAttempts = attempts.filter(
      attempt =>
        !attempt.success && Date.now() - attempt.timestamp < LOCKOUT_TIME
    );
    return recentFailedAttempts.length >= MAX_ATTEMPTS;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLockedOut()) {
      setError(
        'Too many failed attempts. Please wait 15 minutes before trying again.'
      );
      return;
    }

    const clientIP = getClientIP();
    const attempt: AuthAttempt = {
      timestamp: Date.now(),
      ip: clientIP,
      success: false,
    };

    if (password === ADMIN_PASSWORD) {
      attempt.success = true;
      setAttempts(prev => [...prev, attempt]);

      // Log successful authentication (in production, send to audit log)
      console.log('Admin authentication successful:', {
        timestamp: new Date().toISOString(),
        ip: clientIP,
        userAgent: navigator.userAgent,
      });

      localStorage.setItem('admin-auth', 'true');
      localStorage.setItem('admin-auth-time', Date.now().toString());
      onAuthenticate();
    } else {
      attempt.success = false;
      setAttempts(prev => [...prev, attempt]);

      // Log failed authentication (in production, send to audit log)
      console.warn('Admin authentication failed:', {
        timestamp: new Date().toISOString(),
        ip: clientIP,
        userAgent: navigator.userAgent,
      });

      setError('Invalid password. Please try again.');
      setPassword('');
    }
  };

  const remainingAttempts = Math.max(
    0,
    MAX_ATTEMPTS -
      attempts.filter(
        a => !a.success && Date.now() - a.timestamp < LOCKOUT_TIME
      ).length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <ShieldIcon className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
          <p className="text-gray-600 mt-2">Enter admin password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Admin Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter admin password"
                disabled={isLockedOut()}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          <div className="text-sm text-gray-500">
            Remaining attempts: {remainingAttempts}
            {isLockedOut() && (
              <span className="text-red-600 block">
                Account temporarily locked
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLockedOut() || !password}
            className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <LockIcon className="w-5 h-5 mr-2" />
            Authenticate
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => window.history.back()}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('admin-auth');
    const authTime = localStorage.getItem('admin-auth-time');

    if (authStatus === 'true' && authTime) {
      const authTimestamp = parseInt(authTime);
      const currentTime = Date.now();
      const sessionDuration = 2 * 60 * 60 * 1000; // 2 hours

      if (currentTime - authTimestamp < sessionDuration) {
        setIsAuthenticated(true);
      } else {
        // Session expired
        localStorage.removeItem('admin-auth');
        localStorage.removeItem('admin-auth-time');
      }
    }

    setIsLoading(false);
  }, []);

  const handleAuthenticate = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Redirect non-authenticated users in production
  if (process.env.NODE_ENV === 'production' && !isAuthenticated) {
    return <AdminLogin onAuthenticate={handleAuthenticate} />;
  }

  // In development, show a warning but allow access
  if (process.env.NODE_ENV === 'development' && !isAuthenticated) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ShieldIcon className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Development Mode:</strong> Admin route is unprotected. In
              production, authentication would be required.
              <button
                onClick={handleAuthenticate}
                className="ml-4 text-yellow-800 underline hover:text-yellow-900"
              >
                Simulate Login
              </button>
            </p>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return <>{children}</>;
};
