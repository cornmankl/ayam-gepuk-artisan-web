import React from 'react';
import { motion } from 'framer-motion';
import {
    ShieldIcon,
    EyeIcon,
    LockIcon,
    DatabaseIcon,
    UserIcon,
    MailIcon,
    PhoneIcon,
    CalendarIcon,
    FileTextIcon,
    AlertCircleIcon
} from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
    const sections = [
        {
            id: 'introduction',
            title: 'Introduction',
            icon: FileTextIcon,
            content: `At Ayam Gepuk Artisan, we are committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.

We respect your privacy rights and are committed to complying with applicable data protection laws, including the Personal Data Protection Act 2010 (PDPA) of Malaysia and the General Data Protection Regulation (GDPR) where applicable.`
        },
        {
            id: 'information-collection',
            title: 'Information We Collect',
            icon: DatabaseIcon,
            content: `We collect information you provide directly to us, such as when you:

• Create an account or profile
• Place an order or make a reservation
• Subscribe to our newsletter
• Contact us for support
• Participate in surveys or promotions

**Personal Information:**
• Name and contact information (email, phone number, address)
• Payment information (processed securely through third-party providers)
• Order history and preferences
• Communication preferences

**Automatically Collected Information:**
• IP address and device information
• Browser type and version
• Pages visited and time spent on our website
• Referring website information
• Cookies and similar tracking technologies`
        },
        {
            id: 'how-we-use',
            title: 'How We Use Your Information',
            icon: EyeIcon,
            content: `We use the information we collect to:

**Service Delivery:**
• Process and fulfill your orders
• Provide customer support
• Send order confirmations and updates
• Manage your account and preferences

**Communication:**
• Send newsletters and promotional materials (with your consent)
• Respond to your inquiries and feedback
• Notify you about important changes to our services

**Improvement:**
• Analyze website usage and performance
• Improve our products and services
• Conduct research and analytics
• Personalize your experience

**Legal Compliance:**
• Comply with applicable laws and regulations
• Protect our rights and interests
• Prevent fraud and ensure security`
        },
        {
            id: 'information-sharing',
            title: 'Information Sharing and Disclosure',
            icon: UserIcon,
            content: `We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:

**Service Providers:**
• Payment processors for transaction processing
• Delivery services for order fulfillment
• Email service providers for communications
• Analytics providers for website improvement

**Legal Requirements:**
• When required by law or legal process
• To protect our rights and property
• To prevent fraud or illegal activities
• In case of emergency to protect health and safety

**Business Transfers:**
• In connection with a merger, acquisition, or sale of assets
• With your explicit consent

All third parties are required to maintain the confidentiality of your information and use it only for the purposes we specify.`
        },
        {
            id: 'data-security',
            title: 'Data Security',
            icon: LockIcon,
            content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

**Security Measures:**
• SSL encryption for data transmission
• Secure servers and databases
• Regular security audits and updates
• Access controls and authentication
• Employee training on data protection

**Data Retention:**
• We retain your information only as long as necessary
• Order information: 7 years for tax and legal purposes
• Marketing data: Until you unsubscribe or request deletion
• Account information: Until account closure

**Data Breach Response:**
• We will notify affected users within 72 hours
• We will report to relevant authorities as required
• We will take immediate steps to contain and remedy the breach`
        },
        {
            id: 'your-rights',
            title: 'Your Rights',
            icon: ShieldIcon,
            content: `You have the following rights regarding your personal information:

**Access and Portability:**
• Request access to your personal data
• Receive a copy of your data in a portable format
• Request correction of inaccurate information

**Control and Deletion:**
• Withdraw consent for marketing communications
• Request deletion of your personal data
• Object to processing of your data
• Restrict processing in certain circumstances

**Communication:**
• Opt-out of marketing emails
• Update your communication preferences
• Request information about our data practices

**How to Exercise Your Rights:**
• Email us at privacy@ayamgepukartisan.com
• Call us at +60-18-244-2017
• Use the contact form on our website
• Update your preferences in your account settings

We will respond to your request within 30 days.`
        },
        {
            id: 'cookies',
            title: 'Cookies and Tracking Technologies',
            icon: DatabaseIcon,
            content: `We use cookies and similar technologies to enhance your experience on our website.

**Types of Cookies:**
• **Necessary Cookies:** Essential for website functionality
• **Analytics Cookies:** Help us understand website usage
• **Marketing Cookies:** Used for targeted advertising
• **Functional Cookies:** Remember your preferences

**Cookie Management:**
• You can control cookies through your browser settings
• You can opt-out of non-essential cookies
• Disabling cookies may affect website functionality
• We use both first-party and third-party cookies

**Third-Party Services:**
• Google Analytics for website analytics
• Social media plugins for sharing
• Payment processors for transactions
• Email marketing services for communications`
        },
        {
            id: 'children-privacy',
            title: 'Children\'s Privacy',
            icon: AlertCircleIcon,
            content: `Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13.

If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. We will take steps to delete such information from our systems.

For children between 13 and 18, we recommend parental guidance when using our services and providing personal information.`
        },
        {
            id: 'international-transfers',
            title: 'International Data Transfers',
            icon: MailIcon,
            content: `Your personal information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws.

**Safeguards for International Transfers:**
• Adequacy decisions by relevant authorities
• Standard contractual clauses
• Binding corporate rules
• Certification schemes
• Your explicit consent

We will only transfer your data to countries that provide adequate protection or with appropriate safeguards in place.`
        },
        {
            id: 'changes',
            title: 'Changes to This Policy',
            icon: CalendarIcon,
            content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws.

**Notification of Changes:**
• We will notify you of significant changes via email
• We will post the updated policy on our website
• We will update the "Last Updated" date
• Your continued use constitutes acceptance of changes

**Previous Versions:**
• We will maintain previous versions for reference
• You can request copies of previous policies
• We will honor previous consent where applicable

We encourage you to review this policy periodically to stay informed about how we protect your information.`
        },
        {
            id: 'contact',
            title: 'Contact Us',
            icon: PhoneIcon,
            content: `If you have any questions about this Privacy Policy or our data practices, please contact us:

**Data Protection Officer:**
Email: privacy@ayamgepukartisan.com
Phone: +60-18-244-2017
Address: 123 Jalan Seremban, Seremban, Negeri Sembilan 70000

**Response Time:**
• General inquiries: 5 business days
• Data subject requests: 30 days
• Urgent matters: 24 hours

**Complaints:**
If you are not satisfied with our response, you have the right to lodge a complaint with the relevant data protection authority in your jurisdiction.

**Last Updated:** October 20, 2023`
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldIcon size={40} className="text-brand-red" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-black dark:text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-brand-black/70 dark:text-gray-300 font-body max-w-2xl mx-auto">
                        Your privacy is important to us. Learn how we collect, use, and protect your personal information.
                    </p>
                    <div className="mt-4 text-sm text-brand-black/60 dark:text-gray-400 font-body">
                        Last updated: October 20, 2023
                    </div>
                </motion.div>

                {/* Table of Contents */}
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-brand mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="text-xl font-heading font-bold text-brand-black dark:text-white mb-4">
                        Table of Contents
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {sections.map((section, index) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                            >
                                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center text-sm font-heading font-semibold text-brand-red">
                                    {index + 1}
                                </span>
                                <span className="text-brand-black dark:text-white font-body">
                                    {section.title}
                                </span>
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <motion.section
                            key={section.id}
                            id={section.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-brand"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center">
                                    <section.icon size={24} className="text-brand-red" />
                                </div>
                                <h2 className="text-2xl font-heading font-bold text-brand-black dark:text-white">
                                    {section.title}
                                </h2>
                            </div>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-brand-black/80 dark:text-gray-300 font-body leading-relaxed whitespace-pre-line">
                                    {section.content}
                                </p>
                            </div>
                        </motion.section>
                    ))}
                </div>

                {/* Footer */}
                <motion.div
                    className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <p className="text-brand-black/60 dark:text-gray-400 font-body">
                        If you have any questions about this Privacy Policy, please contact us at{' '}
                        <a href="mailto:privacy@ayamgepukartisan.com" className="text-brand-red hover:underline">
                            privacy@ayamgepukartisan.com
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
