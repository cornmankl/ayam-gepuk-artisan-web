import { Link, useRouteError } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangleIcon, HomeIcon, RefreshCwIcon } from 'lucide-react';

export default function RouterErrorBoundary() {
  const error = useRouteError() as Error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <AlertTriangleIcon className="mx-auto h-32 w-32 text-red-500 opacity-20" />
          </div>

          <motion.h1
            className="text-6xl font-heading font-bold text-red-600 mb-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Oops!
          </motion.h1>

          <motion.h2
            className="text-3xl font-heading font-bold text-brand-black mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Something went wrong
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            We're sorry for the inconvenience. Our team has been notified about
            this issue.
          </motion.p>

          {process.env.NODE_ENV === 'development' && (
            <motion.div
              className="bg-red-100 border border-red-300 rounded-lg p-4 mb-8 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="font-semibold text-red-800 mb-2">
                Error Details (Development):
              </h3>
              <pre className="text-sm text-red-700 whitespace-pre-wrap overflow-auto">
                {error?.stack || error?.message || 'Unknown error'}
              </pre>
            </motion.div>
          )}

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-red text-white font-heading font-semibold rounded-2xl hover:bg-brand-red/90 transition-all duration-300 hover:scale-105 shadow-brand"
            >
              <RefreshCwIcon className="w-5 h-5 mr-2" />
              Try Again
            </button>

            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-red font-heading font-semibold rounded-2xl border-2 border-brand-red hover:bg-brand-red hover:text-white transition-all duration-300 hover:scale-105 shadow-brand"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
