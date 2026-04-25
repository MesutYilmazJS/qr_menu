class MenuRenderer {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.categoryContainer = document.getElementById('category-container');
        this.menuContainer = document.getElementById('menu-container');
        this.categoryTitle = document.getElementById('current-category-title');
    }

    renderCategories(activeCategoryId, onCategoryClick) {
        this.categoryContainer.innerHTML = '';
        const categories = this.dataManager.getCategories();

        categories.forEach(category => {
            const isActive = category.id === activeCategoryId;
            const button = document.createElement('button');
            
            // Tailwind classes for category pills
            button.className = `category-pill whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                isActive 
                ? 'bg-brand-900 text-white border-brand-900' 
                : 'bg-white text-brand-800 border-brand-100 hover:border-brand-500'
            }`;
            button.textContent = category.name;
            
            button.addEventListener('click', () => onCategoryClick(category.id));
            
            this.categoryContainer.appendChild(button);
        });
    }

    renderItems(items) {
        this.menuContainer.innerHTML = '';
        const currency = this.dataManager.getCurrency();

        if (items.length === 0) {
            const lang = this.dataManager.currentLanguage;
            const t = translations[lang] || translations['tr'];
            this.menuContainer.innerHTML = `<p class="text-center text-brand-500 py-10">${t.noItemsFound}</p>`;
            return;
        }

        items.forEach(item => {
            const card = document.createElement('article');
            card.className = 'menu-card bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-100 flex flex-col h-full';
            
            let badgesHtml = '';
            if (item.badges && item.badges.length > 0) {
                badgesHtml = '<div class="absolute top-3 left-3 flex flex-col gap-1 z-10">';
                item.badges.forEach(badge => {
                    badgesHtml += `<span class="bg-brand-500 text-white shadow-md shadow-brand-900/10 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">${badge}</span>`;
                });
                badgesHtml += '</div>';
            }

            card.innerHTML = `
                <div class="relative h-56 shrink-0 w-full overflow-hidden">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover img-loading hover:scale-105 transition-transform duration-500" onload="this.classList.add('img-loaded'); this.classList.remove('img-loading');" loading="lazy">
                    ${badgesHtml}
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <div class="flex justify-between items-start mb-3 gap-4">
                        <h3 class="text-lg font-serif font-bold text-brand-900 leading-tight">${item.name}</h3>
                        <span class="text-lg font-semibold text-brand-500 shrink-0">${item.price}${currency}</span>
                    </div>
                    <p class="text-sm text-brand-800/70 leading-relaxed mb-6 flex-grow">${item.description}</p>
                    
                    <!-- Decorative line & Action (Optional) -->
                    <div class="mt-auto flex items-center justify-between">
                        <div class="w-12 h-[1px] bg-brand-100"></div>
                        <span class="text-[10px] uppercase tracking-widest text-brand-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">${(translations[this.dataManager.currentLanguage] || translations['tr']).inspectText}</span>
                    </div>
                </div>
            `;
            this.menuContainer.appendChild(card);
        });
    }

    updateCategoryTitle(categoryId) {
        this.categoryTitle.textContent = this.dataManager.getCategoryName(categoryId);
    }
}
