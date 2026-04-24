const menuData = {
    restaurant: {
        name: "La Brasserie",
        currency: "₺"
    },
    categories: [
        { id: "all", name: "Tümü" },
        { id: "starters", name: "Başlangıçlar" },
        { id: "mains", name: "Ana Yemekler" },
        { id: "desserts", name: "Tatlılar" },
        { id: "drinks", name: "İçecekler" }
    ],
    items: [
        {
            id: 1,
            categoryId: "mains",
            name: "Gurme Wagyu Burger",
            description: "Karamelize soğan, cheddar, trüf mayonez ve ev yapımı brioche ekmeği ile.",
            price: 450,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1500&auto=format&fit=crop",
            badges: ["Şefin Tavsiyesi"]
        },
        {
            id: 2,
            categoryId: "mains",
            name: "Fırınlanmış Somon",
            description: "Kuşkonmaz, taze patates ve limonlu tereyağı sosu eşliğinde.",
            price: 620,
            image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1500&auto=format&fit=crop",
            badges: []
        },
        {
            id: 3,
            categoryId: "starters",
            name: "Burrata Salatası",
            description: "Taze burrata peyniri, çeri domatesler, fesleğen yağı ve balzamik sır.",
            price: 280,
            image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=1500&auto=format&fit=crop",
            badges: ["Yeni", "Vejetaryen"]
        },
        {
            id: 4,
            categoryId: "desserts",
            name: "Çikolatalı Volkan",
            description: "İçi akışkan Belçika çikolatası, vanilyalı dondurma ile.",
            price: 210,
            image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1500&auto=format&fit=crop",
            badges: []
        },
        {
            id: 5,
            categoryId: "drinks",
            name: "Orman Meyveli Mocktail",
            description: "Taze orman meyveleri, lime, nane ve soda.",
            price: 150,
            image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1500&auto=format&fit=crop",
            badges: ["Ferahlatıcı"]
        },
        {
            id: 6,
            categoryId: "starters",
            name: "Dana Carpaccio",
            description: "İnce dilimlenmiş dana eti, parmesan, roka ve sızma zeytinyağı.",
            price: 350,
            image: "https://images.unsplash.com/photo-1544372559-994c6579fc70?q=80&w=1500&auto=format&fit=crop",
            badges: ["Şefin Seçimi"]
        },
        {
            id: 7,
            categoryId: "starters",
            name: "Trüflü Patates Kızartması",
            description: "Çıtır patates, trüf yağı, parmesan rendesi ve taze maydanoz.",
            price: 180,
            image: "https://images.unsplash.com/photo-1576107248882-e3d64024b806?q=80&w=1500&auto=format&fit=crop",
            badges: []
        },
        {
            id: 8,
            categoryId: "mains",
            name: "Antrikot Izgara",
            description: "28 gün dinlendirilmiş 300g antrikot, fırın patates ve chimichurri sos.",
            price: 850,
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1500&auto=format&fit=crop",
            badges: ["Özel İmza"]
        },
        {
            id: 9,
            categoryId: "mains",
            name: "Trüf Mantarlı Risotto",
            description: "Arborio pirinci, taze siyah trüf, porçini mantarı ve mascarpone peyniri.",
            price: 480,
            image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7cf?q=80&w=1500&auto=format&fit=crop",
            badges: ["Vejetaryen"]
        },
        {
            id: 10,
            categoryId: "desserts",
            name: "Klasik Tiramisu",
            description: "İtalyan mascarpone peyniri, espresso ve savoiardi kedi dili.",
            price: 240,
            image: "https://images.unsplash.com/photo-1571115177098-24c42de1bd0f?q=80&w=1500&auto=format&fit=crop",
            badges: ["En Çok Satan"]
        },
        {
            id: 11,
            categoryId: "drinks",
            name: "İmza Old Fashioned",
            description: "Bourbon viski, angostura bitter, portakal kabuğu ve esmer şeker.",
            price: 320,
            image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1500&auto=format&fit=crop",
            badges: []
        },
        {
            id: 12,
            categoryId: "drinks",
            name: "Klasik Negroni",
            description: "Cin, Campari, tatlı vermut ve portakal dilimi.",
            price: 290,
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1500&auto=format&fit=crop",
            badges: ["Klasik"]
        },
        {
            id: 13,
            categoryId: "drinks",
            name: "Taze Naneli Limonata",
            description: "Günlük sıkım limon, taze nane yaprakları ve hafif agave şurubu.",
            price: 110,
            image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1500&auto=format&fit=crop",
            badges: ["Ferahlatıcı", "Alkolsüz"]
        },
        {
            id: 14,
            categoryId: "drinks",
            name: "Château Margaux Kırmızı Şarap (Kadeh)",
            description: "Zengin orman meyveleri aromalı, gövdeli Fransız kırmızı şarabı.",
            price: 450,
            image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1500&auto=format&fit=crop",
            badges: ["Premium"]
        },
        {
            id: 15,
            categoryId: "drinks",
            name: "Artisan Flat White",
            description: "Etiyopya çekirdeklerinden çift shot espresso ve ipeksi süt köpüğü.",
            price: 120,
            image: "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?q=80&w=1500&auto=format&fit=crop",
            badges: []
        },
        {
            id: 16,
            categoryId: "drinks",
            name: "Matcha Latte",
            description: "Orijinal Japon matcha tozu, yulaf sütü ve hafif vanilya şurubu.",
            price: 140,
            image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=1500&auto=format&fit=crop",
            badges: ["Yeni"]
        }
    ]
};
