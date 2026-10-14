# 🛒 FreshCart

A full-featured e-commerce web app built with **Next.js 16 (App Router)**, **React 19** and **TypeScript**. Browse products by category and brand, filter the shop, manage a cart and wishlist, review products, and check out with cash on delivery or online payment.

**🔗 Live demo:** [final-freshcart-sigma.vercel.app](https://final-freshcart-sigma.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux&logoColor=white)

---

## ✨ Features

**Shopping**
- Home page with hero slider, category grid, deals banner and featured products
- Shop page with filters by category, brand and price range, plus a mobile filter drawer
- Category pages and a categories overview
- Product details with image gallery, stock status, quantity selector and related products carousel

**Cart, wishlist & checkout**
- Cart with quantity updates, item removal (with confirmation) and clear cart
- Wishlist: add, remove and move items to the cart
- Checkout with a validated shipping form, **cash on delivery** or **online payment** (Stripe Checkout)
- Order history with order details

**Reviews**
- Rating breakdown per product
- Authenticated users can **create, edit and delete** their own reviews

**Authentication & account**
- Sign up and log in with form validation
- Forgot password flow: request code → verify code → reset password
- Update profile information
- Session token stored in an **httpOnly cookie** and managed through Server Actions

**UX**
- Fully responsive layout (mobile, tablet, desktop)
- Loading states, skeletons and empty states for cart, wishlist and orders
- Toast notifications and animated transitions

---

## 🧰 Tech stack

| Area | Tools |
|---|---|
| Framework | Next.js 16 (App Router, Server Components, Server Actions), React 19 with React Compiler |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| State | Redux Toolkit (store preloaded from the server) |
| Forms & validation | React Hook Form + Zod |
| HTTP | Axios |
| UI libraries | Motion (Framer Motion), Swiper, react-image-gallery, SweetAlert2, React-Toastify, Font Awesome |
| Backend / API | [Route Ecommerce API](https://ecommerce.routemisr.com) |
| Deployment | Vercel |

---

## 🏗️ Architecture notes

- **Feature-based structure.** Each feature (`auth`, `cart`, `wishlist`, `orders`, `Products`, ...) owns its components, screens, server actions, types and, when needed, its Redux slice.
- **Server Actions as the API layer.** All API calls go through server functions, so the auth token never reaches client-side JavaScript.
- **Server-hydrated store.** The root layout verifies the session and loads the user, cart and wishlist on the server, then preloads the Redux store. Users see their real cart count on first paint.
- **Typed end to end.** Request and response types for every feature, and Zod schemas shared between forms and types.

---

## 🚀 Getting started

**Prerequisites:** Node.js 20.9 or newer.

```bash
# 1. Clone the repository
git clone https://github.com/adelyousif552-art/finalFreshcart.git
cd finalFreshcart

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables are required, since the app talks to the public Route Ecommerce API.

| Script | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

---

## 📁 Project structure

```
src/
├── app/                  # Routes (App Router): (platform), (auth), profile
├── components/           # Shared UI: Navbar, Footer, Rating, Providers...
├── Features/
│   ├── auth/             # login, signup, forgot/reset password
│   ├── cart/             # cart screen, components, server actions, slice
│   ├── Checkout/         # checkout form, summary, order actions
│   ├── Products/         # product details, reviews, product card
│   ├── shop/             # shop screen and filters sidebar
│   ├── categories/ brands/ wishlist/ orders/ Home/
│   └── ...               # each feature: components, screens, server, types
├── store/                # Redux store setup
└── assets/               # images
```

---

## 🗺️ Roadmap

- [ ] Global product search
- [ ] Shop pagination and sorting
- [ ] Promo codes
- [ ] Brand pages
- [ ] Route protection with middleware
- [ ] Unit and end-to-end tests

---

## 👤 Author

**Yousif Adel**, Front-End Developer

[GitHub](https://github.com/adelyousif552-art) · [LinkedIn](https://www.linkedin.com/in/yousif-adel-26502a358)
