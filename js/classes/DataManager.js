class DataManager {
    constructor(data) {
        this.rawData = data;
        this.currentLanguage = localStorage.getItem('appLang') || 'tr';
        if (!this.rawData[this.currentLanguage]) {
            this.currentLanguage = 'tr';
        }
        this.loadLanguageData();
        this.currentCategory = 'all';
    }

    loadLanguageData() {
        const langData = this.rawData[this.currentLanguage];
        this.restaurant = langData.restaurant;
        this.categories = langData.categories;
        this.items = langData.items;
    }

    setLanguage(lang) {
        if (this.rawData[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('appLang', lang);
            this.loadLanguageData();
            return true;
        }
        return false;
    }

    getCategories() {
        return this.categories;
    }

    getItemsByCategory(categoryId) {
        if (categoryId === 'all') {
            return this.items;
        }
        return this.items.filter(item => item.categoryId === categoryId);
    }

    getCategoryName(categoryId) {
        const category = this.categories.find(c => c.id === categoryId);
        return category ? category.name : '';
    }

    getCurrency() {
        return this.restaurant.currency;
    }

    searchItems(query) {
        if (!query || query.trim() === '') {
            return this.getItemsByCategory(this.currentCategory);
        }
        
        const lowerQuery = query.toLowerCase().trim();
        return this.items.filter(item => 
            item.name.toLowerCase().includes(lowerQuery) || 
            item.description.toLowerCase().includes(lowerQuery)
        );
    }
}
