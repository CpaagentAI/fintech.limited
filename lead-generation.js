// FinPro Directory - Advanced Lead Generation System
// Phase 5: Contact Forms & Lead Generation

class LeadGenerationSystem {
    constructor() {
        this.leads = JSON.parse(localStorage.getItem('finpro_leads') || '[]');
        this.leadAnalytics = JSON.parse(localStorage.getItem('finpro_lead_analytics') || '{}');
        this.emailTemplates = this.initializeEmailTemplates();
        this.leadScoringRules = this.initializeLeadScoringRules();
        
        this.init();
    }

    init() {
        this.setupFormValidation();
        this.setupLeadCapture();
        this.setupEmailSubscription();
        this.setupAnalyticsTracking();
        this.setupLeadScoring();
    }

    initializeEmailTemplates() {
        return {
            welcome: {
                subject: "Welcome to FinPro Directory - Your AI Financial Solutions Partner",
                template: `
                    <h2>Welcome to FinPro Directory!</h2>
                    <p>Thank you for your interest in our AI-powered financial solutions.</p>
                    <p>We're excited to help you transform your financial operations with:</p>
                    <ul>
                        <li>🤖 Automated Bookkeeping AI</li>
                        <li>💰 Smart Payroll Management</li>
                        <li>🔍 Audit Assistant AI</li>
                        <li>📊 Financial Analytics AI</li>
                    </ul>
                    <p>Our team will contact you within 24 hours to discuss your specific needs.</p>
                    <p>Best regards,<br>The FinPro Directory Team</p>
                `
            },
            followup: {
                subject: "Next Steps for Your AI Financial Solutions",
                template: `
                    <h2>Ready to Transform Your Financial Operations?</h2>
                    <p>Based on your interest in our AI solutions, here are some next steps:</p>
                    <ol>
                        <li>Schedule a free consultation</li>
                        <li>Explore our AI demos</li>
                        <li>Download our case studies</li>
                        <li>Connect with our experts</li>
                    </ol>
                    <p>Would you like to schedule a personalized demo?</p>
                `
            },
            nurture: {
                subject: "AI Financial Solutions Success Stories",
                template: `
                    <h2>How Our Clients Are Succeeding with AI</h2>
                    <p>Discover how businesses like yours are transforming their financial operations:</p>
                    <ul>
                        <li>60% reduction in bookkeeping time</li>
                        <li>95% accuracy in payroll processing</li>
                        <li>3x faster audit preparation</li>
                        <li>98% forecast accuracy</li>
                    </ul>
                    <p>Ready to join them?</p>
                `
            }
        };
    }

    initializeLeadScoringRules() {
        return {
            companySize: {
                'small': 10,
                'medium': 20,
                'large': 30,
                'enterprise': 40
            },
            industry: {
                'technology': 25,
                'manufacturing': 20,
                'retail': 15,
                'healthcare': 30,
                'finance': 35,
                'construction': 10
            },
            budget: {
                'under-10k': 10,
                '10k-50k': 20,
                '50k-100k': 30,
                '100k-plus': 40
            },
            timeline: {
                'immediate': 40,
                '1-3-months': 30,
                '3-6-months': 20,
                '6-plus-months': 10
            },
            source: {
                'direct': 30,
                'search': 25,
                'referral': 35,
                'social': 15,
                'email': 20
            }
        };
    }

