# Mini E-Commerce Platform

A full-stack e-commerce web application built for an internship project, featuring product submission, real-time listing, and search functionality.

![Add Product Page Preview](./screenshots/AddProduct.png)
![All Products Page Preview](./screenshots/photo1.png)

## Features

- **Product Submission Tab**
  - Form validation with Zod
  - Image URL support (optional)
  - Instant submission to PostgreSQL database

- **My Products Tab**
  - Real-time product listing
  - Search by name/description
  - Pagination support
  - Responsive card layout

- **Technical Highlights**
  - React Query for state management
  - Prisma ORM for database operations
  - Debounced search implementation
  - Server-side pagination

## Tech Stack

**Frontend:**
- React + TypeScript
- TanStack Query (React Query)
- Axios
- Zod (Validation)
- Tailwind CSS

**Backend:**
- Node.js
- Express
- Prisma ORM
- PostgreSQL

## Installation

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v15+)
- Git

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/YashJsh/Ecommerce-Internship.git
cd mini-ecommerce
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Database Configuration**
```bash
Create .env file in the backend folder 
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"
PORT=5001
```
4. **Run Database Migrations**
```bash
npx prisma migrate dev
```
5. **Frontend Setup**
```bash
cd ../frontend
npm install
```
6. **Create .env for frontend**
```bash
VITE_BASE_URL = "http://localhost:5001/api"
```

7. **Run Application**
```
# Backend (from backend directory)
npm run dev
# Frontend (from frontend directory)
npm run dev
```