# 🍽️ QR Menü Projesi

Restoranlar ve cafeler için geliştirilmiş, modern, hızlı ve kullanıcı dostu bir dijital QR menü çözümüdür. Bu proje, işletmelerin fiziksel menülerini dijital ortama taşıyarak temassız bir deneyim sunmalarını amaçlar.

## 🚀 Özellikler

- **Mobil Öncelikli Tasarım:** Tüm cihazlarda (telefon, tablet, masaüstü) mükemmel görünüm için responsive yapı.
- **Kategori Filtreleme:** Ürünleri kategorilerine göre hızlıca listeleme.
- **Canlı Arama:** Ürün adı veya içeriğine göre anlık arama yapabilme.
- **Ürün Detayları:** Ürün görselleri, açıklamaları ve fiyat bilgileri.
- **Google Yorumları Entegrasyonu:** Müşterileri Google yorumlarına yönlendiren özel modal yapısı.
- **Admin Paneli (Dashboard):** Menü içeriğini yönetmek için hazırlanan demo arayüz.
- **Performans:** CDN tabanlı kütüphaneler ve hafif JS mimarisi ile yüksek hız.

## 🛠️ Teknoloji Yığını

- **HTML5 & CSS3:** Semantik yapı ve özel animasyonlar.
- **Tailwind CSS:** Modern ve hızlı stil yönetimi (CDN üzerinden).
- **Vanilla JavaScript (ES6+):** Class tabanlı (OOP) modüler kod mimarisi.
- **Lucide Icons:** Modern ve şık ikon kütüphanesi.

## 📂 Proje Yapısı

```text
qr_menu/
├── assets/          # Görsel materyaller ve resimler
├── css/             # Özel stil dosyaları (style.css)
├── js/              # JavaScript mantığı
│   ├── classes/     # ES6 Class yapıları (DataManager, MenuRenderer, CartManager)
│   ├── data.js      # Mock veri yapısı
│   ├── main.js      # Uygulama başlatıcı
│   └── dashboard.js # Yönetim paneli mantığı
├── index.html       # Müşteri menü arayüzü
├── dashboard.html   # Yönetim paneli arayüzü
└── PROGRESS.md      # Geliştirme süreci ve yapılacaklar listesi
```

## 💻 Kurulum ve Çalıştırma

Proje herhangi bir paket yöneticisi (npm/yarn) gerektirmez. Doğrudan tarayıcıda çalıştırılabilir:

1. Bu depoyu klonlayın veya indirin.
2. `index.html` dosyasını favori tarayıcınızda açın.
3. Yönetim panelini incelemek için `dashboard.html` dosyasını açın.

## 📝 Notlar

- Veriler şu an için `js/data.js` içerisinde statik olarak tutulmaktadır.
- Proje tamamen "No-Build" prensibiyle hazırlanmıştır, geliştirme için bir derleme adımına ihtiyaç duymaz.

## 🤝 Katkıda Bulunma

1. Bu projeyi fork edin.
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`).
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`).
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`).
5. Bir Pull Request açın.

---
Geliştiren: [Mesut Yılmaz](https://github.com/MesutYilmazJS)