    setupFormValidation() {
        // Enhanced form validation for all contact forms
        const forms = document.querySelectorAll('form[data-lead-form]');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleFormSubmission(e));
        });

        // Real-time validation
        const inputs = document.querySelectorAll('input[data-validate]');
        inputs.forEach(input => {
            input.addEventListener('blur', (e) => this.validateField(e.target));
            input.addEventListener('input', (e) => this.clearFieldError(e.target));
        });
    }

    setupLeadCapture() {
        // Lead capture popups
        this.createLeadCapturePopup();
        
        // Exit-intent detection
        this.setupExitIntentCapture();
        
        // Scroll-based lead capture
        this.setupScrollBasedCapture();
    }

    setupEmailSubscription() {
        // Newsletter subscription
        const newsletterForms = document.querySelectorAll('form[data-newsletter]');
        newsletterForms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleNewsletterSubscription(e));
        });
    }

    setupAnalyticsTracking() {
        // Track form interactions
        this.trackFormInteractions();
        
        // Track lead quality
        this.trackLeadQuality();
        
        // Track conversion funnels
        this.trackConversionFunnels();
    }

    setupLeadScoring() {
        // Automatic lead scoring based on behavior
        this.trackLeadBehavior();
        
        // Lead qualification
        this.qualifyLeads();
    }

    handleFormSubmission(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const leadData = this.extractLeadData(formData);
        
        // Validate form data
        if (!this.validateLeadData(leadData)) {
            this.showFormErrors(form);
            return;
        }

        // Score the lead
        const leadScore = this.scoreLead(leadData);
        leadData.score = leadScore;
        leadData.timestamp = new Date().toISOString();
        leadData.source = this.detectLeadSource();
        leadData.status = this.determineLeadStatus(leadScore);

        // Store lead
        this.storeLead(leadData);

        // Send confirmation email
        this.sendConfirmationEmail(leadData);

        // Track conversion
        this.trackConversion(leadData);

        // Show success message
        this.showSuccessMessage(form);

        // Trigger follow-up actions
        this.triggerFollowUpActions(leadData);
    }

    extractLeadData(formData) {
        return {
            firstName: formData.get('firstName') || formData.get('name')?.split(' ')[0],
            lastName: formData.get('lastName') || formData.get('name')?.split(' ').slice(1).join(' '),
            email: formData.get('email'),
            phone: formData.get('phone'),
            company: formData.get('company'),
            companySize: formData.get('companySize'),
            industry: formData.get('industry'),
            budget: formData.get('budget'),
            timeline: formData.get('timeline'),
            message: formData.get('message'),
            interests: this.extractInterests(formData),
            utmSource: this.getUTMParameter('utm_source'),
            utmMedium: this.getUTMParameter('utm_medium'),
            utmCampaign: this.getUTMParameter('utm_campaign')
        };
    }

    extractInterests(formData) {
        const interests = [];
        const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(checkbox => {
            interests.push(checkbox.value);
        });
        return interests;
    }

    validateLeadData(leadData) {
        const requiredFields = ['firstName', 'email'];
        return requiredFields.every(field => leadData[field] && leadData[field].trim());
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.getAttribute('data-validate');
        let isValid = true;
        let errorMessage = '';

        switch (fieldType) {
            case 'email':
                isValid = this.isValidEmail(value);
                errorMessage = 'Please enter a valid email address';
                break;
            case 'phone':
                isValid = this.isValidPhone(value);
                errorMessage = 'Please enter a valid phone number';
                break;
            case 'required':
                isValid = value.length > 0;
                errorMessage = 'This field is required';
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#dc3545';
    }

    clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '';
    }

    scoreLead(leadData) {
        let score = 0;

        // Company size scoring
        if (leadData.companySize && this.leadScoringRules.companySize[leadData.companySize]) {
            score += this.leadScoringRules.companySize[leadData.companySize];
        }

        // Industry scoring
        if (leadData.industry && this.leadScoringRules.industry[leadData.industry]) {
            score += this.leadScoringRules.industry[leadData.industry];
        }

        // Budget scoring
        if (leadData.budget && this.leadScoringRules.budget[leadData.budget]) {
            score += this.leadScoringRules.budget[leadData.budget];
        }

        // Timeline scoring
        if (leadData.timeline && this.leadScoringRules.timeline[leadData.timeline]) {
            score += this.leadScoringRules.timeline[leadData.timeline];
        }

        // Source scoring
        const source = this.detectLeadSource();
        if (this.leadScoringRules.source[source]) {
            score += this.leadScoringRules.source[source];
        }

        // Interest scoring
        if (leadData.interests && leadData.interests.length > 0) {
            score += leadData.interests.length * 5;
        }

        // Message quality scoring
        if (leadData.message && leadData.message.length > 50) {
            score += 10;
        }

        return Math.min(score, 100); // Cap at 100
    }

    detectLeadSource() {
        const referrer = document.referrer;
        const utmSource = this.getUTMParameter('utm_source');
        
        if (utmSource) return utmSource;
        if (referrer.includes('google')) return 'search';
        if (referrer.includes('facebook') || referrer.includes('linkedin')) return 'social';
        if (referrer.includes(window.location.hostname)) return 'direct';
        return 'direct';
    }

    getUTMParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    determineLeadStatus(score) {
        if (score >= 80) return 'hot';
        if (score >= 60) return 'warm';
        if (score >= 40) return 'qualified';
        return 'cold';
    }

    storeLead(leadData) {
        this.leads.push(leadData);
        localStorage.setItem('finpro_leads', JSON.stringify(this.leads));
        
        // Track lead analytics
        this.trackLeadAnalytics(leadData);
    }

    trackLeadAnalytics(leadData) {
        const today = new Date().toISOString().split('T')[0];
        
        if (!this.leadAnalytics[today]) {
            this.leadAnalytics[today] = {
                total: 0,
                hot: 0,
                warm: 0,
                qualified: 0,
                cold: 0,
                sources: {},
                industries: {}
            };
        }

        this.leadAnalytics[today].total++;
        this.leadAnalytics[today][leadData.status]++;
        
        // Track sources
        if (!this.leadAnalytics[today].sources[leadData.source]) {
            this.leadAnalytics[today].sources[leadData.source] = 0;
        }
        this.leadAnalytics[today].sources[leadData.source]++;

        // Track industries
        if (leadData.industry) {
            if (!this.leadAnalytics[today].industries[leadData.industry]) {
                this.leadAnalytics[today].industries[leadData.industry] = 0;
            }
            this.leadAnalytics[today].industries[leadData.industry]++;
        }

        localStorage.setItem('finpro_lead_analytics', JSON.stringify(this.leadAnalytics));
    }

    sendConfirmationEmail(leadData) {
        // Simulate email sending
        console.log('Sending confirmation email to:', leadData.email);
        
        // In a real implementation, this would integrate with an email service
        // like SendGrid, Mailchimp, or AWS SES
    }

    trackConversion(leadData) {
        // Track conversion events
        if (typeof gtag !== 'undefined') {
            gtag('event', 'lead_generated', {
                'event_category': 'lead_generation',
                'event_label': leadData.source,
                'value': leadData.score
            });
        }

        // Track in analytics
        this.trackEvent('lead_conversion', {
            lead_id: leadData.email,
            score: leadData.score,
            source: leadData.source,
            status: leadData.status
        });
    }

    trackEvent(eventName, eventData) {
        // Store event for analytics
        const events = JSON.parse(localStorage.getItem('finpro_events') || '[]');
        events.push({
            event: eventName,
            data: eventData,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('finpro_events', JSON.stringify(events));
    }

    showSuccessMessage(form) {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                <h3>Thank you for your interest!</h3>
                <p>We've received your information and will contact you within 24 hours.</p>
                <p>In the meantime, feel free to explore our AI solutions:</p>
                <ul>
                    <li><a href="/ai/bookkeeping">Automated Bookkeeping AI</a></li>
                    <li><a href="/ai/payroll">Smart Payroll Management</a></li>
                    <li><a href="/ai/audit">Audit Assistant AI</a></li>
                    <li><a href="/ai/analytics">Financial Analytics AI</a></li>
                </ul>
            </div>
        `;
        
        form.parentNode.insertBefore(successDiv, form.nextSibling);
        form.style.display = 'none';
    }

    triggerFollowUpActions(leadData) {
        // Schedule follow-up actions based on lead score
        if (leadData.score >= 80) {
            // High-priority lead - immediate follow-up
            this.scheduleImmediateFollowUp(leadData);
        } else if (leadData.score >= 60) {
            // Warm lead - follow-up within 2 hours
            this.scheduleFollowUp(leadData, 2);
        } else {
            // Standard follow-up within 24 hours
            this.scheduleFollowUp(leadData, 24);
        }
    }

    scheduleImmediateFollowUp(leadData) {
        // In a real implementation, this would trigger immediate notifications
        console.log('Scheduling immediate follow-up for hot lead:', leadData.email);
    }

    scheduleFollowUp(leadData, hours) {
        // In a real implementation, this would schedule automated follow-up
        console.log(`Scheduling follow-up in ${hours} hours for lead:`, leadData.email);
    }

    createLeadCapturePopup() {
        // Create exit-intent popup
        const popup = document.createElement('div');
        popup.id = 'leadCapturePopup';
        popup.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
        `;

        popup.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 15px; max-width: 500px; width: 90%; position: relative;">
                <button id="closePopup" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
                <h2 style="margin-bottom: 1rem; color: #333;">Get Your Free AI Financial Assessment</h2>
                <p style="margin-bottom: 1.5rem; color: #666;">Discover how AI can transform your financial operations. Get a personalized assessment in minutes.</p>
                <form data-lead-form data-popup-form>
                    <div style="margin-bottom: 1rem;">
                        <input type="text" name="firstName" placeholder="First Name" data-validate="required" required style="width: 100%; padding: 0.75rem; border: 2px solid #e9ecef; border-radius: 8px;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <input type="email" name="email" placeholder="Email Address" data-validate="email" required style="width: 100%; padding: 0.75rem; border: 2px solid #e9ecef; border-radius: 8px;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <input type="text" name="company" placeholder="Company Name" style="width: 100%; padding: 0.75rem; border: 2px solid #e9ecef; border-radius: 8px;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <select name="companySize" style="width: 100%; padding: 0.75rem; border: 2px solid #e9ecef; border-radius: 8px;">
                            <option value="">Company Size</option>
                            <option value="small">1-50 employees</option>
                            <option value="medium">51-200 employees</option>
                            <option value="large">200+ employees</option>
                        </select>
                    </div>
                    <button type="submit" style="width: 100%; background: #667eea; color: white; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; font-weight: bold;">
                        Get Free Assessment
                    </button>
                </form>
            </div>
        `;

        document.body.appendChild(popup);

        // Close popup functionality
        document.getElementById('closePopup').addEventListener('click', () => {
            popup.style.display = 'none';
        });

        // Close on background click
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    }

    setupExitIntentCapture() {
        let exitIntentShown = false;
        
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !exitIntentShown) {
                exitIntentShown = true;
                this.showLeadCapturePopup();
            }
        });
    }

    setupScrollBasedCapture() {
        let scrollCaptureShown = false;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent > 70 && !scrollCaptureShown) {
                scrollCaptureShown = true;
                this.showScrollBasedCapture();
            }
        });
    }

    showLeadCapturePopup() {
        const popup = document.getElementById('leadCapturePopup');
        if (popup) {
            popup.style.display = 'flex';
        }
    }

    showScrollBasedCapture() {
        // Create scroll-based lead capture
        const captureDiv = document.createElement('div');
        captureDiv.id = 'scrollCapture';
        captureDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #667eea;
            color: white;
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            max-width: 300px;
            cursor: pointer;
        `;

        captureDiv.innerHTML = `
            <h4 style="margin: 0 0 0.5rem 0;">Ready to Transform Your Finances?</h4>
            <p style="margin: 0; font-size: 0.9rem;">Get a free AI assessment</p>
        `;

        captureDiv.addEventListener('click', () => {
            this.showLeadCapturePopup();
            captureDiv.remove();
        });

        document.body.appendChild(captureDiv);

        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (captureDiv.parentNode) {
                captureDiv.remove();
            }
        }, 10000);
    }

    handleNewsletterSubscription(event) {
        event.preventDefault();
        
        const form = event.target;
        const email = form.querySelector('input[type="email"]').value;
        
        if (this.isValidEmail(email)) {
            // Store subscription
            const subscriptions = JSON.parse(localStorage.getItem('finpro_newsletter') || '[]');
            subscriptions.push({
                email: email,
                timestamp: new Date().toISOString(),
                source: 'newsletter'
            });
            localStorage.setItem('finpro_newsletter', JSON.stringify(subscriptions));
            
            // Show success message
            this.showNewsletterSuccess(form);
            
            // Track subscription
            this.trackEvent('newsletter_subscription', { email: email });
        }
    }

    showNewsletterSuccess(form) {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            background: #d4edda;
            color: #155724;
            padding: 0.75rem;
            border-radius: 8px;
            margin-top: 1rem;
            font-size: 0.9rem;
        `;
        successDiv.textContent = 'Thank you for subscribing! You\'ll receive our latest updates.';
        
        form.parentNode.appendChild(successDiv);
        form.style.display = 'none';
    }

    trackFormInteractions() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('focusin', () => {
                this.trackEvent('form_interaction', {
                    form_id: form.id || 'unknown',
                    action: 'focus'
                });
            });
        });
    }

    trackLeadQuality() {
        // Track lead quality metrics
        setInterval(() => {
            const totalLeads = this.leads.length;
            const hotLeads = this.leads.filter(lead => lead.status === 'hot').length;
            const conversionRate = totalLeads > 0 ? (hotLeads / totalLeads) * 100 : 0;
            
            this.trackEvent('lead_quality_metrics', {
                total_leads: totalLeads,
                hot_leads: hotLeads,
                conversion_rate: conversionRate
            });
        }, 300000); // Every 5 minutes
    }

    trackConversionFunnels() {
        // Track conversion funnel metrics
        const funnelSteps = ['page_view', 'form_view', 'form_submit', 'lead_qualified'];
        let currentStep = 0;
        
        // Track page views
        this.trackEvent('funnel_step', {
            step: funnelSteps[0],
            step_number: 1
        });
    }

    trackLeadBehavior() {
        // Track user behavior for lead scoring
        let pageViews = 0;
        let timeOnSite = 0;
        let startTime = Date.now();
        
        // Track page views
        window.addEventListener('beforeunload', () => {
            timeOnSite = Date.now() - startTime;
            this.trackEvent('user_behavior', {
                page_views: pageViews,
                time_on_site: timeOnSite,
                pages_visited: this.getVisitedPages()
            });
        });
        
        // Track page navigation
        window.addEventListener('popstate', () => {
            pageViews++;
        });
    }

    getVisitedPages() {
        return JSON.parse(localStorage.getItem('finpro_visited_pages') || '[]');
    }

    qualifyLeads() {
        // Automatic lead qualification based on behavior and data
        this.leads.forEach(lead => {
            if (!lead.qualified) {
                lead.qualified = this.isLeadQualified(lead);
            }
        });
        
        localStorage.setItem('finpro_leads', JSON.stringify(this.leads));
    }

    isLeadQualified(lead) {
        // Qualification criteria
        const hasEmail = lead.email && this.isValidEmail(lead.email);
        const hasCompany = lead.company && lead.company.trim().length > 0;
        const hasPhone = lead.phone && this.isValidPhone(lead.phone);
        const hasMessage = lead.message && lead.message.trim().length > 20;
        
        return hasEmail && (hasCompany || hasPhone || hasMessage);
    }

    // Public methods for external use
    getLeads() {
        return this.leads;
    }

    getLeadAnalytics() {
        return this.leadAnalytics;
    }

    getLeadScore(email) {
        const lead = this.leads.find(l => l.email === email);
        return lead ? lead.score : 0;
    }

    exportLeads() {
        const csvContent = this.convertToCSV(this.leads);
        this.downloadCSV(csvContent, 'finpro_leads.csv');
    }

    convertToCSV(data) {
        const headers = Object.keys(data[0] || {});
        const csvRows = [headers.join(',')];
        
        data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header] || '';
                return `"${value.toString().replace(/"/g, '""')}"`;
            });
            csvRows.push(values.join(','));
        });
        
        return csvRows.join('\n');
    }

    downloadCSV(content, filename) {
        const blob = new Blob([content], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}

// Initialize lead generation system when DOM is loaded
let leadGenerationSystem;
document.addEventListener('DOMContentLoaded', function() {
    leadGenerationSystem = new LeadGenerationSystem();
});

// Export for use in other scripts
window.LeadGenerationSystem = LeadGenerationSystem;
window.leadGenerationSystem = leadGenerationSystem;
