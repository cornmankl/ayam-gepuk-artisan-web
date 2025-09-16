import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HomeIcon, ChefHatIcon } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <ChefHatIcon className="mx-auto h-32 w-32 text-brand-red opacity-20" />
          </div>

          <motion.h1
            className="text-9xl font-bold text-brand-red mb-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            404
          </motion.h1>

          <motion.h2
            className="text-4xl font-heading font-bold text-brand-black mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Oops! Page Not Found
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Looks like this page wandered off the menu!
            <br />
            Don't worry, our delicious Ayam Gepuk is still waiting for you.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-red text-white font-heading font-semibold rounded-2xl hover:bg-brand-red/90 transition-all duration-300 hover:scale-105 shadow-brand"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Back to Home
            </Link>

            <Link
              to="/menu"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-red font-heading font-semibold rounded-2xl border-2 border-brand-red hover:bg-brand-red hover:text-white transition-all duration-300 hover:scale-105 shadow-brand"
            >
              <ChefHatIcon className="w-5 h-5 mr-2" />
              View Menu
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
