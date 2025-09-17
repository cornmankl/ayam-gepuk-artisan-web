import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  SendIcon,
  MessageCircleIcon,
  NavigationIcon,
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });

    setIsSubmitting(false);
    alert('Thank you for your message! We will get back to you soon.');
  };

  const contactInfo = [
    {
      icon: MapPinIcon,
      title: 'Visit Us',
      details: ['123 Jalan Seremban', 'Seremban, Negeri Sembilan', 'Malaysia'],
      action: 'Get Directions',
      href: 'https://maps.google.com',
    },
    {
      icon: PhoneIcon,
      title: 'Call Us',
      details: ['+60 18-244 2017', 'Mon-Sun: 10AM-10PM'],
      action: 'Call Now',
      href: 'tel:0182442017',
    },
    {
      icon: MailIcon,
      title: 'Email Us',
      details: ['info@ayamgepukartisan.com', 'orders@ayamgepukartisan.com'],
      action: 'Send Email',
      href: 'mailto:info@ayamgepukartisan.com',
    },
    {
      icon: ClockIcon,
      title: 'Opening Hours',
      details: [
        'Monday - Sunday',
        '10:00 AM - 10:00 PM',
        'Last Order: 9:30 PM',
      ],
      action: 'View Menu',
      href: '/menu',
    },
  ];

  const subjects = [
    'General Inquiry',
    'Order Inquiry',
    'Catering Services',
    'Feedback',
    'Complaint',
    'Partnership',
    'Other',
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-body">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-gold via-yellow-400 to-yellow-500 py-20 px-4 overflow-hidden">
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
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-bold text-brand-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Get In Touch
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-brand-black/80 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We'd love to hear from you! Send us a message and we'll respond as
              soon as possible.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => (
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
                  className="bg-gradient-to-br from-yellow-gold to-yellow-400 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <info.icon size={28} className="text-brand-black" />
                </motion.div>
                <h3 className="text-xl font-heading font-bold text-brand-black mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-brand-black/70 font-body">
                      {detail}
                    </p>
                  ))}
                </div>
                <motion.a
                  href={info.href}
                  className="inline-block bg-brand-red text-white px-4 py-2 rounded-xl font-heading font-semibold hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {info.action}
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-brand-lg"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-heading font-bold text-brand-black mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-heading font-semibold text-brand-black mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold text-brand-black mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-heading font-semibold text-brand-black mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-heading font-semibold text-brand-black mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body appearance-none bg-white"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-heading font-semibold text-brand-black mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-gold focus:border-transparent transition-all duration-300 font-body resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-red text-white py-4 rounded-xl font-heading font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <SendIcon size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Map & WhatsApp CTA */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Google Maps Embed */}
              <div className="bg-white rounded-2xl p-6 shadow-brand-lg">
                <h3 className="text-xl font-heading font-bold text-brand-black mb-4 flex items-center gap-2">
                  <MapPinIcon size={24} className="text-brand-red" />
                  Our Location
                </h3>
                <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.123456789!2d102.123456789!3d2.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMDcnMjQuNCJOIDEwMsKwMDcnMjQuNCJF!5e0!3m2!1sen!2smy!4v1234567890123!5m2!1sen!2smy"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
                <p className="text-brand-black/70 font-body mt-4">
                  123 Jalan Seremban, Seremban, Negeri Sembilan, Malaysia
                </p>
              </div>

              {/* WhatsApp CTA */}
              <motion.div
                className="bg-green-500 rounded-2xl p-6 text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <MessageCircleIcon size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold">
                      Quick Order via WhatsApp
                    </h3>
                    <p className="font-body">
                      Get instant responses and place orders quickly
                    </p>
                  </div>
                </div>
                <motion.a
                  href="https://wa.me/60182442017?text=Hi! I'd like to place an order from Ayam Gepuk Artisan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-green-500 px-6 py-3 rounded-xl font-heading font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircleIcon size={20} />
                  Chat on WhatsApp
                </motion.a>
              </motion.div>

              {/* Quick Contact */}
              <div className="bg-white rounded-2xl p-6 shadow-brand-lg">
                <h3 className="text-xl font-heading font-bold text-brand-black mb-4">
                  Quick Contact
                </h3>
                <div className="space-y-3">
                  <motion.a
                    href="tel:0182442017"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-yellow-gold/20 transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <PhoneIcon
                      size={20}
                      className="text-brand-red group-hover:scale-110 transition-transform"
                    />
                    <span className="font-body font-medium text-brand-black">
                      +60 18-244 2017
                    </span>
                  </motion.a>
                  <motion.a
                    href="mailto:info@ayamgepukartisan.com"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-yellow-gold/20 transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <MailIcon
                      size={20}
                      className="text-brand-red group-hover:scale-110 transition-transform"
                    />
                    <span className="font-body font-medium text-brand-black">
                      info@ayamgepukartisan.com
                    </span>
                  </motion.a>
                  <motion.a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-yellow-gold/20 transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <NavigationIcon
                      size={20}
                      className="text-brand-red group-hover:scale-110 transition-transform"
                    />
                    <span className="font-body font-medium text-brand-black">
                      Get Directions
                    </span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
