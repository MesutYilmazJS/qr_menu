class CartManager {
    constructor() {
        this.items = []; // { item, quantity }
        this.loadCart();
    }

    add(item) {
        const existing = this.items.find(i => i.item.id === item.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.items.push({ item, quantity: 1 });
        }
        this.saveCart();
        return this.items;
    }

    remove(itemId) {
        this.items = this.items.filter(i => i.item.id !== itemId);
        this.saveCart();
        return this.items;
    }
    
    updateQuantity(itemId, quantity) {
        const existing = this.items.find(i => i.item.id === itemId);
        if (existing) {
            if (quantity <= 0) {
                this.remove(itemId);
            } else {
                existing.quantity = quantity;
            }
        }
        this.saveCart();
        return this.items;
    }

    clear() {
        this.items = [];
        this.saveCart();
    }

    getTotal() {
        return this.items.reduce((total, i) => total + (i.item.price * i.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('qr_menu_cart', JSON.stringify(this.items));
    }

    loadCart() {
        const saved = localStorage.getItem('qr_menu_cart');
        if (saved) {
            this.items = JSON.parse(saved);
        }
    }

    // Submit order saves to a "global" orders array in localStorage to simulate sending to dashboard
    submitOrder(tableNumber) {
        if (this.items.length === 0) return false;
        
        const newOrder = {
            id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            items: this.items,
            total: this.getTotal(),
            table: tableNumber || 'Bilinmiyor',
            date: new Date().toISOString(),
            status: 'pending' // pending, completed
        };

        let orders = [];
        const savedOrders = localStorage.getItem('qr_menu_orders');
        if (savedOrders) {
            orders = JSON.parse(savedOrders);
        }
        orders.push(newOrder);
        localStorage.setItem('qr_menu_orders', JSON.stringify(orders));

        this.clear();
        return newOrder;
    }
}
