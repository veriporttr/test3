# Teklif Yönetim Sistemi

Modern ve profesyonel bir teklif hazırlama ve yönetim platformu.

## Özellikler

### 🔐 Kimlik Doğrulama
- JWT tabanlı güvenli giriş sistemi
- Rol tabanlı yetki kontrolü (Admin, User)
- Şifre güvenlik kuralları

### 🏢 Şirket Yönetimi
- Şirket profili ve logo yönetimi
- Fatura bilgileri (IBAN, vergi no, adres)
- Abonelik durumu takibi

### 📄 Teklif Sistemi
- Sürükle-bırak ile kolay teklif oluşturma
- Otomatik teklif numarası üretimi
- Ürün/hizmet listesi yönetimi
- Para birimi desteği (TRY, USD, EUR)
- PDF dönüşüm ve indirme
- E-posta ile teklif gönderimi

### 👥 Kullanıcı Yönetimi
- Şirket çalışanları yönetimi
- Kullanıcı rolleri ve yetkiler
- Aktif/pasif kullanıcı durumu

### 💳 Abonelik Sistemi
- Free, Pro, Enterprise planları
- Kullanım limitlerini takip
- Ödeme geçmişi

## Teknolojiler

### Backend (.NET 8)
- ASP.NET Core Web API
- Entity Framework Core
- Microsoft SQL Server
- JWT Authentication
- ASP.NET Identity
- AutoMapper
- Swagger/OpenAPI

### Frontend (Next.js)
- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Axios (HTTP Client)
- React Hook Form
- React Hot Toast

## Kurulum

### Backend

```bash
cd api/OfferManagement.API
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend

```bash
cd ui
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/register` - Yeni şirket kaydı
- `POST /api/auth/refresh` - Token yenileme

### Company
- `GET /api/company/me` - Şirket bilgilerini getir
- `PUT /api/company` - Şirket bilgilerini güncelle
- `POST /api/company/logo` - Logo yükle

### Offers
- `GET /api/offers` - Teklif listesi
- `GET /api/offers/{id}` - Teklif detayı
- `POST /api/offers` - Yeni teklif oluştur
- `PUT /api/offers/{id}` - Teklif güncelle
- `DELETE /api/offers/{id}` - Teklif sil
- `POST /api/offers/{id}/send` - Teklif gönder

### Users
- `GET /api/users` - Kullanıcı listesi
- `POST /api/users` - Yeni kullanıcı
- `PUT /api/users/{id}` - Kullanıcı güncelle
- `DELETE /api/users/{id}` - Kullanıcı sil

## Güvenlik

- JWT tabanlı kimlik doğrulama
- Role-based yetkilendirme
- Şifre hashleme (ASP.NET Identity)
- CORS koruması
- Input validation

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır.