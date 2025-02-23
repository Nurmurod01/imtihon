# E-Commerce Platform

Bu loyiha Next.js va NestJS asosida yaratilgan e-commerce platformasidir. Frontend Next.js va Redux Toolkit Query yordamida yozilgan, backend esa NestJS bilan ishlaydi.

## Texnologiyalar

- **Frontend**: Next.js, React, Tailwind CSS, Redux Toolkit Query
- **Backend**: NestJS, PostgreSQL, Prisma ORM
- **Authentifikatsiya**: JWT (JSON Web Token)
- **Server**: Ubuntu 24.04 LTS, AWS

## O'rnatish

### **1. Repository-ni klonlash**

```sh
git clone https://github.com/username/project.git
cd project
```

### **2. Frontend uchun o'rnatish**

```sh
cd frontend
npm install
```

### **3. Backend uchun o'rnatish**

```sh
cd backend
npm install
```

### **4. Muhit sozlamalari**

Loyihada `.env` fayllar kerak bo‘ladi.

#### **Frontend** (`frontend/.env.local`)

```
NEXT_PUBLIC_API_URL=http://localhost:3004
```

#### **Backend** (`backend/.env`)

```
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce
JWT_SECRET=your_secret_key
```

### **5. Ma'lumotlar bazasini yaratish**

```sh
cd backend
npx prisma migrate dev
```

### **6. Loyihani ishga tushirish**

#### **Frontend**

```sh
cd frontend
npm run dev
```

#### **Backend**

```sh
cd backend
npm run start:dev
```

## API Endpointlar

| Endpoint         | Metod | Tavsif                    |
| ---------------- | ----- | ------------------------- |
| `/users`         | GET   | Foydalanuvchilar ro‘yxati |
| `/categories`    | GET   | Kategoriyalar ro‘yxati    |
| `/products`      | GET   | Mahsulotlar ro‘yxati      |
| `/orders`        | GET   | Buyurtmalar ro‘yxati      |
| `/auth/login`    | POST  | Kirish                    |
| `/auth/register` | POST  | Ro‘yxatdan o‘tish         |

## Xatoliklarni Tuzatish

**Agar `useGetPaymentsQuery is not a function` xatosi yuzaga kelsa:**

1. `api.js` faylida `useGetPaymentsQuery` mavjudligini tekshiring.
2. `store.js` faylida `api.reducer` qo‘shilganiga ishonch hosil qiling.
3. `Provider` bilan `store` butun ilovani o‘rab turganligini tekshiring.
4. `http://localhost:3004/payments` API ishlayotganligini tekshiring.

## Deploy

**AWS serverga joylash uchun:**

1. Serverga SSH orqali kirish: `ssh user@your-server-ip`
2. Loyiha fayllarini serverga nusxalash: `scp -r project user@your-server-ip:/var/www/project`
3. Docker yoki PM2 yordamida backendni ishga tushirish

## Muallif

Loyiha muallifi: **Nurmurod Rabbimov**
