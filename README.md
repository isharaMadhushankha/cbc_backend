
# 💄✨ CBC Cosmetics — Full-Stack E-Commerce Platform

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**CBC Cosmetics** is a fully-featured MERN Stack e-commerce web application focused on scalability, secure multi-role authentication, and a seamless shopping experience. Built to support a dynamic marketplace, the platform features distinct, isolated workflows for Customers, Sellers, and Admins.

---

## 🚀 Live Demo
🌐 [Live Application](https://www.linkedin.com/posts/madhushankha-ishara_mern-reactjs-nodejs-activity-7460024543831695360-oPUA?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD9sE14B2jNy3SWgFVdvdqlIazOWSIxri54)

---

## ✨ Key Features

### 🛍️ Customer Experience
- **Smart Catalog:** Browse, search, and discover cosmetic products easily.
- **Persistent Cart & Wishlist:** Add items to cart (saved via `localStorage`) and manage an active product wishlist.
- **Secure Checkout:** Streamlined order placement, full history logs, and active status tracking.
- **Skincare Consultations:** Book dedicated consulting sessions featuring a real-time messaging thread with administrators.
- **Flexible Auth:** Seamless login via standard Email/Password or Google OAuth 2.0 social sign-in.

### 🏪 Seller Ecosystem
- **Onboarding Pipeline:** Specialized seller request submission and application subsystem.
- **Product Hub:** Dedicated inventory workspace to list, modify, and monitor cosmetic product lines once approved by an admin.

### 🔧 Central Admin Control
- **Analytics Center:** Recharts-powered interactive line and bar charts tracking real-time sales trends, user metrics, and order counts.
- **Marketplace Governance:** Approve seller requests, manage comprehensive product CRUD operations, modify order statuses, and handle customer inquiries.
- **Consultation Inbox:** Central message thread directory to communicate directly with users seeking skincare support.

---

## 🛠️ Tech Stack Matrix

### Frontend (Client-Side)
- **Framework:** React.js (Compiled via Vite for high-speed local development)
- **Routing:** React Router DOM (Declarative client-side route tracking)
- **Styling:** Tailwind CSS (Utility-first, fully responsive grid systems)
- **Data Visualization:** Recharts (Declarative data charts for admin tracking)
- **External Engines:** Supabase JS SDK (Direct client-side media storage communication), Google OAuth (`@react-oauth/google`)

### Backend & Database (Server-Side)
- **Runtime Environment:** Node.js + Express.js REST API Architecture
- **Database Layer:** MongoDB & Mongoose ODM (Object Document Mapper)
- **Session Security:** JSON Web Tokens (JWT) for stateless token authentication
- **Encryption:** Bcrypt (Salting and secure password hashing pipelines)

---

## 🗄️ Database Architecture (Mongoose Models)

| Model Name | Core Data Scope |
| :--- | :--- |
| **User** | User metadata, encrypted credentials, and access roles (`customer`, `seller`, `admin`) |
| **Product** | Cosmetic inventory schema including pricing, details, and Supabase image targets |
| **Order** | Purchased line-items, transactional states, and active delivery tracking status |
| **Consultation** | Direct user-to-admin secure chat messages mapped per customer account |
| **Inquiry** | Customer contact forms, support submissions, and general messages |
| **SellerApplication**| Storage data tracking active seller onboarding applications awaiting admin evaluation |
| **SystemConfig** | Global dashboard configurations and platform-wide variables |

---

## 📡 Primary API Interface Routes

### 🔐 Authentication & Profiles
- `POST /api/user/register` - Create new customer credentials
- `POST /api/user/login` - Authenticate account and issue session JWT
- `GET /api/user/profile` - Secure route fetching active user credentials

### 📦 Marketplace Core
- `GET /api/product` - Fetch catalog items with optional filtering
- `POST /api/product` - Create new listing *(Admin/Approved Seller restricted)*
- `POST /api/order` - Parse active cart and commit order generation

### 💬 Consultations & Support
- `POST /api/consultation` - Initialize a skincare advice booking
- `POST /api/inquiry` - Commit public contact form submissions
- `POST /api/seller/apply` - Submit a workspace onboarding request

---

## 📁 Project Structure


```

CBC Cosmetics/
├── cbc_backend/
│   ├── app.js            # Express application entry context
│   ├── models/           # Mongoose schemas (User, Product, Order, etc.)
│   ├── routes/           # Decoupled REST routers mapped by model endpoint
│   └── package.json      # Backend node module dependency manifest
└── cbc_frontend/
├── src/
│   ├── components/   # Globally shared layout widgets (Navbar, Cards, Buttons)
│   ├── pages/        # Route views (Catalog, Auth, Admin Dashboard)
│   ├── App.jsx       # Root UI router configuration
│   └── main.jsx      # Client mount file invoking configuration blocks
└── vite.config.js    # Vite compilation rules

```

---

## ⚙️ Setting Up Locally

### Prerequisites
- Node.js installed locally (Version `>= 18` recommended)
- A running MongoDB environment (Local Community Server or Atlas Cluster Instance)
- A Supabase Project instance (For hosting product images inside Storage Buckets)

### 1. Server Configuration
```bash
cd cbc_backend
npm install

```

Create a `.env` file in the root of the `cbc_backend` directory and insert your credentials:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000

```

Launch the development server:

```bash
npm start

```

### 2. Client Configuration

```bash
cd ../cbc_frontend
npm install

```

Create a `.env` file in the root of the `cbc_frontend` directory:

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_url_endpoint
VITE_SUPABASE_ANON_KEY=your_supabase_anonymous_public_key
VITE_GOOGLE_CLIENT_ID=your_google_cloud_oauth_client_id

```

Launch the local application preview:

```bash
npm run dev

```

---

## 📄 License

Distributed under the MIT License. Built strictly as an academic/personal project reference.
