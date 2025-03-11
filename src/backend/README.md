# News App Backend

Bu repo, News App uygulamasının backend kısmını içerir. Express.js ve MongoDB kullanılarak geliştirilmiştir.

## Özellikler

- Haber favorilere ekleme/çıkarma
- Favori haberleri listeleme
- RESTful API

## Teknolojiler

- Node.js
- Express.js
- MongoDB
- Mongoose

## Kurulum

1. Repoyu klonlayın
2. `npm install` komutunu çalıştırın
3. `.env` dosyasını oluşturun ve gerekli değişkenleri ayarlayın:
   ```
   PORT=10000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/news-app?retryWrites=true&w=majority
   ```
4. `npm start` komutunu çalıştırın

## API Endpoints

- `GET /api/favorites`: Tüm favori haberleri listeler
- `POST /api/favorites`: Yeni bir haberi favorilere ekler
- `DELETE /api/favorites/:id`: Belirtilen haberi favorilerden çıkarır

## Render ile Deploy

Bu uygulama Render.com üzerinde deploy edilmek üzere yapılandırılmıştır.

### Deploy Adımları

1. Render.com hesabınıza giriş yapın
2. "New Web Service" butonuna tıklayın
3. GitHub reponuzu bağlayın
4. Aşağıdaki ayarları yapın:
   - **Name**: news-app-backend
   - **Environment**: Node
   - **Build Command**: `./build.sh`
   - **Start Command**: `node server.js`
5. "Advanced" sekmesinden aşağıdaki environment variable'ları ekleyin:
   - `MONGO_URI`: MongoDB bağlantı URL'niz
   - `PORT`: 10000
6. "Create Web Service" butonuna tıklayın

Render otomatik olarak uygulamanızı deploy edecektir. 