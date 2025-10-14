// FinPro Directory - Global Search System
// Phase 3: Live Search Functionality

class FinProSearch {
    constructor() {
        this.searchData = {
            professionals: [],
            services: [],
            content: [],
            faq: []
        };
        
        this.searchHistory = JSON.parse(localStorage.getItem('finpro_search_history') || '[]');
        this.searchAnalytics = JSON.parse(localStorage.getItem('finpro_search_analytics') || '{}');
        
        this.init();
    }

    init() {
        this.loadSearchData();
        this.setupGlobalSearch();
        this.setupSearchSuggestions();
        this.setupSearchAnalytics();
    }

    loadSearchData() {
        // Professional data
        this.searchData.professionals = [
            { id: 1, name: "Sarah Johnson", title: "CPA, Tax Specialist", specialties: ["Tax Preparation", "Small Business", "IRS Representation"], location: "Atlanta, GA", rating: 4.9 },
            { id: 2, name: "Michael Chen", title: "CPA, Audit Partner", specialties: ["Audit & Assurance", "Compliance", "Risk Management"], location: "Charleston, SC", rating: 4.8 },
            { id: 3, name: "Emily Rodriguez", title: "CPA, Bookkeeping Expert", specialties: ["Bookkeeping", "QuickBooks", "Financial Reporting"], location: "Miami, FL", rating: 4.7 },
            { id: 4, name: "David Thompson", title: "CPA, Business Consultant", specialties: ["Business Consulting", "Tax Planning", "Estate Planning"], location: "Charlotte, NC", rating: 4.9 },
            { id: 5, name: "Lisa Wang", title: "CPA, Payroll Specialist", specialties: ["Payroll Services", "HR Compliance", "Benefits Administration"], location: "Remote", rating: 4.6 },
            { id: 6, name: "Robert Martinez", title: "CPA, Tax Attorney", specialties: ["Tax Law", "Estate Planning", "Business Formation"], location: "Atlanta, GA", rating: 4.8 },
            { id: 7, name: "Jennifer Kim", title: "CPA, Forensic Accountant", specialties: ["Forensic Accounting", "Fraud Investigation", "Litigation Support"], location: "Charleston, SC", rating: 4.7 },
            { id: 8, name: "James Wilson", title: "CPA, Non-Profit Specialist", specialties: ["Non-Profit Accounting", "Grant Management", "Compliance"], location: "Charlotte, NC", rating: 4.9 },
            { id: 9, name: "Maria Garcia", title: "CPA, Real Estate Expert", specialties: ["Real Estate Accounting", "Property Management", "Tax Planning"], location: "Miami, FL", rating: 4.6 },
            { id: 10, name: "Thomas Brown", title: "CPA, Healthcare Specialist", specialties: ["Healthcare Accounting", "HIPAA Compliance", "Medical Practice Management"], location: "Atlanta, GA", rating: 4.8 },
            { id: 11, name: "Amanda Davis", title: "CPA, E-commerce Expert", specialties: ["E-commerce Accounting", "Sales Tax", "Inventory Management"], location: "Remote", rating: 4.7 },
            { id: 12, name: "Christopher Lee", title: "CPA, Manufacturing Specialist", specialties: ["Manufacturing Accounting", "Cost Accounting", "Inventory Control"], location: "Charleston, SC", rating: 4.9 }
        ];

        // Services data
        this.searchData.services = [
            { id: 1, name: "Automated Bookkeeping", description: "AI-powered system that automatically categorizes transactions", price: "$299/month", features: ["Automatic transaction categorization", "Real-time account reconciliation", "Machine learning accuracy"] },
            { id: 2, name: "Smart Payroll Management", description: "Intelligent payroll processing with tax calculations", price: "$199/month", features: ["Automated tax calculations", "Compliance monitoring", "Direct deposit processing"] },
            { id: 3, name: "Audit Assistant", description: "AI tool that helps identify potential audit risks", price: "$399/month", features: ["Risk assessment algorithms", "Document preparation", "Compliance monitoring"] },
            { id: 4, name: "Financial Analytics", description: "Advanced analytics and reporting powered by machine learning", price: "$249/month", features: ["Predictive analytics", "Custom dashboards", "Trend analysis"] }
        ];

        // Content data
        this.searchData.content = [
            { id: 1, title: "About FinPro Directory", content: "Revolutionizing financial services through AI-powered technology", page: "/about", type: "page" },
            { id: 2, title: "AI Solutions", content: "Transform your practice with cutting-edge artificial intelligence", page: "/services", type: "page" },
            { id: 3, title: "Find CPAs", content: "Connect with licensed professionals in your area", page: "/professionals", type: "page" },
            { id: 4, title: "Contact Us", content: "Get in touch with our team for AI solutions", page: "/contact", type: "page" },
            { id: 5, title: "Patriot Tax Services", content: "Our parent company providing comprehensive tax services", page: "/about", type: "company" }
        ];

        // FAQ data
        this.searchData.faq = [
            { id: 1, question: "How quickly do you respond?", answer: "We typically respond to all inquiries within 24 hours", category: "support" },
            { id: 2, question: "Do you offer free consultations?", answer: "Yes, we offer free initial consultations for AI solutions", category: "services" },
            { id: 3, question: "What AI solutions do you provide?", answer: "We offer automated bookkeeping, smart payroll, audit assistance, and analytics", category: "services" },
            { id: 4, question: "Do you serve clients nationwide?", answer: "Yes, we serve clients across all 50 states", category: "coverage" },
            { id: 5, question: "Is my data secure?", answer: "Absolutely. We use bank-level security and are SOC 2 compliant", category: "security" },
            { id: 6, question: "Can I integrate with existing systems?", answer: "Yes, our AI solutions integrate with QuickBooks and major banks", category: "integration" }
        ];
    }

