import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StarIcon } from 'lucide-react';
import { menuItems } from '../../data/menuData';
import OptimizedImage from '../common/OptimizedImage';

const PopularMenuSection: React.FC = () => {
  // Filter for popular items
  const popularItems = menuItems.filter(item => item.popular);

  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium">
              Customer Favorites
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-600 mt-4 mb-4">
              Our Most Popular Dishes
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Try our customer favorites, prepared with authentic Indonesian
              flavors and premium ingredients for a truly exceptional dining
              experience.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {(popularItems.length > 0 ? popularItems : menuItems.slice(0, 3)).map(
            (item, index) => (
              <motion.div
                key={item.id}
                className="premium-card overflow-hidden group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: 'easeOut',
                }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 md:h-60 overflow-hidden">
                  <div className="absolute top-4 right-4 bg-yellow-400 text-red-700 font-bold px-3 py-1 rounded-lg shadow-md z-10">
                    RM {item.price.toFixed(2)}
                  </div>

                  <OptimizedImage
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-red-600 mb-2 group-hover:text-red-700 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-4 md:mb-6 line-clamp-2 text-sm md:text-base">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          size={14}
                          className="text-yellow-500"
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">5.0</span>
                    </div>

                    <Link
                      to="/menu"
                      className="bg-red-600 hover:bg-red-700 text-white px-3 md:px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center text-sm md:text-base"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>

        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            to="/menu"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-red-700 font-bold px-8 md:px-10 py-3 md:py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
          >
            Explore Full Menu
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularMenuSection;
