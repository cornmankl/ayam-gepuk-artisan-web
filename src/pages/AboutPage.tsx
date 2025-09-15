import { motion } from 'framer-motion';
import { HeartIcon, AwardIcon, UsersIcon, ClockIcon, StarIcon } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: HeartIcon,
      title: "Authentic Taste",
      description: "We use traditional Indonesian recipes passed down through generations to ensure every bite is authentic and delicious."
    },
    {
      icon: AwardIcon,
      title: "Quality Ingredients",
      description: "Only the freshest, highest quality ingredients are used in our preparation, sourced from trusted local suppliers."
    },
    {
      icon: UsersIcon,
      title: "Community Focus",
      description: "We believe in supporting our local community and creating a welcoming space for everyone to enjoy great food."
    },
    {
      icon: ClockIcon,
      title: "Consistency",
      description: "Every order is prepared with the same attention to detail and commitment to excellence that our customers expect."
    }
  ];

  const team = [
    {
      name: "Ahmad Rahman",
      role: "Head Chef & Founder",
      image: "/team/ahmad.jpg",
      description: "With 15 years of experience in Indonesian cuisine, Ahmad brings authentic flavors and traditional cooking techniques to every dish."
    },
    {
      name: "Siti Nurhaliza",
      role: "Operations Manager",
      image: "/team/siti.jpg",
      description: "Siti ensures smooth operations and maintains the highest standards of service that our customers have come to expect."
    },
    {
      name: "Muhammad Ali",
      role: "Quality Control",
      image: "/team/ali.jpg",
      description: "Muhammad oversees ingredient quality and food safety standards to ensure every meal meets our strict quality requirements."
    }
  ];

  const stats = [
    { number: "5000+", label: "Happy Customers", icon: UsersIcon },
    { number: "3", label: "Years of Excellence", icon: AwardIcon },
    { number: "50+", label: "Menu Items", icon: StarIcon },
    { number: "98%", label: "Customer Satisfaction", icon: HeartIcon }
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-body">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-gold via-yellow-400 to-yellow-500 py-20 px-4 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-[url('https://uploadthingy.s3.us-west-1.amazonaws.com/p5irPgQNgTn2ETzne3anjp/ayamgepukartisanseremban2_%281%29.jpg')] opacity-10 bg-center bg-cover"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 1, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-bold text-brand-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our Story
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-brand-black/80 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Born from a passion for authentic Indonesian cuisine, Ayam Gepuk Artisan brings you the true taste of Indonesia with every crispy, flavorful bite.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mb-6">
                A Journey of Flavor
              </h2>
              <div className="space-y-4 text-brand-black/80 font-body leading-relaxed">
                <p>
                  Our story began in 2021 when our founder, Ahmad Rahman, decided to share the authentic taste of Indonesian Ayam Gepuk with the Malaysian community. Having spent years perfecting traditional recipes passed down from his grandmother, Ahmad wanted to create a place where people could experience the true essence of Indonesian cuisine.
                </p>
                <p>
                  What started as a small family recipe has grown into a beloved local establishment, serving thousands of satisfied customers who appreciate the authentic flavors and quality ingredients that make our dishes special.
                </p>
                <p>
                  Today, we continue to honor our roots while embracing innovation, ensuring that every plate of Ayam Gepuk we serve tells a story of tradition, passion, and culinary excellence.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-brand-lg">
                <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-xl overflow-hidden mb-6">
                  <img
                    src="https://uploadthingy.s3.us-west-1.amazonaws.com/p5irPgQNgTn2ETzne3anjp/ayamgepukartisanseremban2_%281%29.jpg"
                    alt="Our Kitchen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-gold/20 p-3 rounded-xl">
                    <AwardIcon size={24} className="text-brand-red" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-brand-black">Certified Halal</h3>
                    <p className="text-brand-black/70 font-body">JAKIM Certified</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mb-4">
              Our Values
            </h2>
            <p className="text-lg text-brand-black/80 max-w-2xl mx-auto">
              These core values guide everything we do, from ingredient selection to customer service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-yellow-gold to-yellow-400 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <value.icon size={32} className="text-brand-black" />
                </motion.div>
                <h3 className="text-xl font-heading font-bold text-brand-black mb-3">
                  {value.title}
                </h3>
                <p className="text-brand-black/70 font-body leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-brand-red to-red-700">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon size={28} />
                </motion.div>
                <motion.div
                  className="text-3xl md:text-4xl font-heading font-bold mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <p className="font-body font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-brand-black/80 max-w-2xl mx-auto">
              The passionate people behind the delicious food you love.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-brand hover:shadow-brand-lg transition-all duration-300 text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <h3 className="text-xl font-heading font-bold text-brand-black mb-1">
                  {member.name}
                </h3>
                <p className="text-brand-red font-heading font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-brand-black/70 font-body leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-yellow-gold to-yellow-400">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mb-4">
              Ready to Experience Authentic Indonesian Cuisine?
            </h2>
            <p className="text-lg text-brand-black/80 mb-8 max-w-2xl mx-auto">
              Visit us today and taste the difference that passion and tradition make.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/menu"
                className="bg-brand-red text-white px-8 py-4 rounded-2xl font-heading font-semibold hover:bg-red-700 transition-colors shadow-brand-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Menu
              </motion.a>
              <motion.a
                href="tel:0182442017"
                className="bg-white text-brand-black px-8 py-4 rounded-2xl font-heading font-semibold hover:bg-gray-50 transition-colors shadow-brand-lg border-2 border-brand-black"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Call Us Now
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
