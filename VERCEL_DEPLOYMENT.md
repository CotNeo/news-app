# Vercel Dağıtım Kılavuzu

Bu kılavuz, News App uygulamasını Vercel'de dağıtmak için gerekli adımları içerir.

## Ortam Değişkenleri

Vercel'de aşağıdaki ortam değişkenlerini ayarlamanız gerekmektedir:

### NextAuth.js için Gerekli Ortam Değişkenleri

1. **NEXTAUTH_SECRET**: JWT imzalama ve doğrulama için kullanılan gizli anahtar.
   - Güçlü bir rastgele dize olmalıdır.
   - Örnek oluşturma yöntemi: Terminal'de `openssl rand -base64 32` komutunu çalıştırın.
   - Örnek değer (KULLANMAYIN, kendi değerinizi oluşturun): `Ks2Yx5L9Z7Pq3R8T1V4W6Y9Z2X5C8V1B4N7M0P3Q6S9`

2. **NEXTAUTH_URL**: Uygulamanızın tam URL'si.
   - Örnek: `https://news-app-mu-topaz.vercel.app`

## Vercel'de Ortam Değişkenlerini Ayarlama

1. Vercel Dashboard'a giriş yapın.
2. Projenizi seçin.
3. "Settings" sekmesine tıklayın.
4. Sol menüden "Environment Variables" seçeneğini tıklayın.
5. Yukarıda listelenen ortam değişkenlerini ekleyin.
6. "Save" düğmesine tıklayın.
7. Projenizi yeniden dağıtın: "Deployments" sekmesine gidin ve "Redeploy" düğmesine tıklayın.

## Next.js 15 Gereksinimleri

Next.js 15, bazı client-side hooks'ların kullanımı için yeni gereksinimler getirmiştir:

1. `useSearchParams()`, `usePathname()` ve `useParams()` gibi router hook'ları kullanıldığında, bunların bir `<Suspense>` sınırı içinde sarılması gerekir.

2. Bu hook'ları kullanan bileşenleri ayrı bir bileşene çıkarın ve ana bileşende Suspense ile sarın:

```tsx
// Doğru kullanım
function SearchParamsComponent() {
  const searchParams = useSearchParams();
  // ...
}

export default function Page() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <SearchParamsComponent />
    </Suspense>
  );
}
```

## Sorun Giderme

Eğer hala sorunlar yaşıyorsanız:

1. Vercel Dashboard'da "Logs" sekmesini kontrol edin.
2. NextAuth.js'in debug modunu etkinleştirmek için `NEXTAUTH_DEBUG=true` ortam değişkenini ekleyin.
3. Ortam değişkenlerinin doğru ayarlandığından emin olun.
4. Build hatalarını kontrol edin ve gerekirse Next.js 15 uyumluluğu için kodunuzu güncelleyin.

## Önemli Notlar

- `NEXTAUTH_SECRET` değerini asla kaynak kodunuzda saklamayın veya paylaşmayın.
- Üretim ortamında her zaman güçlü ve benzersiz bir `NEXTAUTH_SECRET` kullanın.
- Ortam değişkenlerini değiştirdikten sonra uygulamanızı yeniden dağıtın. 