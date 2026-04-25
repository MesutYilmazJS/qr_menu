const menuData = {
    tr: {
        restaurant: { name: "La Brasserie", currency: "₺" },
        categories: [
            { id: "all", name: "Tümü" },
            { id: "starters", name: "Başlangıçlar" },
            { id: "mains", name: "Ana Yemekler" },
            { id: "desserts", name: "Tatlılar" },
            { id: "drinks", name: "İçecekler" }
        ],
        items: [
            {
                id: 1, categoryId: "mains", name: "Gurme Wagyu Burger",
                description: "Karamelize soğan, cheddar, trüf mayonez ve ev yapımı brioche ekmeği ile.",
                price: 450, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1500&auto=format&fit=crop",
                badges: ["Şefin Tavsiyesi"]
            },
            {
                id: 2, categoryId: "mains", name: "Fırınlanmış Somon",
                description: "Kuşkonmaz, taze patates ve limonlu tereyağı sosu eşliğinde.",
                price: 620, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1500&auto=format&fit=crop",
                badges: []
            },
            {
                id: 3, categoryId: "starters", name: "Burrata Salatası",
                description: "Taze burrata peyniri, çeri domatesler, fesleğen yağı ve balzamik sır.",
                price: 280, image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=1500&auto=format&fit=crop",
                badges: ["Yeni", "Vejetaryen"]
            },
            {
                id: 4, categoryId: "desserts", name: "Çikolatalı Volkan",
                description: "İçi akışkan Belçika çikolatası, vanilyalı dondurma ile.",
                price: 210, image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1500&auto=format&fit=crop",
                badges: []
            },
            {
                id: 5, categoryId: "drinks", name: "Orman Meyveli Mocktail",
                description: "Taze orman meyveleri, lime, nane ve soda.",
                price: 150, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1500&auto=format&fit=crop",
                badges: ["Ferahlatıcı"]
            },
            {
                id: 6, categoryId: "starters", name: "Dana Carpaccio",
                description: "İnce dilimlenmiş dana eti, parmesan, roka ve sızma zeytinyağı.",
                price: 350, image: "https://images.unsplash.com/photo-1544372559-994c6579fc70?q=80&w=1500&auto=format&fit=crop",
                badges: ["Şefin Seçimi"]
            },
            {
                id: 7, categoryId: "starters", name: "Trüflü Patates Kızartması",
                description: "Çıtır patates, trüf yağı, parmesan rendesi ve taze maydanoz.",
                price: 180, image: "https://images.unsplash.com/photo-1576107248882-e3d64024b806?q=80&w=1500&auto=format&fit=crop",
                badges: []
            },
            {
                id: 8, categoryId: "mains", name: "Antrikot Izgara",
                description: "28 gün dinlendirilmiş 300g antrikot, fırın patates ve chimichurri sos.",
                price: 850, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1500&auto=format&fit=crop",
                badges: ["Özel İmza"]
            },
            {
                id: 9, categoryId: "mains", name: "Trüf Mantarlı Risotto",
                description: "Arborio pirinci, taze siyah trüf, porçini mantarı ve mascarpone peyniri.",
                price: 480, image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7cf?q=80&w=1500&auto=format&fit=crop",
                badges: ["Vejetaryen"]
            },
            {
                id: 10, categoryId: "desserts", name: "Klasik Tiramisu",
                description: "İtalyan mascarpone peyniri, espresso ve savoiardi kedi dili.",
                price: 240, image: "https://images.unsplash.com/photo-1571115177098-24c42de1bd0f?q=80&w=1500&auto=format&fit=crop",
                badges: ["En Çok Satan"]
            },
            {
                id: 11, categoryId: "drinks", name: "İmza Old Fashioned",
                description: "Bourbon viski, angostura bitter, portakal kabuğu ve esmer şeker.",
                price: 320, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1500&auto=format&fit=crop",
                badges: []
            },
            {
                id: 12, categoryId: "drinks", name: "Klasik Negroni",
                description: "Cin, Campari, tatlı vermut ve portakal dilimi.",
                price: 290, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1500&auto=format&fit=crop",
                badges: ["Klasik"]
            },
            {
                id: 13, categoryId: "drinks", name: "Taze Naneli Limonata",
                description: "Günlük sıkım limon, taze nane yaprakları ve hafif agave şurubu.",
                price: 110, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1500&auto=format&fit=crop",
                badges: ["Ferahlatıcı", "Alkolsüz"]
            },
            {
                id: 14, categoryId: "drinks", name: "Château Margaux Kırmızı Şarap (Kadeh)",
                description: "Zengin orman meyveleri aromalı, gövdeli Fransız kırmızı şarabı.",
                price: 450, image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1500&auto=format&fit=crop",
                badges: ["Premium"]
            },
            {
                id: 15, categoryId: "drinks", name: "Artisan Flat White",
                description: "Etiyopya çekirdeklerinden çift shot espresso ve ipeksi süt köpüğü.",
                price: 120, image: "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?q=80&w=1500&auto=format&fit=crop",
                badges: []
            },
            {
                id: 16, categoryId: "drinks", name: "Matcha Latte",
                description: "Orijinal Japon matcha tozu, yulaf sütü ve hafif vanilya şurubu.",
                price: 140, image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=1500&auto=format&fit=crop",
                badges: ["Yeni"]
            }
        ]
    },
    en: {
        restaurant: { name: "La Brasserie", currency: "$" },
        categories: [
            { id: "all", name: "All" },
            { id: "starters", name: "Starters" },
            { id: "mains", name: "Mains" },
            { id: "desserts", name: "Desserts" },
            { id: "drinks", name: "Drinks" }
        ],
        items: [
            {
                id: 1, categoryId: "mains", name: "Gourmet Wagyu Burger",
                description: "With caramelized onions, cheddar, truffle mayo, and homemade brioche bun.",
                price: 15, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1500&auto=format&fit=crop",
                badges: ["Chef's Recommendation"]
            },
            {
                id: 2, categoryId: "mains", name: "Baked Salmon",
                description: "Accompanied by asparagus, baby potatoes, and lemon butter sauce.",
                price: 22, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1500&auto=format&fit=crop",
                badges: []
            },
            {
                id: 3, categoryId: "starters", name: "Burrata Salad",
                description: "Fresh burrata cheese, cherry tomatoes, basil oil, and balsamic glaze.",
                price: 10, image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=1500&auto=format&fit=crop",
                badges: ["New", "Vegetarian"]
            },
            {
                id: 4, categoryId: "desserts", name: "Chocolate Volcano",
                description: "Melted Belgian chocolate inside, with vanilla ice cream.",
                price: 8, image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1500&auto=format&fit=crop",
                badges: []
            },
            {
                id: 5, categoryId: "drinks", name: "Wild Berry Mocktail",
                description: "Fresh wild berries, lime, mint, and sparkling water.",
                price: 5, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1500&auto=format&fit=crop",
                badges: ["Refreshing"]
            },
            {
                id: 6, categoryId: "starters", name: "Beef Carpaccio",
                description: "Thinly sliced beef, parmesan, arugula, and extra virgin olive oil.",
                price: 12, image: "https://images.unsplash.com/photo-1544372559-994c6579fc70?q=80&w=1500&auto=format&fit=crop",
                badges: ["Chef's Choice"]
            },
            {
                id: 7, categoryId: "starters", name: "Truffle Fries",
                description: "Crispy fries, truffle oil, grated parmesan, and fresh parsley.",
                price: 6, image: "https://images.unsplash.com/photo-1576107248882-e3d64024b806?q=80&w=1500&auto=format&fit=crop",
                badges: []
            },
            {
                id: 8, categoryId: "mains", name: "Grilled Entrecôte",
                description: "28-day dry-aged 300g entrecôte, baked potato, and chimichurri sauce.",
                price: 30, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1500&auto=format&fit=crop",
                badges: ["Signature"]
            },
            {
                id: 9, categoryId: "mains", name: "Truffle Mushroom Risotto",
                description: "Arborio rice, fresh black truffle, porcini mushrooms, and mascarpone cheese.",
                price: 16, image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7cf?q=80&w=1500&auto=format&fit=crop",
                badges: ["Vegetarian"]
            },
            {
                id: 10, categoryId: "desserts", name: "Classic Tiramisu",
                description: "Italian mascarpone cheese, espresso, and savoiardi ladyfingers.",
                price: 9, image: "https://images.unsplash.com/photo-1571115177098-24c42de1bd0f?q=80&w=1500&auto=format&fit=crop",
                badges: ["Best Seller"]
            },
            {
                id: 11, categoryId: "drinks", name: "Signature Old Fashioned",
                description: "Bourbon whiskey, angostura bitters, orange peel, and brown sugar.",
                price: 12, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1500&auto=format&fit=crop",
                badges: []
            },
            {
                id: 12, categoryId: "drinks", name: "Classic Negroni",
                description: "Gin, Campari, sweet vermouth, and orange slice.",
                price: 10, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1500&auto=format&fit=crop",
                badges: ["Classic"]
            },
            {
                id: 13, categoryId: "drinks", name: "Fresh Mint Lemonade",
                description: "Freshly squeezed lemon, fresh mint leaves, and light agave syrup.",
                price: 4, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1500&auto=format&fit=crop",
                badges: ["Refreshing", "Non-Alcoholic"]
            },
            {
                id: 14, categoryId: "drinks", name: "Château Margaux Red Wine (Glass)",
                description: "Rich forest fruit aromas, full-bodied French red wine.",
                price: 16, image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1500&auto=format&fit=crop",
                badges: ["Premium"]
            },
            {
                id: 15, categoryId: "drinks", name: "Artisan Flat White",
                description: "Double shot espresso from Ethiopian beans and silky milk foam.",
                price: 4, image: "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?q=80&w=1500&auto=format&fit=crop",
                badges: []
            },
            {
                id: 16, categoryId: "drinks", name: "Matcha Latte",
                description: "Original Japanese matcha powder, oat milk, and light vanilla syrup.",
                price: 5, image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=1500&auto=format&fit=crop",
                badges: ["New"]
            }
        ]
    },
    ru: {
        restaurant: { name: "La Brasserie", currency: "₽" },
        categories: [
            { id: "all", name: "Все" },
            { id: "starters", name: "Закуски" },
            { id: "mains", name: "Основные блюда" },
            { id: "desserts", name: "Десерты" },
            { id: "drinks", name: "Напитки" }
        ],
        items: [
            {
                id: 1, categoryId: "mains", name: "Бургер Вагю Гурмэ",
                description: "С карамелизованным луком, чеддером, трюфельным майонезом и домашней булочкой бриошь.",
                price: 1300, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1500&auto=format&fit=crop",
                badges: ["Рекомендация шефа"]
            },
            {
                id: 2, categoryId: "mains", name: "Запеченный лосось",
                description: "Со спаржей, молодым картофелем и лимонно-масляным соусом.",
                price: 1800, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1500&auto=format&fit=crop",
                badges: []
            },
            {
                id: 3, categoryId: "starters", name: "Салат с бурратой",
                description: "Свежий сыр буррата, помидоры черри, базиликовое масло и бальзамическая глазурь.",
                price: 850, image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=1500&auto=format&fit=crop",
                badges: ["Новинка", "Вегетарианское"]
            },
            {
                id: 4, categoryId: "desserts", name: "Шоколадный вулкан",
                description: "С горячим бельгийским шоколадом внутри и ванильным мороженым.",
                price: 600, image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1500&auto=format&fit=crop",
                badges: []
            },
            {
                id: 5, categoryId: "drinks", name: "Ягодный моктейль",
                description: "Свежие лесные ягоды, лайм, мята и газированная вода.",
                price: 450, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1500&auto=format&fit=crop",
                badges: ["Освежающий"]
            },
            {
                id: 6, categoryId: "starters", name: "Карпаччо из говядины",
                description: "Тонко нарезанная говядина, пармезан, руккола и оливковое масло первого отжима.",
                price: 1000, image: "https://images.unsplash.com/photo-1544372559-994c6579fc70?q=80&w=1500&auto=format&fit=crop",
                badges: ["Выбор шефа"]
            },
            {
                id: 7, categoryId: "starters", name: "Картофель фри с трюфелем",
                description: "Хрустящий картофель, трюфельное масло, тертый пармезан и свежая петрушка.",
                price: 500, image: "https://images.unsplash.com/photo-1576107248882-e3d64024b806?q=80&w=1500&auto=format&fit=crop",
                badges: []
            },
            {
                id: 8, categoryId: "mains", name: "Антрекот на гриле",
                description: "Антрекот сухой выдержки (28 дней) 300г, запеченный картофель и соус чимичурри.",
                price: 2500, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1500&auto=format&fit=crop",
                badges: ["Фирменное блюдо"]
            },
            {
                id: 9, categoryId: "mains", name: "Ризотто с трюфелем и грибами",
                description: "Рис арборио, свежий черный трюфель, белые грибы и сыр маскарпоне.",
                price: 1400, image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7cf?q=80&w=1500&auto=format&fit=crop",
                badges: ["Вегетарианское"]
            },
            {
                id: 10, categoryId: "desserts", name: "Классический тирамису",
                description: "Итальянский сыр маскарпоне, эспрессо и печенье савоярди.",
                price: 700, image: "https://images.unsplash.com/photo-1571115177098-24c42de1bd0f?q=80&w=1500&auto=format&fit=crop",
                badges: ["Хит продаж"]
            },
            {
                id: 11, categoryId: "drinks", name: "Фирменный Олд Фешн",
                description: "Бурбон, биттер ангостура, цедра апельсина и коричневый сахар.",
                price: 950, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1500&auto=format&fit=crop",
                badges: []
            },
            {
                id: 12, categoryId: "drinks", name: "Классический Негрони",
                description: "Джин, Кампари, сладкий вермут и ломтик апельсина.",
                price: 850, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1500&auto=format&fit=crop",
                badges: ["Классика"]
            },
            {
                id: 13, categoryId: "drinks", name: "Свежий мятный лимонад",
                description: "Свежевыжатый лимон, свежие листья мяты и легкий сироп агавы.",
                price: 350, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1500&auto=format&fit=crop",
                badges: ["Освежающий", "Безалкогольный"]
            },
            {
                id: 14, categoryId: "drinks", name: "Красное вино Château Margaux (бокал)",
                description: "Насыщенное французское красное вино с богатым ароматом лесных ягод.",
                price: 1300, image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1500&auto=format&fit=crop",
                badges: ["Премиум"]
            },
            {
                id: 15, categoryId: "drinks", name: "Флэт Уайт",
                description: "Двойной эспрессо из эфиопских зерен и шелковистая молочная пенка.",
                price: 350, image: "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?q=80&w=1500&auto=format&fit=crop",
                badges: []
            },
            {
                id: 16, categoryId: "drinks", name: "Матча Латте",
                description: "Оригинальный японский порошок матча, овсяное молоко и легкий ванильный сироп.",
                price: 400, image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=1500&auto=format&fit=crop",
                badges: ["Новинка"]
            }
        ]
    }
};

