class DataManager {
    constructor(data) {
        this.restaurant = data.restaurant;
        this.categories = data.categories;
        this.items = data.items;
        this.currentCategory = 'all';
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
