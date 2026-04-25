class MenuApp {
    constructor() {
        // Initialize DataManager with the global menuData object (from data.js)
        this.dataManager = new DataManager(menuData);
        this.renderer = new MenuRenderer(this.dataManager);
        
        this.currentCategoryId = 'all';
        this.searchQuery = '';

        this.init();
    }

    init() {
        this.updateStaticTexts();
        this.setupEventListeners();
        this.render();
        
        // Show bottom bar after a short delay for a nice effect
        setTimeout(() => {
            const bottomBar = document.getElementById('bottom-bar');
            if(bottomBar) {
                bottomBar.classList.remove('translate-y-full');
            }
        }, 1000);
    }

    setupEventListeners() {
        // Language Switcher functionality
        const langToggleBtn = document.getElementById('lang-toggle-btn');
        const langDropdown = document.getElementById('lang-dropdown');
        const langOptions = document.querySelectorAll('.lang-option');

        if (langToggleBtn && langDropdown) {
            langToggleBtn.addEventListener('click', () => {
                const isHidden = langDropdown.classList.contains('opacity-0');
                if (isHidden) {
                    langDropdown.classList.remove('opacity-0', 'invisible', 'scale-95');
                    langDropdown.classList.add('opacity-100', 'visible', 'scale-100');
                } else {
                    langDropdown.classList.add('opacity-0', 'invisible', 'scale-95');
                    langDropdown.classList.remove('opacity-100', 'visible', 'scale-100');
                }
            });

            // Close when clicked outside
            document.addEventListener('click', (e) => {
                if (!langToggleBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                    langDropdown.classList.add('opacity-0', 'invisible', 'scale-95');
                    langDropdown.classList.remove('opacity-100', 'visible', 'scale-100');
                }
            });
        }

        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const lang = e.currentTarget.getAttribute('data-lang');
                this.changeLanguage(lang);
                langDropdown.classList.add('opacity-0', 'invisible', 'scale-95');
                langDropdown.classList.remove('opacity-100', 'visible', 'scale-100');
            });
        });

        // Search Toggle functionality
        const searchBtn = document.getElementById('search-toggle-btn');
        const searchContainer = document.getElementById('search-container');
        const searchInput = document.getElementById('search-input');

        if (searchBtn && searchContainer) {
            searchBtn.addEventListener('click', () => {
                searchContainer.classList.toggle('hidden');
                if (!searchContainer.classList.contains('hidden')) {
                    searchInput.focus();
                } else {
                    searchInput.value = '';
                    this.handleSearch('');
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Google Review Modal functionality
        const reviewBtn = document.getElementById('review-toggle-btn');
        const reviewModal = document.getElementById('review-modal');
        const closeReviewBtn = document.getElementById('close-review-modal');
        const reviewBackdrop = document.getElementById('review-backdrop');
        const reviewContent = document.getElementById('review-content');

        const openReviewModal = () => {
            reviewModal.classList.remove('hidden');
            reviewModal.classList.add('flex');
            // Animate in
            setTimeout(() => {
                reviewBackdrop.classList.remove('opacity-0');
                reviewContent.classList.remove('opacity-0', 'scale-95');
                reviewContent.classList.add('opacity-100', 'scale-100');
            }, 10);
        };

        const closeReviewModal = () => {
            // Animate out
            reviewBackdrop.classList.add('opacity-0');
            reviewContent.classList.remove('opacity-100', 'scale-100');
            reviewContent.classList.add('opacity-0', 'scale-95');
            
            setTimeout(() => {
                reviewModal.classList.add('hidden');
                reviewModal.classList.remove('flex');
            }, 300); // match transition duration
        };

        if (reviewBtn) reviewBtn.addEventListener('click', openReviewModal);
        if (closeReviewBtn) closeReviewBtn.addEventListener('click', closeReviewModal);
        if (reviewBackdrop) reviewBackdrop.addEventListener('click', closeReviewModal);
    }

    changeLanguage(lang) {
        if (this.dataManager.setLanguage(lang)) {
            this.updateStaticTexts();
            this.render();
        }
    }

    updateStaticTexts() {
        const lang = this.dataManager.currentLanguage;
        const t = translations[lang];
        if (!t) return;

        const flags = {
            'tr': '🇹🇷',
            'en': '🇬🇧',
            'ru': '🇷🇺'
        };

        const langToggleBtn = document.getElementById('lang-toggle-btn');
        if (langToggleBtn) {
            langToggleBtn.innerHTML = `<span class="text-lg leading-none">${flags[lang] || ''}</span> ${lang.toUpperCase()}`;
        }

        document.documentElement.lang = lang;

        const elFineDining = document.getElementById('fine-dining-text');
        if (elFineDining) elFineDining.textContent = t.fineDining;

        const elSearchInput = document.getElementById('search-input');
        if (elSearchInput) elSearchInput.placeholder = t.searchPlaceholder;

        const elReviewTitle = document.getElementById('review-title');
        if (elReviewTitle) elReviewTitle.textContent = t.reviewTitle;

        const elReviewDesc = document.getElementById('review-desc');
        if (elReviewDesc) elReviewDesc.textContent = t.reviewDesc;

        const elReviewBtnText = document.getElementById('review-btn-text');
        if (elReviewBtnText) elReviewBtnText.textContent = t.reviewBtn;
        
        // Also update category title placeholder if on 'all' and no search
        if (this.currentCategoryId === 'all' && (!this.searchQuery || this.searchQuery.trim() === '')) {
             if (this.renderer && this.renderer.categoryTitle) {
                 this.renderer.categoryTitle.textContent = t.menuTitle;
             }
        }
    }

    handleCategoryChange(categoryId) {
        if (this.currentCategoryId === categoryId) return;
        
        this.currentCategoryId = categoryId;
        this.render();
        
        // Scroll slightly down to focus on items (smooth scroll due to html class)
        if(!this.searchQuery) {
            const currentCategoryTitle = document.getElementById('current-category-title');
            const headerOffset = 170; // Height of sticky header
            const elementPosition = currentCategoryTitle.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                 top: offsetPosition,
                 behavior: "smooth"
            });
        }
    }

    handleSearch(query) {
        this.searchQuery = query;
        // Optionally reset category when searching globally
        // this.currentCategoryId = 'all'; 
        this.render();
    }

    render() {
        // 1. Update Categories UI
        this.renderer.renderCategories(this.currentCategoryId, (id) => this.handleCategoryChange(id));
        
        // 2. Fetch Items & Update Title
        let items = [];
        if (this.searchQuery && this.searchQuery.trim() !== '') {
            const t = translations[this.dataManager.currentLanguage];
            this.renderer.categoryTitle.textContent = t ? t.searchResultsFor.replace('{0}', this.searchQuery) : `"${this.searchQuery}" için sonuçlar`;
            items = this.dataManager.searchItems(this.searchQuery);
        } else {
            this.renderer.updateCategoryTitle(this.currentCategoryId);
            items = this.dataManager.getItemsByCategory(this.currentCategoryId);
        }
        
        // 3. Render Items
        this.renderer.renderItems(items);
    }
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new MenuApp();
});
