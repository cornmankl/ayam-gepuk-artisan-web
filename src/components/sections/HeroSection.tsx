import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBagIcon,
  PhoneIcon,
  StarIcon,
  TruckIcon,
  UtensilsIcon,
  AwardIcon,
} from 'lucide-react';
import LogoIcon from '../logo/LogoIcon';
import { BUSINESS_INFO } from '../../constants';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-yellow-gold via-yellow-400 to-yellow-500 py-12 md:py-24 px-4 overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-[url('https://uploadthingy.s3.us-west-1.amazonaws.com/p5irPgQNgTn2ETzne3anjp/ayamgepukartisanseremban2_%281%29.jpg')] opacity-10 bg-center bg-cover"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 1, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Content */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 0 0 rgba(220, 38, 38, 0.4)',
                  '0 0 0 10px rgba(220, 38, 38, 0)',
                  '0 0 0 0 rgba(220, 38, 38, 0)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Premium Indonesian Cuisine
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-brand-black mb-4 lg:mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              Authentic{' '}
              <motion.span
                className="text-brand-red underline decoration-yellow-gold decoration-4 underline-offset-4"
                animate={{
                  textShadow: [
                    '0 0 0px rgba(255, 215, 0, 0.5)',
                    '0 0 20px rgba(255, 215, 0, 0.8)',
                    '0 0 0px rgba(255, 215, 0, 0.5)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Indonesian
              </motion.span>{' '}
              Smashed Fried Chicken
            </motion.h1>

            <motion.p
              className="text-base md:text-lg lg:text-xl mb-6 lg:mb-8 text-brand-black/80 leading-relaxed font-body max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              Experience the perfect blend of crispy texture and spicy flavor
              with our signature Ayam Gepuk dishes, crafted with traditional
              recipes and premium ingredients.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/menu"
                  className="bg-brand-red hover:bg-red-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-heading font-semibold text-base md:text-lg shadow-brand-lg hover:shadow-brand-xl transition-all duration-300 flex items-center justify-center group"
                >
                  <ShoppingBagIcon
                    size={20}
                    className="mr-2 md:mr-3 group-hover:scale-110 transition-transform duration-300"
                  />
                  Order Now
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={`tel:${BUSINESS_INFO.PHONE}`}
                  className="bg-white hover:bg-gray-50 text-brand-black px-6 md:px-8 py-3 md:py-4 rounded-2xl font-heading font-semibold text-base md:text-lg shadow-brand-lg hover:shadow-brand-xl transition-all duration-300 flex items-center justify-center group border-2 border-brand-black"
                >
                  <PhoneIcon
                    size={20}
                    className="mr-2 md:mr-3 group-hover:scale-110 transition-transform duration-300"
                  />
                  Call Us
                </a>
              </motion.div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8 lg:mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            >
              {[
                {
                  icon: StarIcon,
                  text: '4.9 Rating',
                  color: 'text-yellow-gold',
                  bgColor: 'bg-yellow-gold/20',
                },
                {
                  icon: TruckIcon,
                  text: 'Fast Delivery',
                  color: 'text-brand-red',
                  bgColor: 'bg-brand-red/20',
                },
                {
                  icon: UtensilsIcon,
                  text: 'Authentic Taste',
                  color: 'text-brand-red',
                  bgColor: 'bg-brand-red/20',
                },
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  className="flex items-center bg-white/90 backdrop-blur-sm px-3 md:px-4 py-2 md:py-3 rounded-2xl shadow-brand"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1 + index * 0.1,
                    ease: 'easeOut',
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <motion.div
                    className={`${badge.bgColor} p-2 md:p-3 rounded-xl mr-2 md:mr-3`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <badge.icon size={16} className={badge.color} />
                  </motion.div>
                  <span className="text-brand-black font-heading font-semibold text-sm md:text-base">
                    {badge.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Logo Section */}
          <motion.div
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-4 md:-inset-8 bg-gradient-to-r from-yellow-400/30 to-red-600/30 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Logo Container */}
              <motion.div
                className="relative bg-gradient-to-br from-yellow-gold to-yellow-400 rounded-3xl p-6 md:p-10 shadow-brand-xl"
                style={{ maxWidth: '350px' }}
                initial={{ rotate: 5, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                whileHover={{
                  rotate: 0,
                  scale: 1.05,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}
              >
                {/* Logo */}
                <motion.div
                  className="flex flex-col items-center mb-4 md:mb-6"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <LogoIcon
                    size={80}
                    variant="full"
                    className="drop-shadow-2xl"
                  />
                </motion.div>
              </motion.div>

              {/* Halal Certification Badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white rounded-2xl p-3 md:p-5 shadow-brand-lg border-2 border-yellow-gold"
                initial={{ rotate: 6, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
                whileHover={{
                  rotate: 0,
                  scale: 1.05,
                  y: -5,
                }}
              >
                <div className="flex items-center gap-2 md:gap-4">
                  <motion.div
                    className="bg-yellow-gold/20 p-2 md:p-3 rounded-xl"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <AwardIcon size={24} className="text-brand-red" />
                  </motion.div>
                  <div>
                    <p className="text-xs text-gray-500 font-body">Certified</p>
                    <p className="text-xs md:text-sm font-heading font-bold text-brand-red">
                      Halal Cuisine
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Admin Access Button - Only visible in development */}
              {import.meta.env.DEV && (
                <motion.div
                  className="absolute -top-4 -left-4 md:-top-6 md:-left-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 2 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Link
                    to="/admin"
                    className="bg-gray-800 text-white px-3 py-1 rounded-lg text-xs font-medium shadow-lg hover:bg-gray-700 transition-colors"
                  >
                    Admin
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
