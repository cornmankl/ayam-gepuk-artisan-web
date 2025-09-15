import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FacebookIcon, InstagramIcon, MapPinIcon, PhoneIcon, MailIcon, Clock3Icon, ChevronRightIcon, HeartIcon } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-gradient-to-b from-brand-red to-red-700 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <motion.div 
          className="bg-gradient-to-r from-yellow-gold to-yellow-400 rounded-2xl p-8 md:p-10 mb-12 shadow-brand-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="md:w-2/3">
              <motion.h3 
                className="text-2xl md:text-3xl font-heading font-bold text-brand-black mb-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Get Exclusive Offers & Updates
              </motion.h3>
              <motion.p 
                className="text-brand-black/80 text-lg font-body"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Subscribe to our newsletter and receive special promotions and menu updates.
              </motion.p>
            </div>
            <div className="md:w-1/3">
              <motion.form 
                className="flex gap-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-brand-black focus:outline-none font-body" 
                  aria-label="Email for newsletter" 
                />
                <motion.button 
                  type="submit" 
                  className="bg-brand-black hover:bg-brand-red text-white px-6 py-3 rounded-xl font-heading font-semibold transition-colors shadow-brand"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Subscribe"
                >
                  Subscribe
                </motion.button>
              </motion.form>
            </div>
          </div>
        </motion.div>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <motion.div 
              className="flex items-center mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Logo Container */}
              <motion.div 
                className="h-16 w-16 mr-4 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                {/* Chicken Character */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Chicken Head */}
                  <div className="w-8 h-8 bg-black rounded-full relative mb-1">
                    {/* Sunglasses */}
                    <div className="absolute top-1 left-1 w-6 h-3 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full ml-1"></div>
                    </div>
                    {/* Beak */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-yellow-500 rounded-full"></div>
                    {/* Comb */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full"></div>
                  </div>
                  {/* Chicken Body */}
                  <div className="w-6 h-4 bg-white rounded-full relative">
                    {/* Wings */}
                    <div className="absolute -left-1 top-1 w-2 h-3 bg-black rounded-full"></div>
                    <div className="absolute -right-1 top-1 w-2 h-3 bg-black rounded-full"></div>
                  </div>
                </div>
              </motion.div>
              <div className="flex flex-col">
                <motion.h3 
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  AYAM GEPUK
                </motion.h3>
                <motion.h4 
                  className="text-lg font-semibold text-yellow-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  ARTISAN
                </motion.h4>
              </div>
            </motion.div>
            <motion.p 
              className="mb-6 text-white/90 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Authentic Indonesian smashed fried chicken with traditional spices
              and sambal. A taste of Indonesia in every bite.
            </motion.p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/AyamGepukArtisan" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110" aria-label="Facebook">
                <FacebookIcon size={20} />
              </a>
              <a href="https://www.instagram.com/ayamgepukartisan" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110" aria-label="Instagram">
                <InstagramIcon size={20} />
              </a>
              <a href="https://www.tiktok.com/@ayamgepukartisan" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                  <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                  <path d="M15 8v8a4 4 0 0 1-4 4" />
                  <line x1="15" y1="4" x2="15" y2="12" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center">
              <Clock3Icon size={20} className="mr-2" />
              Opening Hours
            </h4>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="text-white/80">Monday - Friday</span>
                <span className="font-medium">10:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/80">Saturday - Sunday</span>
                <span className="font-medium">11:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/80">Public Holidays</span>
                <span className="font-medium">11:00 AM - 10:00 PM</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="flex items-center hover:translate-x-2 transition-transform duration-300 group">
                  <ChevronRightIcon size={16} className="mr-2 text-yellow-300 group-hover:text-yellow-200" />
                  <span className="hover:text-yellow-300 transition-colors">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/menu" className="flex items-center hover:translate-x-2 transition-transform duration-300 group">
                  <ChevronRightIcon size={16} className="mr-2 text-yellow-300 group-hover:text-yellow-200" />
                  <span className="hover:text-yellow-300 transition-colors">
                    Menu
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/cart" className="flex items-center hover:translate-x-2 transition-transform duration-300 group">
                  <ChevronRightIcon size={16} className="mr-2 text-yellow-300 group-hover:text-yellow-200" />
                  <span className="hover:text-yellow-300 transition-colors">
                    Cart
                  </span>
                </Link>
              </li>
              <li>
                <a href="https://www.facebook.com/AyamGepukArtisan" target="_blank" rel="noopener noreferrer" className="flex items-center hover:translate-x-2 transition-transform duration-300 group">
                  <ChevronRightIcon size={16} className="mr-2 text-yellow-300 group-hover:text-yellow-200" />
                  <span className="hover:text-yellow-300 transition-colors">
                    About Us
                  </span>
                </a>
              </li>
              <li>
                <a href="mailto:info@ayamgepukartisan.com" className="flex items-center hover:translate-x-2 transition-transform duration-300 group">
                  <ChevronRightIcon size={16} className="mr-2 text-yellow-300 group-hover:text-yellow-200" />
                  <span className="hover:text-yellow-300 transition-colors">
                    Contact
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="bg-white/10 p-2 rounded-lg mr-3 flex-shrink-0">
                  <MapPinIcon size={18} />
                </div>
                <span>Seremban 2, Negeri Sembilan, Malaysia</span>
              </li>
              <li className="flex items-center">
                <div className="bg-white/10 p-2 rounded-lg mr-3 flex-shrink-0">
                  <PhoneIcon size={18} />
                </div>
                <a href="tel:0182442017" className="hover:text-yellow-300 transition-colors">
                  0182442017
                </a>
              </li>
              <li className="flex items-center">
                <div className="bg-white/10 p-2 rounded-lg mr-3 flex-shrink-0">
                  <MailIcon size={18} />
                </div>
                <a href="mailto:info@ayamgepukartisan.com" className="hover:text-yellow-300 transition-colors">
                  info@ayamgepukartisan.com
                </a>
              </li>
              <li className="flex items-center mt-6">
                <div className="flex space-x-3">
                  <span className="text-white/80">Follow us:</span>
                  <div className="flex space-x-3">
                    <a href="https://www.facebook.com/AyamGepukArtisan" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors" aria-label="Facebook">
                      <FacebookIcon size={18} />
                    </a>
                    <a href="https://www.instagram.com/ayamgepukartisan" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors" aria-label="Instagram">
                      <InstagramIcon size={18} />
                    </a>
                    <a href="https://www.tiktok.com/@ayamgepukartisan" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors" aria-label="TikTok">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                        <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                        <path d="M15 8v8a4 4 0 0 1-4 4" />
                        <line x1="15" y1="4" x2="15" y2="12" />
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="flex items-center justify-center text-white/80">
            &copy; {new Date().getFullYear()} Ayam Gepuk Artisan. All rights
            reserved.
            <span className="inline-flex items-center ml-2">
              Made with <HeartIcon size={16} className="mx-1 text-yellow-300" />{' '}
              in Malaysia
            </span>
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;