    setupGlobalSearch() {
        // Create global search bar if it doesn't exist
        if (!document.getElementById('globalSearchBar')) {
            this.createGlobalSearchBar();
        }

        // Setup search event listeners
        const searchInput = document.getElementById('globalSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(e.target.value);
                }
            });
        }
    }

    createGlobalSearchBar() {
        const searchContainer = document.createElement('div');
        searchContainer.id = 'globalSearchContainer';
        searchContainer.innerHTML = `
            <div class="global-search-bar">
                <div class="search-input-container">
                    <input type="text" id="globalSearchInput" placeholder="Search professionals, services, or content..." autocomplete="off">
                    <button id="globalSearchBtn" onclick="finproSearch.performSearch(document.getElementById('globalSearchInput').value)">
                        <span>🔍</span>
                    </button>
                </div>
                <div id="searchSuggestions" class="search-suggestions"></div>
                <div id="searchResults" class="search-results"></div>
            </div>
        `;

        // Add styles
        const styles = `
            <style>
                .global-search-bar {
                    position: relative;
                    max-width: 600px;
                    margin: 0 auto;
                    z-index: 1000;
                }
                
                .search-input-container {
                    display: flex;
                    background: white;
                    border-radius: 25px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                
                #globalSearchInput {
                    flex: 1;
                    padding: 1rem 1.5rem;
                    border: none;
                    outline: none;
                    font-size: 1rem;
                    background: transparent;
                }
                
                #globalSearchBtn {
                    padding: 1rem 1.5rem;
                    background: #667eea;
                    border: none;
                    color: white;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                
                #globalSearchBtn:hover {
                    background: #5a6fd8;
                }
                
                .search-suggestions {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    border-radius: 0 0 15px 15px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    max-height: 300px;
                    overflow-y: auto;
                    display: none;
                    z-index: 1001;
                }
                
                .suggestion-item {
                    padding: 1rem 1.5rem;
                    cursor: pointer;
                    border-bottom: 1px solid #f0f0f0;
                    transition: background 0.3s;
                }
                
                .suggestion-item:hover {
                    background: #f8f9fa;
                }
                
                .suggestion-item:last-child {
                    border-bottom: none;
                }
                
                .suggestion-title {
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 0.25rem;
                }
                
                .suggestion-subtitle {
                    font-size: 0.9rem;
                    color: #666;
                }
                
                .search-results {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    border-radius: 0 0 15px 15px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    max-height: 400px;
                    overflow-y: auto;
                    display: none;
                    z-index: 1001;
                }
                
                .result-category {
                    padding: 1rem 1.5rem;
                    background: #f8f9fa;
                    font-weight: bold;
                    color: #667eea;
                    border-bottom: 1px solid #e9ecef;
                }
                
                .result-item {
                    padding: 1rem 1.5rem;
                    cursor: pointer;
                    border-bottom: 1px solid #f0f0f0;
                    transition: background 0.3s;
                }
                
                .result-item:hover {
                    background: #f8f9fa;
                }
                
                .result-item:last-child {
                    border-bottom: none;
                }
                
                .result-title {
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 0.25rem;
                }
                
                .result-description {
                    font-size: 0.9rem;
                    color: #666;
                    margin-bottom: 0.5rem;
                }
                
                .result-meta {
                    font-size: 0.8rem;
                    color: #999;
                }
                
                @media (max-width: 768px) {
                    .global-search-bar {
                        margin: 0 1rem;
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
        
        // Insert search bar into header
        const header = document.querySelector('header nav');
        if (header) {
            header.appendChild(searchContainer);
        }
    }

    handleSearch(query) {
        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }

        const suggestions = this.getSuggestions(query);
        this.showSuggestions(suggestions);
    }

    getSuggestions(query) {
        const suggestions = [];
        const queryLower = query.toLowerCase();

        // Search professionals
        this.searchData.professionals.forEach(prof => {
            if (prof.name.toLowerCase().includes(queryLower) || 
                prof.specialties.some(s => s.toLowerCase().includes(queryLower)) ||
                prof.location.toLowerCase().includes(queryLower)) {
                suggestions.push({
                    type: 'professional',
                    title: prof.name,
                    subtitle: `${prof.title} • ${prof.location}`,
                    data: prof
                });
            }
        });

        // Search services
        this.searchData.services.forEach(service => {
            if (service.name.toLowerCase().includes(queryLower) ||
                service.description.toLowerCase().includes(queryLower) ||
                service.features.some(f => f.toLowerCase().includes(queryLower))) {
                suggestions.push({
                    type: 'service',
                    title: service.name,
                    subtitle: `${service.description} • ${service.price}`,
                    data: service
                });
            }
        });

        // Search content
        this.searchData.content.forEach(content => {
            if (content.title.toLowerCase().includes(queryLower) ||
                content.content.toLowerCase().includes(queryLower)) {
                suggestions.push({
                    type: 'content',
                    title: content.title,
                    subtitle: content.content,
                    data: content
                });
            }
        });

        // Search FAQ
        this.searchData.faq.forEach(faq => {
            if (faq.question.toLowerCase().includes(queryLower) ||
                faq.answer.toLowerCase().includes(queryLower)) {
                suggestions.push({
                    type: 'faq',
                    title: faq.question,
                    subtitle: faq.answer,
                    data: faq
                });
            }
        });

        return suggestions.slice(0, 8); // Limit to 8 suggestions
    }

    showSuggestions(suggestions) {
        const container = document.getElementById('searchSuggestions');
        if (!container) return;

        if (suggestions.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item" onclick="finproSearch.selectSuggestion('${suggestion.type}', ${JSON.stringify(suggestion.data).replace(/"/g, '&quot;')})">
                <div class="suggestion-title">${suggestion.title}</div>
                <div class="suggestion-subtitle">${suggestion.subtitle}</div>
            </div>
        `).join('');

        container.style.display = 'block';
    }

    hideSuggestions() {
        const container = document.getElementById('searchSuggestions');
        if (container) {
            container.style.display = 'none';
        }
    }

    selectSuggestion(type, data) {
        this.hideSuggestions();
        
        // Track search selection
        this.trackSearchEvent('suggestion_selected', type, data.name || data.title);
        
        // Navigate based on type
        switch(type) {
            case 'professional':
                window.location.href = '/professionals';
                break;
            case 'service':
                window.location.href = '/services';
                break;
            case 'content':
                window.location.href = data.page;
                break;
            case 'faq':
                window.location.href = '/contact';
                break;
        }
    }

    performSearch(query) {
        if (!query.trim()) return;

        // Track search
        this.trackSearchEvent('search_performed', 'global', query);
        this.addToSearchHistory(query);

        // Hide suggestions
        this.hideSuggestions();

        // Perform comprehensive search
        const results = this.getComprehensiveResults(query);
        this.showSearchResults(results, query);
    }

    getComprehensiveResults(query) {
        const results = {
            professionals: [],
            services: [],
            content: [],
            faq: []
        };

        const queryLower = query.toLowerCase();

        // Search professionals
        results.professionals = this.searchData.professionals.filter(prof =>
            prof.name.toLowerCase().includes(queryLower) ||
            prof.specialties.some(s => s.toLowerCase().includes(queryLower)) ||
            prof.location.toLowerCase().includes(queryLower) ||
            prof.title.toLowerCase().includes(queryLower)
        );

        // Search services
        results.services = this.searchData.services.filter(service =>
            service.name.toLowerCase().includes(queryLower) ||
            service.description.toLowerCase().includes(queryLower) ||
            service.features.some(f => f.toLowerCase().includes(queryLower))
        );

        // Search content
        results.content = this.searchData.content.filter(content =>
            content.title.toLowerCase().includes(queryLower) ||
            content.content.toLowerCase().includes(queryLower)
        );

        // Search FAQ
        results.faq = this.searchData.faq.filter(faq =>
            faq.question.toLowerCase().includes(queryLower) ||
            faq.answer.toLowerCase().includes(queryLower)
        );

        return results;
    }

    showSearchResults(results, query) {
        const container = document.getElementById('searchResults');
        if (!container) return;

        let html = `<div class="result-category">Search Results for "${query}"</div>`;

        // Add professionals
        if (results.professionals.length > 0) {
            html += `<div class="result-category">Professionals (${results.professionals.length})</div>`;
            results.professionals.forEach(prof => {
                html += `
                    <div class="result-item" onclick="window.location.href='/professionals'">
                        <div class="result-title">${prof.name}</div>
                        <div class="result-description">${prof.title}</div>
                        <div class="result-meta">${prof.location} • ${prof.specialties.join(', ')}</div>
                    </div>
                `;
            });
        }

        // Add services
        if (results.services.length > 0) {
            html += `<div class="result-category">AI Solutions (${results.services.length})</div>`;
            results.services.forEach(service => {
                html += `
                    <div class="result-item" onclick="window.location.href='/services'">
                        <div class="result-title">${service.name}</div>
                        <div class="result-description">${service.description}</div>
                        <div class="result-meta">${service.price}</div>
                    </div>
                `;
            });
        }

        // Add content
        if (results.content.length > 0) {
            html += `<div class="result-category">Pages (${results.content.length})</div>`;
            results.content.forEach(content => {
                html += `
                    <div class="result-item" onclick="window.location.href='${content.page}'">
                        <div class="result-title">${content.title}</div>
                        <div class="result-description">${content.content}</div>
                        <div class="result-meta">${content.type}</div>
                    </div>
                `;
            });
        }

        // Add FAQ
        if (results.faq.length > 0) {
            html += `<div class="result-category">FAQ (${results.faq.length})</div>`;
            results.faq.forEach(faq => {
                html += `
                    <div class="result-item" onclick="window.location.href='/contact'">
                        <div class="result-title">${faq.question}</div>
                        <div class="result-description">${faq.answer}</div>
                        <div class="result-meta">${faq.category}</div>
                    </div>
                `;
            });
        }

        if (results.professionals.length === 0 && results.services.length === 0 && 
            results.content.length === 0 && results.faq.length === 0) {
            html += `<div class="result-item">No results found for "${query}"</div>`;
        }

        container.innerHTML = html;
        container.style.display = 'block';

        // Hide results when clicking outside
        setTimeout(() => {
            document.addEventListener('click', (e) => {
                if (!container.contains(e.target) && !document.getElementById('globalSearchInput').contains(e.target)) {
                    container.style.display = 'none';
                }
            });
        }, 100);
    }

    setupSearchSuggestions() {
        // Add search history suggestions
        const searchInput = document.getElementById('globalSearchInput');
        if (searchInput) {
            searchInput.addEventListener('focus', () => {
                if (this.searchHistory.length > 0) {
                    const historySuggestions = this.searchHistory.slice(0, 5).map(term => ({
                        type: 'history',
                        title: term,
                        subtitle: 'Recent search',
                        data: { term }
                    }));
                    this.showSuggestions(historySuggestions);
                }
            });
        }
    }

    addToSearchHistory(query) {
        // Remove if already exists
        this.searchHistory = this.searchHistory.filter(term => term !== query);
        // Add to beginning
        this.searchHistory.unshift(query);
        // Keep only last 10
        this.searchHistory = this.searchHistory.slice(0, 10);
        // Save to localStorage
        localStorage.setItem('finpro_search_history', JSON.stringify(this.searchHistory));
    }

    setupSearchAnalytics() {
        // Track search patterns and popular queries
        this.trackSearchEvent('search_system_loaded', 'system', '');
    }

    trackSearchEvent(action, category, query) {
        const event = {
            timestamp: new Date().toISOString(),
            action: action,
            category: category,
            query: query,
            page: window.location.pathname
        };

        // Store in analytics
        if (!this.searchAnalytics[action]) {
            this.searchAnalytics[action] = [];
        }
        this.searchAnalytics[action].push(event);

        // Keep only last 100 events per action
        this.searchAnalytics[action] = this.searchAnalytics[action].slice(-100);

        // Save to localStorage
        localStorage.setItem('finpro_search_analytics', JSON.stringify(this.searchAnalytics));

        // In production, this would send to analytics service
        console.log('Search Event:', event);
    }

    // Public methods for external use
    searchProfessionals(query) {
        return this.searchData.professionals.filter(prof =>
            prof.name.toLowerCase().includes(query.toLowerCase()) ||
            prof.specialties.some(s => s.toLowerCase().includes(query.toLowerCase())) ||
            prof.location.toLowerCase().includes(query.toLowerCase())
        );
    }

    searchServices(query) {
        return this.searchData.services.filter(service =>
            service.name.toLowerCase().includes(query.toLowerCase()) ||
            service.description.toLowerCase().includes(query.toLowerCase()) ||
            service.features.some(f => f.toLowerCase().includes(query.toLowerCase()))
        );
    }

    getSearchAnalytics() {
        return this.searchAnalytics;
    }

    clearSearchHistory() {
        this.searchHistory = [];
        localStorage.removeItem('finpro_search_history');
    }
}

// Initialize global search when DOM is loaded
let finproSearch;
document.addEventListener('DOMContentLoaded', function() {
    finproSearch = new FinProSearch();
});

// Export for use in other scripts
window.FinProSearch = FinProSearch;
window.finproSearch = finproSearch;
