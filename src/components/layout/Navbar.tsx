import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCartIcon, MenuIcon, XIcon, PhoneIcon } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import LogoIcon from '../logo/LogoIcon';
const Navbar = () => {
  const {
    totalItems
  } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Check if link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return <motion.header
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-brand-lg py-3' : 'bg-gradient-to-r from-yellow-gold to-yellow-400 py-4'}`}
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              className="relative transition-all duration-300 group-hover:shadow-brand-lg"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
            >
              <LogoIcon
                size={64}
                variant="full"
                className="drop-shadow-lg"
              />
            </motion.div>
          </Link>
        </motion.div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {[
            { path: '/', label: 'Home' },
            { path: '/menu', label: 'Menu' },
            { path: '/promotions', label: 'Promotions' },
            { path: '/about', label: 'About' },
            { path: '/contact', label: 'Contact' }
          ].map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Link
                to={link.path}
                className={`text-brand-black font-heading font-medium hover:text-brand-red transition-colors relative ${isActive(link.path) ? 'after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[3px] after:bg-brand-red after:rounded-full' : ''}`}
              >
                <motion.span
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.span>
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a
              href="tel:0182442017"
              className="text-brand-black hover:text-brand-red flex items-center gap-2 font-heading font-medium bg-white/20 px-4 py-2 rounded-xl hover:bg-white/30 transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2"
              >
                <PhoneIcon size={18} />
                <span>0182442017</span>
              </motion.div>
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/cart" className="relative text-brand-black hover:text-brand-red bg-white/20 p-3 rounded-xl hover:bg-white/30 transition-all duration-300" aria-label="Cart">
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCartIcon size={26} />
              </motion.div>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-brand-red to-red-700 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center shadow-brand font-heading font-bold"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
        </nav>
        {/* Mobile Navigation Button */}
        <div className="md:hidden flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link to="/cart" className="relative mr-6 text-brand-black bg-white/20 p-3 rounded-xl">
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCartIcon size={26} />
              </motion.div>
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-brand-red to-red-700 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center shadow-brand font-heading font-bold"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
          <motion.button
            className="text-brand-black bg-white/20 p-3 rounded-xl focus:outline-none hover:bg-white/30 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
            </motion.div>
          </motion.button>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden mt-4 pb-4 flex flex-col space-y-4 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-brand-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {[
              { path: '/', label: 'Home' },
              { path: '/menu', label: 'Menu' },
              { path: '/promotions', label: 'Promotions' },
              { path: '/about', label: 'About' },
              { path: '/contact', label: 'Contact' }
            ].map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`text-brand-black font-heading font-medium hover:text-brand-red transition-colors py-3 px-4 rounded-xl ${isActive(link.path) ? 'bg-yellow-gold/20 text-brand-red' : 'hover:bg-yellow-gold/10'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <motion.span
                    whileHover={{ scale: 1.05, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <a
                href="tel:0182442017"
                className="text-brand-black hover:text-brand-red flex items-center gap-3 font-heading font-medium py-3 px-4 rounded-xl bg-yellow-gold/20 hover:bg-yellow-gold/30 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <motion.div
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <PhoneIcon size={20} />
                  <span>Call Us: 0182442017</span>
                </motion.div>
              </a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  </motion.header>
};
export default Navbar;