// FinPro Directory - SEO Optimization & Analytics System
// Phase 6: SEO Optimization & Analytics

class SEOAnalyticsSystem {
    constructor() {
        this.analyticsConfig = {
            ga4Id: 'G-XXXXXXXXXX', // Replace with actual GA4 ID
            gtmId: 'GTM-XXXXXXX', // Replace with actual GTM ID
            conversionGoals: {
                leadGeneration: 'lead_generated',
                newsletterSignup: 'newsletter_signup',
                aiDemo: 'ai_demo_started',
                contactForm: 'contact_form_submitted'
            }
        };
        
        this.seoConfig = {
            siteName: 'FinPro Directory',
            siteDescription: 'AI-powered financial solutions directory with certified CPAs, accountants, and tax professionals.',
            siteUrl: 'https://www.fintech.limited',
            socialMedia: {
                twitter: '@FinProDirectory',
                facebook: 'FinProDirectory',
                linkedin: 'finpro-directory'
            }
        };
        
        this.init();
    }

    init() {
        this.setupGoogleAnalytics();
        this.setupGoogleTagManager();
        this.setupStructuredData();
        this.setupMetaTags();
        this.setupEventTracking();
        this.setupPerformanceMonitoring();
        this.generateSitemap();
        this.createRobotsTxt();
    }

