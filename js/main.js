class MenuApp {
    constructor() {
        // Initialize DataManager with the global menuData object (from data.js)
        this.dataManager = new DataManager(menuData);
        this.renderer = new MenuRenderer(this.dataManager);
        this.cartManager = new CartManager();
        
        this.currentCategoryId = 'all';
        this.searchQuery = '';

        this.init();
    }

    init() {
        this.updateStaticTexts();
        this.setupEventListeners();
        this.setupCartEventListeners();
        this.render();
        this.updateCartUI();
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

        // Add to Cart delegated listener
        const menuContainer = document.getElementById('menu-container');
        if (menuContainer) {
            menuContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('.add-to-cart-btn');
                if (btn) {
                    const itemId = parseInt(btn.getAttribute('data-id'));
                    const item = this.dataManager.items.find(i => i.id === itemId);
                    if (item) {
                        this.cartManager.add(item);
                        this.updateCartUI();
                        
                        // Small animation on button
                        btn.classList.add('bg-brand-800', 'text-white');
                        setTimeout(() => btn.classList.remove('bg-brand-800', 'text-white'), 200);
                    }
                }
            });
        }
    }

    setupCartEventListeners() {
        const cartToggle = document.getElementById('cart-toggle-btn');
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.getElementById('cart-overlay');
        const closeCartBtn = document.getElementById('close-cart-btn');
        const checkoutBtn = document.getElementById('checkout-btn');

        const openCart = () => {
            cartOverlay.classList.remove('hidden');
            // small delay to allow display:block to apply before animating opacity
            setTimeout(() => cartOverlay.classList.remove('opacity-0'), 10);
            cartSidebar.classList.remove('translate-x-full');
        };

        const closeCart = () => {
            cartOverlay.classList.add('opacity-0');
            cartSidebar.classList.add('translate-x-full');
            setTimeout(() => cartOverlay.classList.add('hidden'), 300);
        };

        if (cartToggle) cartToggle.addEventListener('click', openCart);
        if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
        if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

        // Cart items delegated listener for +/-/remove
        const cartContainer = document.getElementById('cart-items-container');
        if (cartContainer) {
            cartContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('button');
                if (!btn) return;
                
                const id = parseInt(btn.getAttribute('data-id'));
                if (btn.classList.contains('increase-qty')) {
                    const item = this.cartManager.items.find(i => i.item.id === id);
                    this.cartManager.updateQuantity(id, item.quantity + 1);
                } else if (btn.classList.contains('decrease-qty')) {
                    const item = this.cartManager.items.find(i => i.item.id === id);
                    this.cartManager.updateQuantity(id, item.quantity - 1);
                } else if (btn.classList.contains('remove-item')) {
                    this.cartManager.remove(id);
                }
                this.updateCartUI();
            });
        }

        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.cartManager.items.length === 0) return;
                
                const t = translations[this.dataManager.currentLanguage] || translations['tr'];
                const tableStr = prompt(t.tablePrompt);
                
                if (tableStr !== null) { // if not cancelled
                    this.cartManager.submitOrder(tableStr || 'Bilinmiyor');
                    this.updateCartUI();
                    closeCart();
                    alert(t.orderSuccess);
                }
            });
        }
    }

    updateCartUI() {
        const badge = document.getElementById('cart-badge');
        const container = document.getElementById('cart-items-container');
        const totalPriceEl = document.getElementById('cart-total-price');
        const t = translations[this.dataManager.currentLanguage] || translations['tr'];
        const currency = this.dataManager.getCurrency();

        // Update badge
        const totalItems = this.cartManager.items.reduce((sum, i) => sum + i.quantity, 0);
        if (badge) {
            if (totalItems > 0) {
                badge.textContent = totalItems;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }

        // Update total
        if (totalPriceEl) {
            totalPriceEl.textContent = this.cartManager.getTotal() + currency;
        }

        // Render items
        if (container) {
            container.innerHTML = '';
            if (this.cartManager.items.length === 0) {
                container.innerHTML = `<p class="text-center text-brand-500 py-10">${t.emptyCart}</p>`;
                return;
            }

            this.cartManager.items.forEach(cartItem => {
                const div = document.createElement('div');
                div.className = 'flex gap-4 border border-brand-100 rounded-xl p-3 bg-white';
                div.innerHTML = `
                    <div class="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <img src="${cartItem.item.image}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1 flex flex-col justify-between">
                        <div class="flex justify-between items-start">
                            <h4 class="text-sm font-bold text-brand-900 leading-tight pr-2">${cartItem.item.name}</h4>
                            <button class="remove-item text-brand-500 hover:text-red-500 transition-colors" data-id="${cartItem.item.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div class="flex justify-between items-end mt-2">
                            <span class="font-semibold text-brand-500">${cartItem.item.price * cartItem.quantity}${currency}</span>
                            <div class="flex items-center gap-3 bg-brand-50 rounded-lg px-2 py-1">
                                <button class="decrease-qty text-brand-800 hover:text-brand-500 font-bold px-1" data-id="${cartItem.item.id}">-</button>
                                <span class="text-xs font-bold text-brand-900 w-3 text-center">${cartItem.quantity}</span>
                                <button class="increase-qty text-brand-800 hover:text-brand-500 font-bold px-1" data-id="${cartItem.item.id}">+</button>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(div);
            });
        }
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
        
        const topBarTexts = [
            document.getElementById('top-bar-text'),
            document.getElementById('top-bar-text-2'),
            document.getElementById('top-bar-text-3'),
            document.getElementById('top-bar-text-4')
        ];
        topBarTexts.forEach(el => {
            if (el) el.textContent = t.matchDayInfo;
        });

        // Cart texts
        const cartTitle = document.getElementById('cart-title');
        if (cartTitle) cartTitle.textContent = t.cartTitle;
        const cartTotalText = document.getElementById('cart-total-text');
        if (cartTotalText) cartTotalText.textContent = t.totalText;
        const checkoutBtnText = document.getElementById('checkout-btn-text');
        if (checkoutBtnText) checkoutBtnText.textContent = t.checkoutBtn;

        this.updateCartUI();

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
