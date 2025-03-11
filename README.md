# HubX News App

Modern ve kullanıcı dostu bir haber uygulaması. Bu uygulama, güncel haberleri görüntülemenizi, aramanızı ve favorilerinize eklemenizi sağlar.

![HubX News App](https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)

## 🚀 Özellikler

- **Güncel Haberler**: News API ile entegre olarak en güncel haberleri görüntüleme
- **Arama Fonksiyonu**: Anahtar kelimelerle haber arama
- **Favoriler**: Haberleri favorilere ekleme ve yönetme
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Karanlık Mod**: Göz yorgunluğunu azaltan karanlık tema desteği
- **Modern UI**: Tailwind CSS ve Shadcn UI ile şık ve modern arayüz

## 🛠️ Teknolojiler

- **Next.js 15**: React framework'ü
- **TypeScript**: Tip güvenliği
- **Redux Toolkit**: State yönetimi
- **RTK Query**: API istekleri
- **Tailwind CSS**: Stil ve tasarım
- **Shadcn UI**: Komponent kütüphanesi
- **Framer Motion**: Animasyonlar
- **News API**: Haber verileri

## 📋 Gereksinimler

- Node.js 18.0.0 veya üzeri
- npm veya yarn
- News API anahtarı (https://newsapi.org/ adresinden ücretsiz edinebilirsiniz)

## 🚀 Kurulum

1. Repoyu klonlayın:
   ```bash
   git clone https://github.com/yourusername/hubx-news-app.git
   cd hubx-news-app
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   # veya
   yarn install
   ```

3. `.env.local` dosyası oluşturun ve News API anahtarınızı ekleyin:
   ```
   NEXT_PUBLIC_NEWS_API_KEY=your_api_key_here
   ```

4. Uygulamayı başlatın:
   ```bash
   npm run dev
   # veya
   yarn dev
   ```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

## 📱 Kullanım

### Ana Sayfa
Ana sayfa, uygulamanın genel bir tanıtımını ve özelliklerini içerir. Buradan diğer sayfalara kolayca erişebilirsiniz.

### Haberler Sayfası
Haberler sayfasında, en güncel haberler listelenir. Arama çubuğunu kullanarak belirli konularda haberler arayabilirsiniz. Her haberin üzerine tıklayarak detaylarını görüntüleyebilir veya favorilerinize ekleyebilirsiniz.

### Favoriler Sayfası
Favoriler sayfasında, kaydettiğiniz haberleri görüntüleyebilir ve yönetebilirsiniz. Favorilerinizden bir haberi kaldırmak için "Favorilerden Çıkar" butonuna tıklayabilirsiniz.

## 🧩 Proje Yapısı

```
news-app/
├── public/             # Statik dosyalar
├── src/                # Kaynak kodları
│   ├── app/            # Next.js sayfa bileşenleri
│   ├── components/     # Yeniden kullanılabilir bileşenler
│   ├── hooks/          # Özel React hooks
│   ├── redux/          # Redux store ve slice'lar
│   ├── services/       # API servisleri
│   ├── styles/         # Global stiller
│   ├── types/          # TypeScript tipleri
│   └── utils/          # Yardımcı fonksiyonlar
├── .env.local          # Ortam değişkenleri
├── next.config.js      # Next.js yapılandırması
├── tailwind.config.js  # Tailwind CSS yapılandırması
└── tsconfig.json       # TypeScript yapılandırması
```

## 🔄 API Kullanımı

Uygulama, haberleri çekmek için News API'yi kullanır. API istekleri, RTK Query ile yönetilir ve `src/services/api.ts` dosyasında tanımlanmıştır.

API'nin çalışmaması durumunda, uygulama otomatik olarak mock verilere geçiş yapar, böylece kullanıcı deneyimi kesintiye uğramaz.

## 🌙 Karanlık Mod

Uygulama, kullanıcı tercihlerine göre otomatik olarak karanlık veya açık temayı uygular. Tema değiştirmek için sağ üst köşedeki tema düğmesini kullanabilirsiniz.

## 📝 Yapılacaklar

- [ ] Kullanıcı kimlik doğrulama sistemi
- [ ] Haber kategorilerine göre filtreleme
- [ ] Haber detay sayfası
- [ ] Paylaşım özellikleri
- [ ] Bildirim sistemi
- [ ] Offline modu
- [ ] Performans optimizasyonları

## 🤝 Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyoruz! Lütfen şu adımları izleyin:

1. Bu repoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

## 📞 İletişim

Sorularınız veya geri bildirimleriniz için lütfen [email protected] adresine e-posta gönderin veya GitHub üzerinden bir issue açın.

---

HubX News App ile güncel haberlerden haberdar olun! 📰✨
