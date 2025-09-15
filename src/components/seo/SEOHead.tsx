import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'product';
    structuredData?: any;
}

const SEOHead: React.FC<SEOHeadProps> = ({
    title = 'Ayam Gepuk Artisan - Rasa Ayam Gepuk Sebenar!',
    description = 'Authentic Indonesian smashed fried chicken with traditional spices and sambal. A taste of Indonesia in every bite. Order now for the best Ayam Gepuk in Malaysia!',
    keywords = 'ayam gepuk, indonesian food, fried chicken, malaysia, seremban, authentic, halal, restaurant, delivery, takeaway',
    image = 'https://uploadthingy.s3.us-west-1.amazonaws.com/p5irPgQNgTn2ETzne3anjp/ayamgepukartisanseremban2_%281%29.jpg',
    url = 'https://ayamgepukartisan.com',
    type = 'website',
    structuredData
}) => {
    const fullTitle = title.includes('Ayam Gepuk Artisan') ? title : `${title} | Ayam Gepuk Artisan`;
    const fullUrl = url.startsWith('http') ? url : `https://ayamgepukartisan.com${url}`;

    const defaultStructuredData = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "Ayam Gepuk Artisan",
        "description": "Authentic Indonesian smashed fried chicken with traditional spices and sambal",
        "url": "https://ayamgepukartisan.com",
        "logo": "https://ayamgepukartisan.com/logo.png",
        "image": image,
        "telephone": "+60-18-244-2017",
        "email": "info@ayamgepukartisan.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Jalan Seremban",
            "addressLocality": "Seremban",
            "addressRegion": "Negeri Sembilan",
            "postalCode": "70000",
            "addressCountry": "MY"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "2.7297",
            "longitude": "101.9381"
        },
        "openingHours": [
            "Mo-Su 10:00-22:00"
        ],
        "servesCuisine": "Indonesian",
        "priceRange": "$$",
        "hasMenu": "https://ayamgepukartisan.com/menu",
        "acceptsReservations": true,
        "paymentAccepted": ["Cash", "Credit Card", "Online Payment", "E-Wallet"],
        "currenciesAccepted": "MYR",
        "sameAs": [
            "https://www.facebook.com/AyamGepukArtisan",
            "https://www.instagram.com/ayamgepukartisan",
            "https://www.tiktok.com/@ayamgepukartisan",
            "https://www.youtube.com/@ayamgepukartisan"
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "150"
        }
    };

    const finalStructuredData = structuredData || defaultStructuredData;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Ayam Gepuk Artisan" />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="Content-Language" content="en" />

            {/* Canonical URL */}
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:site_name" content="Ayam Gepuk Artisan" />
            <meta property="og:locale" content="en_MY" />

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:site" content="@ayamgepukartisan" />
            <meta name="twitter:creator" content="@ayamgepukartisan" />

            {/* Additional Meta Tags */}
            <meta name="theme-color" content="#FFD700" />
            <meta name="msapplication-TileColor" content="#FFD700" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="Ayam Gepuk Artisan" />

            {/* Favicon */}
            <link rel="icon" type="image/jpeg" href="/ayamgepukartisanseremban2_%281%29.jpg" />
            <link rel="apple-touch-icon" href="/ayamgepukartisanseremban2_%281%29.jpg" />

            {/* Preconnect to external domains */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://uploadthingy.s3.us-west-1.amazonaws.com" />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(finalStructuredData)}
            </script>

            {/* Additional SEO Scripts */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Ayam Gepuk Artisan",
                    "url": "https://ayamgepukartisan.com",
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://ayamgepukartisan.com/menu?search={search_term_string}",
                        "query-input": "required name=search_term_string"
                    }
                })}
            </script>
        </Helmet>
    );
};

export default SEOHead;
