import React from 'react';
import { motion } from 'framer-motion';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
      title: 'Authentic Recipe',
      description:
        'Our recipes are crafted with traditional Indonesian spices and cooking techniques, passed down through generations for an authentic taste experience.',
    },
    {
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Quick Service',
      description:
        'Fast preparation and delivery ensuring your food arrives hot and fresh, just as it should be. We value your time as much as we value quality.',
    },
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'Premium Ingredients',
      description:
        'We source only the highest quality ingredients, ensuring every dish meets our strict standards and delivers exceptional flavor in every bite.',
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-600 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Why Choose Ayam Gepuk Artisan?
          </motion.h2>
          <motion.p
            className="text-gray-600 text-base md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            We bring the authentic taste of Indonesia to your table with our
            premium quality ingredients and traditional cooking methods.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="premium-card p-6 md:p-8 text-center"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: 'easeOut',
              }}
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
              }}
            >
              <motion.div
                className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg"
                whileHover={{
                  rotate: 360,
                  scale: 1.1,
                }}
                transition={{ duration: 0.6 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 md:h-10 md:w-10 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={feature.icon}
                  />
                </motion.svg>
              </motion.div>

              <motion.h3
                className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-red-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                {feature.title}
              </motion.h3>

              <motion.p
                className="text-gray-600 leading-relaxed text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
