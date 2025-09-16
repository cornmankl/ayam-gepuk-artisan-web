import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClockIcon,
  StarIcon,
  MapPinIcon,
  SearchIcon,
  ChevronDownIcon,
  PhoneIcon,
} from 'lucide-react';
import { locations } from '../data/locationData';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import PopularMenuSection from '../components/sections/PopularMenuSection';
const HomePage = () => {
  // State for locations filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [showAllLocations, setShowAllLocations] = useState(false);
  // Filter locations based on search and state filter
  useEffect(() => {
    let filtered = locations;
    if (searchTerm) {
      filtered = filtered.filter(
        location =>
          location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedState !== 'All States') {
      filtered = filtered.filter(location => location.state === selectedState);
    }
    setFilteredLocations(filtered);
  }, [searchTerm, selectedState]);
  // Get unique states for the filter dropdown
  const states = [
    'All States',
    ...new Set(locations.map(location => location.state)),
  ];
  // Animation on scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementPosition < windowHeight - 100) {
          element.classList.add('fade-in');
          element.classList.remove('opacity-0');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="bg-gray-50 font-body">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Popular Menu Items */}
      <PopularMenuSection />

      {/* Our Locations Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-yellow-50/80 to-white">
        <div className="container mx-auto">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium">
              Find Us Nationwide
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-600 mt-4 mb-4">
              Visit Our Locations
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              With 15 branches across Malaysia, you're never too far from
              authentic Indonesian cuisine. Find your nearest Ayam Gepuk Artisan
              restaurant and experience the taste of Indonesia.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            className="bg-white p-4 md:p-6 rounded-xl shadow-lg max-w-4xl mx-auto mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <SearchIcon
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search by location name or address"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm md:text-base"
                />
              </div>
              <div className="relative">
                <select
                  value={selectedState}
                  onChange={e => setSelectedState(e.target.value)}
                  className="appearance-none w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-sm md:text-base"
                >
                  {states.map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon
                  size={18}
                  className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Locations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {(showAllLocations
              ? filteredLocations
              : filteredLocations.slice(0, 6)
            ).map((location, index) => (
              <motion.div
                key={location.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="h-32 md:h-40 bg-yellow-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-3 md:p-4">
                    <div className="bg-yellow-400 text-red-700 font-semibold px-2 md:px-3 py-1 rounded-lg inline-block shadow-md text-xs md:text-sm">
                      {location.state}
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-red-600 mb-2">
                    {location.name}
                  </h3>

                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-start">
                      <MapPinIcon
                        size={16}
                        className="text-red-500 mt-1 mr-2 flex-shrink-0"
                      />
                      <p className="text-gray-600 text-xs md:text-sm">
                        {location.address}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <PhoneIcon
                        size={16}
                        className="text-red-500 mr-2 flex-shrink-0"
                      />
                      <a
                        href={`tel:${location.phone}`}
                        className="text-gray-600 hover:text-red-600 transition-colors text-xs md:text-sm"
                      >
                        {location.phone}
                      </a>
                    </div>

                    <div className="flex items-center">
                      <ClockIcon
                        size={16}
                        className="text-red-500 mr-2 flex-shrink-0"
                      />
                      <p className="text-gray-600 text-xs md:text-sm">
                        {location.hours}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-5 flex justify-between items-center">
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full ${location.isOpen ? 'bg-green-500' : 'bg-red-500'} mr-2`}
                      />
                      <span
                        className={`text-xs md:text-sm font-medium ${location.isOpen ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {location.isOpen ? 'Open Now' : 'Closed'}
                      </span>
                    </div>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs md:text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show more/less button */}
          {filteredLocations.length > 6 && (
            <motion.div
              className="text-center mt-8 md:mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setShowAllLocations(!showAllLocations)}
                className="bg-white border border-red-600 text-red-600 hover:bg-red-50 font-medium px-4 md:px-6 py-2 md:py-3 rounded-lg transition-colors inline-flex items-center text-sm md:text-base"
              >
                {showAllLocations
                  ? 'Show Less Locations'
                  : 'Show All Locations'}
                <ChevronDownIcon
                  size={16}
                  className={`ml-2 transition-transform duration-300 ${showAllLocations ? 'rotate-180' : ''}`}
                />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-12 md:py-20 px-4 bg-yellow-50/80 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://uploadthingy.s3.us-west-1.amazonaws.com/2Ce8pGTUE4TUGhR7iqa7DT/499146215_3923748704543568_4549314373204496991_n.jpg')] opacity-5 bg-center bg-cover" />
        <div className="container mx-auto relative z-10">
          <motion.div
            className="bg-white p-6 md:p-10 rounded-2xl shadow-xl max-w-4xl mx-auto backdrop-blur-sm bg-white/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="lg:w-1/2 w-full">
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="bg-red-100 p-2 md:p-3 rounded-xl mr-3 md:mr-4">
                    <ClockIcon size={24} className="text-red-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-red-600">
                    Business Hours
                  </h2>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 md:pb-4 border-b border-gray-100 gap-2">
                    <div>
                      <h3 className="font-semibold text-base md:text-lg text-gray-800">
                        Weekdays
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        Monday - Friday
                      </p>
                    </div>
                    <div className="bg-yellow-100 px-3 md:px-4 py-2 rounded-lg">
                      <p className="text-red-700 font-medium text-sm md:text-base">
                        10:00 AM - 10:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 md:pb-4 border-b border-gray-100 gap-2">
                    <div>
                      <h3 className="font-semibold text-base md:text-lg text-gray-800">
                        Weekends
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        Saturday - Sunday
                      </p>
                    </div>
                    <div className="bg-yellow-100 px-3 md:px-4 py-2 rounded-lg">
                      <p className="text-red-700 font-medium text-sm md:text-base">
                        11:00 AM - 11:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-base md:text-lg text-gray-800">
                        Public Holidays
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        Special Hours
                      </p>
                    </div>
                    <div className="bg-yellow-100 px-3 md:px-4 py-2 rounded-lg">
                      <p className="text-red-700 font-medium text-sm md:text-base">
                        11:00 AM - 10:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 md:mt-6 text-gray-500 italic text-sm md:text-base">
                  * Hours may vary on special holidays. Please call to confirm.
                </p>
              </div>

              <div className="lg:w-1/2 w-full lg:border-l border-gray-200 lg:pl-6 md:lg:pl-8">
                <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-4 md:mb-6">
                  Visit Us Today
                </h3>
                <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  We're conveniently located in Seremban 2, offering both
                  dine-in and takeaway options. Come experience the authentic
                  taste of Indonesia in a warm and welcoming atmosphere.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <a
                    href="https://maps.app.goo.gl/..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex-1 flex justify-center text-sm md:text-base py-2 md:py-3"
                  >
                    Get Directions
                  </a>
                  <a
                    href="tel:0182442017"
                    className="btn-primary flex-1 flex justify-center text-sm md:text-base py-2 md:py-3"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-white to-yellow-50/80">
        <div className="container mx-auto">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium">
              Testimonials
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-600 mt-4 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Don't just take our word for it. Here's what our satisfied
              customers have to say about their dining experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: 'Ahmad Mazlan',
                role: 'Regular Customer',
                initials: 'AM',
                text: 'The Ayam Krispy is incredibly delicious! The chicken is perfectly crispy on the outside and juicy on the inside. The sambal adds just the right amount of heat. Definitely my favorite place for Indonesian food!',
              },
              {
                name: 'Sarah Rahman',
                role: 'Food Blogger',
                initials: 'SR',
                text: "I love the authentic Indonesian flavors at Ayam Gepuk Artisan. The tempeh and tofu sides are perfectly seasoned, and the service is always friendly and quick. My family's go-to weekend spot!",
              },
              {
                name: 'John Tan',
                role: 'Loyal Customer',
                initials: 'JT',
                text: 'The online ordering system is so convenient, and the food arrives hot and fresh every time. The Ayam Klasik Set C is my absolute favorite - the portion size is generous and the flavor is outstanding!',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: 'easeOut',
                }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} size={16} className="text-yellow-400" />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-500 text-sm md:text-base">
                    5.0
                  </span>
                </div>

                <p className="text-gray-600 mb-4 md:mb-6 italic text-sm md:text-base leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center mr-3 md:mr-4">
                    <span className="text-red-600 font-bold text-sm md:text-base">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm md:text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-xs md:text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