const translations = {
    tr: {
        fineDining: "Fine Dining",
        searchPlaceholder: "Menüde arayın...",
        menuTitle: "Menü",
        reviewTitle: "Deneyiminizi Paylaşın",
        reviewDesc: "La Brasserie'deki deneyiminiz nasıldı? Google'da bize vereceğiniz 5 yıldızla büyümeye devam ediyoruz.",
        reviewBtn: "Google'da Puan Ver",
        searchResultsFor: '"{0}" için sonuçlar',
        noItemsFound: "Bu kategoride henüz ürün bulunmamaktadır.",
        inspectText: "İncele",
        matchDayInfo: "Maç Günü +290 ₺"
    },
    en: {
        fineDining: "Fine Dining",
        searchPlaceholder: "Search the menu...",
        menuTitle: "Menu",
        reviewTitle: "Share Your Experience",
        reviewDesc: "How was your experience at La Brasserie? We continue to grow with your 5-star ratings on Google.",
        reviewBtn: "Rate on Google",
        searchResultsFor: 'Results for "{0}"',
        noItemsFound: "There are no items in this category yet.",
        inspectText: "Inspect",
        matchDayInfo: "Match Day +290 ₺"
    },
    ru: {
        fineDining: "Высокая кухня",
        searchPlaceholder: "Поиск по меню...",
        menuTitle: "Меню",
        reviewTitle: "Поделитесь впечатлениями",
        reviewDesc: "Как вам понравилось в La Brasserie? Мы продолжаем расти благодаря вашим 5-звездочным отзывам в Google.",
        reviewBtn: "Оценить в Google",
        searchResultsFor: 'Результаты для "{0}"',
        noItemsFound: "В этой категории пока нет товаров.",
        inspectText: "Изучить",
        matchDayInfo: "День матча +290 ₺"
    }
};
