// js/dashboard.js

// Hardcoded credentials for Demo/Local network scenario
const ADMIN_USER = 'admin';
const ADMIN_PASS = '1234'; // In a real scenario, this shouldn't be exposed on client side

document.addEventListener('DOMContentLoaded', () => {
    // Chart instances
    let revenueChartInst = null;
    let itemsChartInst = null;
    let hoursChartInst = null;

    // Menu Management
    const menuEditorContainer = document.getElementById('menu-editor-container');
    const saveMenuBtn = document.getElementById('save-menu-btn');
    let editableMenuData = null;

    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const logoutBtns = document.querySelectorAll('.logout-btn');
    const refreshBtn = document.getElementById('refresh-orders');
    
    const pendingContainer = document.getElementById('pending-container');
    const completedContainer = document.getElementById('completed-container');
    const cancelledContainer = document.getElementById('cancelled-container');
    const pageTitle = document.getElementById('page-title');
    
    // Stats Elements
    const statRevenue = document.getElementById('stat-total-revenue');
    const statOrders = document.getElementById('stat-total-orders');
    const statToday = document.getElementById('stat-today-orders');

    // Sidebar Nav
    const navBtns = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.dashboard-page');

    // Check if already logged in via sessionStorage
    if (sessionStorage.getItem('dashboard_auth') === 'true') {
        showDashboard();
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        if (user === ADMIN_USER && pass === ADMIN_PASS) {
            sessionStorage.setItem('dashboard_auth', 'true');
            showDashboard();
        } else {
            loginError.classList.remove('hidden');
        }
    });

    logoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sessionStorage.removeItem('dashboard_auth');
            dashboardView.classList.add('hidden');
            dashboardView.classList.remove('flex');
            loginView.classList.remove('hidden');
            loginView.classList.add('flex');
            document.getElementById('password').value = '';
            loginError.classList.add('hidden');
        });
    });

    refreshBtn.addEventListener('click', loadOrders);

    // Navigation
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.currentTarget.getAttribute('data-target');
            const title = e.currentTarget.getAttribute('data-title');
            
            // Update active state
            navBtns.forEach(b => {
                b.classList.remove('active', 'text-brand-900', 'bg-brand-50');
                b.classList.add('text-brand-800');
            });
            e.currentTarget.classList.add('active', 'text-brand-900', 'bg-brand-50');
            e.currentTarget.classList.remove('text-brand-800');

            // Show target page
            pages.forEach(p => {
                p.classList.remove('block');
                p.classList.add('hidden');
            });
            document.getElementById(targetId).classList.remove('hidden');
            document.getElementById(targetId).classList.add('block');
            
            pageTitle.textContent = title;
        });
    });

    function showDashboard() {
        loginView.classList.add('hidden');
        loginView.classList.remove('flex');
        dashboardView.classList.remove('hidden');
        dashboardView.classList.add('flex');
        loadOrders();
        loadMenuEditor();
    }

    function generateOrderCard(order) {
        const date = new Date(order.date);
        const timeString = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        
        let itemsHtml = '';
        order.items.forEach(i => {
            itemsHtml += `<div class="flex justify-between text-sm mb-1"><span class="text-brand-800">${i.quantity}x ${i.item.name}</span><span class="text-brand-500 font-medium">${i.item.price * i.quantity}₺</span></div>`;
        });

        const isCompleted = order.status === 'completed';
        const isCancelled = order.status === 'cancelled';
        
        let cardStyle = 'border-brand-100 bg-white';
        let badgeStyle = 'bg-brand-100 text-brand-800';
        let badgeText = 'Bekliyor';
        
        if (isCompleted) {
            cardStyle = 'border-green-200 bg-green-50/30';
            badgeStyle = 'bg-green-100 text-green-700';
            badgeText = 'Tamamlandı';
        } else if (isCancelled) {
            cardStyle = 'border-red-200 bg-red-50/30';
            badgeStyle = 'bg-red-100 text-red-700';
            badgeText = 'İptal Edildi';
        }

        const card = document.createElement('div');
        card.className = `p-5 rounded-2xl border shadow-sm ${cardStyle}`;
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4 border-b border-brand-100 pb-3">
                <div>
                    <h3 class="font-bold text-brand-900">Masa ${order.table}</h3>
                    <p class="text-xs text-brand-500">ID: ${order.id}</p>
                </div>
                <div class="text-right">
                    <p class="text-sm font-semibold text-brand-900">${timeString}</p>
                    <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${badgeStyle}">
                        ${badgeText}
                    </span>
                </div>
            </div>
            <div class="mb-4">
                ${itemsHtml}
            </div>
            <div class="flex justify-between items-center mt-4 pt-3 border-t border-brand-100">
                <span class="font-bold text-brand-900">Toplam: ${order.total}₺</span>
                ${(!isCompleted && !isCancelled) ? `
                    <div class="flex gap-2">
                        <button class="cancel-btn bg-white border border-red-200 text-red-500 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors" data-id="${order.id}">İptal</button>
                        <button class="complete-btn bg-brand-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-brand-800 transition-colors" data-id="${order.id}">Tamamla</button>
                    </div>
                ` : ''}
            </div>
        `;
        return card;
    }

    function loadOrders() {
        pendingContainer.innerHTML = '';
        completedContainer.innerHTML = '';
        if(cancelledContainer) cancelledContainer.innerHTML = '';
        
        const savedOrders = localStorage.getItem('qr_menu_orders');
        let orders = [];
        if (savedOrders && savedOrders !== 'undefined') {
            try {
                orders = JSON.parse(savedOrders);
                if (!Array.isArray(orders)) orders = [];
            } catch(e) {
                console.warn("Corrupt orders data, resetting.");
                localStorage.removeItem('qr_menu_orders');
                orders = [];
            }
        }

        // Sort by date descending
        orders.sort((a, b) => new Date(b.date) - new Date(a.date));

        const pendingOrders = orders.filter(o => o.status === 'pending');
        const completedOrders = orders.filter(o => o.status === 'completed');
        const cancelledOrders = orders.filter(o => o.status === 'cancelled');

        // Render Pending
        if (pendingOrders.length === 0) {
            pendingContainer.innerHTML = `<div class="col-span-full text-center text-brand-500 py-10">Bekleyen sipariş yok.</div>`;
        } else {
            pendingOrders.forEach(o => pendingContainer.appendChild(generateOrderCard(o)));
        }

        // Render Completed
        if (completedOrders.length === 0) {
            completedContainer.innerHTML = `<div class="col-span-full text-center text-brand-500 py-10">Tamamlanan sipariş yok.</div>`;
        } else {
            completedOrders.forEach(o => completedContainer.appendChild(generateOrderCard(o)));
        }

        // Render Cancelled
        if (cancelledContainer) {
            if (cancelledOrders.length === 0) {
                cancelledContainer.innerHTML = `<div class="col-span-full text-center text-brand-500 py-10">İptal edilen sipariş yok.</div>`;
            } else {
                cancelledOrders.forEach(o => cancelledContainer.appendChild(generateOrderCard(o)));
            }
        }

        // Add event listeners to complete buttons
        document.querySelectorAll('.complete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                updateOrderStatus(id, 'completed');
            });
        });

        // Add event listeners to cancel buttons
        document.querySelectorAll('.cancel-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if(confirm("Bu siparişi iptal etmek istediğinize emin misiniz?")) {
                    const id = e.target.getAttribute('data-id');
                    updateOrderStatus(id, 'cancelled');
                }
            });
        });

        // Calculate Stats
        let totalRevenue = 0;
        let todayOrders = 0;
        const todayStr = new Date().toDateString();

        orders.forEach(o => {
            if (o.status === 'completed') {
                totalRevenue += o.total;
            }
            if (new Date(o.date).toDateString() === todayStr) {
                todayOrders++;
            }
        });

        statRevenue.textContent = totalRevenue + '₺';
        statOrders.textContent = orders.length;
        statToday.textContent = todayOrders;

        // Render Charts
        renderCharts(orders);
    }

    function renderCharts(orders) {
        if (!window.Chart) return;

        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.color = '#4a3f35'; // brand-800

        // 1. Revenue Last 7 Days (Only completed orders)
        const revenueData = {};
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
            revenueData[dateStr] = 0;
        }

        orders.filter(o => o.status === 'completed').forEach(o => {
            const dateStr = new Date(o.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
            if (revenueData[dateStr] !== undefined) {
                revenueData[dateStr] += o.total;
            }
        });

        const revCtx = document.getElementById('revenueChart').getContext('2d');
        if (revenueChartInst) revenueChartInst.destroy();
        revenueChartInst = new Chart(revCtx, {
            type: 'line',
            data: {
                labels: Object.keys(revenueData),
                datasets: [{
                    label: 'Günlük Kazanç (₺)',
                    data: Object.values(revenueData),
                    borderColor: '#b89876', // brand-500
                    backgroundColor: 'rgba(184, 152, 118, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#b89876'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { borderDash: [5, 5] } },
                    x: { grid: { display: false } }
                }
            }
        });

        // 2. Top Selling Items
        const itemCounts = {};
        orders.forEach(o => {
            o.items.forEach(i => {
                itemCounts[i.item.name] = (itemCounts[i.item.name] || 0) + i.quantity;
            });
        });

        const sortedItems = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
        const itemLabels = sortedItems.map(i => i[0]);
        const itemData = sortedItems.map(i => i[1]);

        const itemsCtx = document.getElementById('itemsChart').getContext('2d');
        if (itemsChartInst) itemsChartInst.destroy();
        
        itemsChartInst = new Chart(itemsCtx, {
            type: 'doughnut',
            data: {
                labels: itemLabels,
                datasets: [{
                    data: itemData,
                    backgroundColor: ['#b89876', '#4a3f35', '#1a1816', '#f0ece3', '#d9cdb8'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { boxWidth: 12 } }
                },
                cutout: '70%'
            }
        });

        // 3. Peak Hours
        const hourCounts = Array(24).fill(0);
        orders.forEach(o => {
            const hour = new Date(o.date).getHours();
            hourCounts[hour]++;
        });

        // Filter out empty hours for a cleaner chart, or just show 08:00 to 23:00
        const displayHours = [];
        const displayData = [];
        for (let i = 8; i <= 23; i++) {
            displayHours.push(i.toString().padStart(2, '0') + ':00');
            displayData.push(hourCounts[i]);
        }

        const hoursCtx = document.getElementById('hoursChart').getContext('2d');
        if (hoursChartInst) hoursChartInst.destroy();
        hoursChartInst = new Chart(hoursCtx, {
            type: 'bar',
            data: {
                labels: displayHours,
                datasets: [{
                    label: 'Sipariş Sayısı',
                    data: displayData,
                    backgroundColor: '#4a3f35',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, ticks: { stepSize: 1 } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    function updateOrderStatus(id, newStatus) {
        const savedOrders = localStorage.getItem('qr_menu_orders');
        if (savedOrders && savedOrders !== 'undefined') {
            try {
                let orders = JSON.parse(savedOrders);
                if (Array.isArray(orders)) {
                    const order = orders.find(o => o.id === id);
                    if (order) {
                        order.status = newStatus;
                        localStorage.setItem('qr_menu_orders', JSON.stringify(orders));
                        loadOrders(); // reload
                    }
                }
            } catch(e) {
                console.error("Corrupt orders data during update.");
            }
        }
    }

    // --- Menu Management ---

    function loadMenuEditor() {
        if (!menuEditorContainer) return;
        
        try {
            // Try to load custom data first, fallback to original data.js
            const customData = localStorage.getItem('qr_menu_custom_data');
            
            // Check if customData exists and is not the string 'undefined' or '[object Object]'
            if (customData && typeof customData === 'string' && customData !== 'undefined' && customData.trim() !== '') {
                try {
                    editableMenuData = JSON.parse(customData);
                } catch(e) {
                    console.warn("Could not parse custom menu data, reverting to original.");
                    localStorage.removeItem('qr_menu_custom_data');
                    editableMenuData = JSON.parse(JSON.stringify(menuData));
                }
            } else {
                // Deep copy of global menuData
                editableMenuData = JSON.parse(JSON.stringify(window.menuData || menuData));
            }

            renderMenuEditor();
        } catch (error) {
            console.error("Critical error in loadMenuEditor:", error);
            // Emergency fallback
            if (window.menuData || typeof menuData !== 'undefined') {
                editableMenuData = JSON.parse(JSON.stringify(window.menuData || menuData));
                try { renderMenuEditor(); } catch(e) {}
            }
        }
    }

    function renderMenuEditor() {
        menuEditorContainer.innerHTML = '';
        
        // Ultimate hard-reset if data is missing
        if (!editableMenuData || !editableMenuData.tr || !editableMenuData.tr.items) {
            console.error("Veri yapisi bozuk. data.js uzerinden sifirlaniyor...");
            localStorage.removeItem('qr_menu_custom_data');
            try {
                // Accessing the globally available menuData from data.js
                editableMenuData = JSON.parse(JSON.stringify(window.menuData || menuData));
            } catch(e) {
                console.error("data.js okunamadi:", e);
                return;
            }
        }
        
        // Use 'tr' items as the base for editing
        const items = editableMenuData.tr.items;
        
        if (!items || items.length === 0) {
            menuEditorContainer.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-red-500">Ürün bulunamadı. Lütfen sayfayı yenileyin veya veriyi sıfırlayın.</td></tr>';
            return;
        }
        
        items.forEach(item => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-brand-50/50 transition-colors';
            
            tr.innerHTML = `
                <td class="p-4">
                    <div class="w-12 h-12 rounded-lg bg-cover bg-center border border-brand-100" style="background-image: url('${item.image}')"></div>
                </td>
                <td class="p-4">
                    <input type="text" class="w-full px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-500 text-sm menu-edit-name" data-id="${item.id}" value="${item.name}">
                </td>
                <td class="p-4">
                    <span class="px-2 py-1 bg-brand-100 text-brand-700 rounded-md text-xs font-medium">${editableMenuData.tr.categories.find(c => c.id === item.categoryId)?.name || item.categoryId}</span>
                </td>
                <td class="p-4">
                    <div class="relative">
                        <input type="number" class="w-24 pl-3 pr-8 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-500 text-sm font-medium text-brand-900 menu-edit-price" data-id="${item.id}" value="${item.price}">
                        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-brand-500 font-medium text-sm">₺</span>
                    </div>
                </td>
            `;
            menuEditorContainer.appendChild(tr);
        });
    }

    if (saveMenuBtn) {
        saveMenuBtn.addEventListener('click', () => {
            try {
                if (!editableMenuData) {
                    editableMenuData = JSON.parse(JSON.stringify(window.menuData || menuData));
                }

                // Collect all inputs
                const nameInputs = document.querySelectorAll('.menu-edit-name');
                const priceInputs = document.querySelectorAll('.menu-edit-price');
                
                const nameMap = {};
                const priceMap = {};
                
                nameInputs.forEach(inp => nameMap[inp.getAttribute('data-id')] = inp.value);
                priceInputs.forEach(inp => priceMap[inp.getAttribute('data-id')] = parseFloat(inp.value));

                // Apply updates to ALL languages (prices are global, names we just update TR for now)
                ['tr', 'en', 'ru'].forEach(lang => {
                    if (editableMenuData[lang] && editableMenuData[lang].items) {
                        editableMenuData[lang].items.forEach(item => {
                            if (priceMap[item.id] !== undefined && !isNaN(priceMap[item.id])) {
                                item.price = priceMap[item.id];
                            }
                            if (lang === 'tr' && nameMap[item.id]) {
                                item.name = nameMap[item.id];
                            }
                        });
                    }
                });

                // Save to localStorage
                localStorage.setItem('qr_menu_custom_data', JSON.stringify(editableMenuData));
                
                saveMenuBtn.textContent = 'Kaydedildi ✔';
                saveMenuBtn.classList.remove('bg-brand-900', 'hover:bg-brand-800');
                saveMenuBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                
                // Show standard browser alert for clarity
                alert("Menü başarıyla güncellendi! Ana menüde (index.html) yeni fiyatları görmek için sayfayı yenileyebilirsiniz.");

                setTimeout(() => {
                    saveMenuBtn.textContent = 'Tümünü Kaydet';
                    saveMenuBtn.classList.add('bg-brand-900', 'hover:bg-brand-800');
                    saveMenuBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                }, 3000);

            } catch (err) {
                console.error("Kaydetme sirasinda hata: ", err);
                alert("Kaydetme sırasında bir hata oluştu. Lütfen sayfayı yenileyip tekrar deneyin.");
            }
        });
    }
});
