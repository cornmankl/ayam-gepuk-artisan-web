import React from 'react';
import { motion } from 'framer-motion';
import { FacebookIcon, InstagramIcon, YoutubeIcon, MessageCircleIcon } from 'lucide-react';

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    <path d="M12 12v8a4 4 0 0 0 4-4" />
    <path d="M12 8a4 4 0 0 1 4-4h4v8a4 4 0 0 1-4 4h-4" />
  </svg>
);

interface SocialMediaLinksProps {
    variant?: 'header' | 'footer' | 'floating';
    size?: 'sm' | 'md' | 'lg';
    showLabels?: boolean;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({
    variant = 'footer',
    size = 'md',
    showLabels = false
}) => {
    const socialLinks = [
        {
            name: 'Facebook',
            icon: FacebookIcon,
            url: 'https://www.facebook.com/AyamGepukArtisan',
            color: 'hover:bg-blue-600',
            bgColor: 'bg-blue-500'
        },
        {
            name: 'Instagram',
            icon: InstagramIcon,
            url: 'https://www.instagram.com/ayamgepukartisan',
            color: 'hover:bg-pink-600',
            bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500'
        },
        {
            name: 'TikTok',
            icon: TiktokIcon,
            url: 'https://www.tiktok.com/@ayamgepukartisan',
            color: 'hover:bg-black',
            bgColor: 'bg-black'
        },
        {
            name: 'YouTube',
            icon: YoutubeIcon,
            url: 'https://www.youtube.com/@ayamgepukartisan',
            color: 'hover:bg-red-600',
            bgColor: 'bg-red-500'
        },
        {
            name: 'WhatsApp',
            icon: MessageCircleIcon,
            url: 'https://wa.me/60182442017',
            color: 'hover:bg-green-600',
            bgColor: 'bg-green-500'
        }
    ];

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'w-8 h-8';
            case 'lg':
                return 'w-12 h-12';
            default:
                return 'w-10 h-10';
        }
    };

    const getVariantClasses = () => {
        switch (variant) {
            case 'header':
                return 'bg-white/20 hover:bg-white/30';
            case 'floating':
                return 'bg-white shadow-brand-lg hover:shadow-brand-xl';
            default:
                return 'bg-white/10 hover:bg-white/20';
        }
    };

    return (
        <div className={`flex ${variant === 'floating' ? 'flex-col space-y-3' : 'space-x-3'}`}>
            {socialLinks.map((social, index) => (
                <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
            ${getSizeClasses()} 
            ${getVariantClasses()} 
            ${social.color}
            rounded-xl flex items-center justify-center transition-all duration-300 group
            ${variant === 'floating' ? 'text-brand-black' : 'text-white'}
          `}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Follow us on ${social.name}`}
                >
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                    >
                        <social.icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
                    </motion.div>

                    {showLabels && (
                        <motion.span
                            className="ml-2 font-heading font-semibold text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {social.name}
                        </motion.span>
                    )}
                </motion.a>
            ))}
        </div>
    );
};

export default SocialMediaLinks;