    setupGoogleAnalytics() {
        // Google Analytics 4
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.analyticsConfig.ga4Id}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', this.analyticsConfig.ga4Id, {
            page_title: document.title,
            page_location: window.location.href,
            custom_map: {
                'custom_parameter_1': 'lead_score',
                'custom_parameter_2': 'ai_solution_type'
            }
        });
    }

    setupGoogleTagManager() {
        // Google Tag Manager
        const gtmScript = document.createElement('script');
        gtmScript.innerHTML = `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${this.analyticsConfig.gtmId}');
        `;
        document.head.appendChild(gtmScript);

        // GTM NoScript
        const noscript = document.createElement('noscript');
        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${this.analyticsConfig.gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.insertBefore(noscript, document.body.firstChild);
    }

    setupStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": this.seoConfig.siteName,
            "description": this.seoConfig.siteDescription,
            "url": this.seoConfig.siteUrl,
            "logo": `${this.seoConfig.siteUrl}/logo.png`,
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-470-596-1308",
                "contactType": "customer service",
                "email": "info@cpaai.net"
            },
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Atlanta",
                "addressRegion": "GA",
                "addressCountry": "US"
            },
            "sameAs": [
                `https://twitter.com/${this.seoConfig.socialMedia.twitter}`,
                `https://facebook.com/${this.seoConfig.socialMedia.facebook}`,
                `https://linkedin.com/company/${this.seoConfig.socialMedia.linkedin}`
            ],
            "offers": {
                "@type": "Offer",
                "name": "AI Financial Solutions",
                "description": "AI-powered bookkeeping, payroll, audit, and analytics solutions",
                "priceRange": "$149-$699/month"
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    setupMetaTags() {
        // Enhanced meta tags for SEO
        this.addMetaTag('description', this.seoConfig.siteDescription);
        this.addMetaTag('keywords', 'AI financial solutions, CPA directory, automated bookkeeping, smart payroll, audit assistant, financial analytics, tax professionals');
        this.addMetaTag('author', 'Patriot Tax Services Ltd');
        this.addMetaTag('robots', 'index, follow');
        this.addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
        
        // Open Graph tags
        this.addMetaTag('og:title', document.title, 'property');
        this.addMetaTag('og:description', this.seoConfig.siteDescription, 'property');
        this.addMetaTag('og:type', 'website', 'property');
        this.addMetaTag('og:url', window.location.href, 'property');
        this.addMetaTag('og:image', `${this.seoConfig.siteUrl}/og-image.jpg`, 'property');
        this.addMetaTag('og:site_name', this.seoConfig.siteName, 'property');
        
        // Twitter Card tags
        this.addMetaTag('twitter:card', 'summary_large_image', 'name');
        this.addMetaTag('twitter:title', document.title, 'name');
        this.addMetaTag('twitter:description', this.seoConfig.siteDescription, 'name');
        this.addMetaTag('twitter:image', `${this.seoConfig.siteUrl}/twitter-image.jpg`, 'name');
        this.addMetaTag('twitter:site', this.seoConfig.socialMedia.twitter, 'name');
        
        // Additional SEO tags
        this.addMetaTag('theme-color', '#667eea');
        this.addMetaTag('msapplication-TileColor', '#667eea');
        this.addMetaTag('apple-mobile-web-app-capable', 'yes');
        this.addMetaTag('apple-mobile-web-app-status-bar-style', 'default');
    }

    addMetaTag(name, content, attribute = 'name') {
        const existingTag = document.querySelector(`meta[${attribute}="${name}"]`);
        if (existingTag) {
            existingTag.setAttribute('content', content);
        } else {
            const meta = document.createElement('meta');
            meta.setAttribute(attribute, name);
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
        }
    }

    setupEventTracking() {
        // Track form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.hasAttribute('data-lead-form')) {
                this.trackEvent('form_submission', {
                    form_type: 'lead_generation',
                    page_url: window.location.pathname
                });
            }
        });

        // Track button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href*="/ai/"]')) {
                this.trackEvent('ai_solution_click', {
                    solution_type: e.target.href.split('/').pop(),
                    page_url: window.location.pathname
                });
            }
            
            if (e.target.matches('a[href*="/professionals"]')) {
                this.trackEvent('professionals_page_click', {
                    page_url: window.location.pathname
                });
            }
        });

        // Track search interactions
        document.addEventListener('input', (e) => {
            if (e.target.matches('input[type="search"], input[placeholder*="search"]')) {
                this.trackEvent('search_interaction', {
                    search_term: e.target.value,
                    page_url: window.location.pathname
                });
            }
        });

        // Track page views
        this.trackPageView();
    }

    trackEvent(eventName, parameters = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'engagement',
                event_label: parameters.page_url || window.location.pathname,
                ...parameters
            });
        }

        // Google Tag Manager
        if (window.dataLayer) {
            window.dataLayer.push({
                event: eventName,
                ...parameters
            });
        }

        // Custom analytics
        this.storeCustomEvent(eventName, parameters);
    }

    trackPageView() {
        const pageData = {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
            timestamp: new Date().toISOString()
        };

        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', pageData);
        }

        // Store page view
        this.storePageView(pageData);
    }

    storeCustomEvent(eventName, parameters) {
        const events = JSON.parse(localStorage.getItem('finpro_analytics_events') || '[]');
        events.push({
            event: eventName,
            parameters: parameters,
            timestamp: new Date().toISOString(),
            page_url: window.location.href
        });
        
        // Keep only last 1000 events
        if (events.length > 1000) {
            events.splice(0, events.length - 1000);
        }
        
        localStorage.setItem('finpro_analytics_events', JSON.stringify(events));
    }

    storePageView(pageData) {
        const pageViews = JSON.parse(localStorage.getItem('finpro_page_views') || '[]');
        pageViews.push(pageData);
        
        // Keep only last 100 page views
        if (pageViews.length > 100) {
            pageViews.splice(0, pageViews.length - 100);
        }
        
        localStorage.setItem('finpro_page_views', JSON.stringify(pageViews));
    }

    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint (LCP)
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    this.trackEvent('core_web_vital', {
                        metric_name: 'LCP',
                        metric_value: entry.startTime,
                        page_url: window.location.pathname
                    });
                }
            }).observe({entryTypes: ['largest-contentful-paint']});

            // First Input Delay (FID)
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    this.trackEvent('core_web_vital', {
                        metric_name: 'FID',
                        metric_value: entry.processingStart - entry.startTime,
                        page_url: window.location.pathname
                    });
                }
            }).observe({entryTypes: ['first-input']});

            // Cumulative Layout Shift (CLS)
            let clsValue = 0;
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                this.trackEvent('core_web_vital', {
                    metric_name: 'CLS',
                    metric_value: clsValue,
                    page_url: window.location.pathname
                });
            }).observe({entryTypes: ['layout-shift']});
        }

        // Monitor page load time
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            this.trackEvent('page_load_time', {
                load_time: loadTime,
                page_url: window.location.pathname
            });
        });
    }

    generateSitemap() {
        const sitemap = {
            pages: [
                { url: '/', priority: 1.0, changefreq: 'daily' },
                { url: '/professionals', priority: 0.9, changefreq: 'weekly' },
                { url: '/services', priority: 0.9, changefreq: 'weekly' },
                { url: '/about', priority: 0.8, changefreq: 'monthly' },
                { url: '/contact', priority: 0.8, changefreq: 'monthly' },
                { url: '/ai/bookkeeping', priority: 0.9, changefreq: 'weekly' },
                { url: '/ai/payroll', priority: 0.9, changefreq: 'weekly' },
                { url: '/ai/audit', priority: 0.9, changefreq: 'weekly' },
                { url: '/ai/analytics', priority: 0.9, changefreq: 'weekly' },
                { url: '/analytics-dashboard', priority: 0.7, changefreq: 'daily' },
                { url: '/presentation', priority: 0.6, changefreq: 'monthly' },
                { url: '/qr', priority: 0.5, changefreq: 'monthly' }
            ]
        };

        // Store sitemap data
        localStorage.setItem('finpro_sitemap', JSON.stringify(sitemap));
        
        // Generate XML sitemap
        this.createXMLSitemap(sitemap);
    }

    createXMLSitemap(sitemap) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        
        sitemap.pages.forEach(page => {
            xml += '  <url>\n';
            xml += `    <loc>${this.seoConfig.siteUrl}${page.url}</loc>\n`;
            xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
            xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
            xml += `    <priority>${page.priority}</priority>\n`;
            xml += '  </url>\n';
        });
        
        xml += '</urlset>';
        
        // Store XML sitemap
        localStorage.setItem('finpro_xml_sitemap', xml);
    }

    createRobotsTxt() {
        const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${this.seoConfig.siteUrl}/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /private/
Disallow: /analytics-dashboard/

# Allow AI solution pages
Allow: /ai/
Allow: /professionals/
Allow: /services/
Allow: /about/
Allow: /contact/

# Crawl delay
Crawl-delay: 1`;

        localStorage.setItem('finpro_robots_txt', robotsTxt);
    }

    // Public methods for external use
    trackConversion(conversionType, value = null) {
        this.trackEvent('conversion', {
            conversion_type: conversionType,
            conversion_value: value,
            page_url: window.location.pathname
        });
    }

    trackLeadGeneration(leadData) {
        this.trackEvent('lead_generated', {
            lead_score: leadData.score,
            lead_source: leadData.source,
            lead_status: leadData.status,
            company_size: leadData.companySize,
            industry: leadData.industry,
            page_url: window.location.pathname
        });
    }

    trackAIDemo(solutionType) {
        this.trackEvent('ai_demo_started', {
            solution_type: solutionType,
            page_url: window.location.pathname
        });
    }

    trackNewsletterSignup(email) {
        this.trackEvent('newsletter_signup', {
            email_domain: email.split('@')[1],
            page_url: window.location.pathname
        });
    }

    getAnalyticsData() {
        return {
            events: JSON.parse(localStorage.getItem('finpro_analytics_events') || '[]'),
            pageViews: JSON.parse(localStorage.getItem('finpro_page_views') || '[]'),
            sitemap: JSON.parse(localStorage.getItem('finpro_sitemap') || '{}')
        };
    }

    exportAnalyticsData() {
        const data = this.getAnalyticsData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'finpro_analytics_data.json';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // SEO Audit methods
    performSEOAudit() {
        const audit = {
            timestamp: new Date().toISOString(),
            page_url: window.location.href,
            issues: [],
            recommendations: [],
            score: 100
        };

        // Check meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription || metaDescription.content.length < 120) {
            audit.issues.push('Meta description missing or too short');
            audit.recommendations.push('Add a meta description between 120-160 characters');
            audit.score -= 10;
        }

        // Check title tag
        const title = document.title;
        if (!title || title.length < 30 || title.length > 60) {
            audit.issues.push('Title tag length issue');
            audit.recommendations.push('Optimize title tag length (30-60 characters)');
            audit.score -= 10;
        }

        // Check heading structure
        const h1Count = document.querySelectorAll('h1').length;
        if (h1Count === 0) {
            audit.issues.push('Missing H1 tag');
            audit.recommendations.push('Add an H1 tag to the page');
            audit.score -= 15;
        } else if (h1Count > 1) {
            audit.issues.push('Multiple H1 tags');
            audit.recommendations.push('Use only one H1 tag per page');
            audit.score -= 5;
        }

        // Check images alt text
        const images = document.querySelectorAll('img');
        let imagesWithoutAlt = 0;
        images.forEach(img => {
            if (!img.alt) {
                imagesWithoutAlt++;
            }
        });
        if (imagesWithoutAlt > 0) {
            audit.issues.push(`${imagesWithoutAlt} images missing alt text`);
            audit.recommendations.push('Add alt text to all images');
            audit.score -= imagesWithoutAlt * 2;
        }

        // Check internal links
        const internalLinks = document.querySelectorAll('a[href^="/"]');
        if (internalLinks.length < 3) {
            audit.issues.push('Insufficient internal linking');
            audit.recommendations.push('Add more internal links to improve site structure');
            audit.score -= 5;
        }

        return audit;
    }
}

// Initialize SEO and Analytics system when DOM is loaded
let seoAnalyticsSystem;
document.addEventListener('DOMContentLoaded', function() {
    seoAnalyticsSystem = new SEOAnalyticsSystem();
});

// Export for use in other scripts
window.SEOAnalyticsSystem = SEOAnalyticsSystem;
window.seoAnalyticsSystem = seoAnalyticsSystem;
