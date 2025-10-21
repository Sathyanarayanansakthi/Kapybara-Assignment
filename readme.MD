# 📝 Next.js Blog Application

A full-stack blog platform built with **Next.js 13+ App Router**, **tRPC**, **TypeScript**, **Neon (PostgreSQL)**, and **Drizzle ORM**. It includes blog creation, viewing, and structured API with modern frontend components.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 13+ (App Router)](https://nextjs.org/)
- **Backend**: [tRPC](https://trpc.io/)
- **Database**: [Neon](https://neon.tech/) (Serverless PostgreSQL)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Styling**: Tailwind CSS (assumed)
- **Editor**: [TipTap](https://tiptap.dev/) (Rich Text Editor)
- **Deployment Ready**: Easily deployable to platforms like Vercel

---

## 📁 Folder Structure

```bash
src/
│
├── app/                      # Next.js app directory
│   ├── api/blog/trpc/        # API routes using tRPC
│   ├── blogs/                # Blog listing page
│   ├── createBlog/           # Blog creation page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│
├── components/               # UI components
│   └── ui/                   # Navbar, Footer, Hero, etc.
│
├── db/                       # Drizzle schema and queries
│   ├── blogSchema.ts         # Table definitions
│   └── blogqueries.ts        # Custom DB queries
│
├── lib/                      # Utilities
│   ├── trpc.ts               # tRPC client setup
│   └── utils.ts              # Helper functions
│
├── server/                   # tRPC server setup
│   ├── routers/              # tRPC routers
│   ├── trpc.ts               # Router config
│   └── index.ts              # Server handler
│
├── .env                      # Environment variables
├── drizzle.config.ts         # Drizzle configuration
├── next.config.ts            # Next.js configuration
├── package.json
├── tsconfig.json




Environment Setup
1. Clone the Repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. Install Dependencies
npm install
# or
yarn install

3. Create .env File

Create a .env file in the root directory and add the following:

DATABASE_URL="your_neon_database_url"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"


Replace "your_neon_database_url" with the actual connection string from your Neon
 PostgreSQL instance.

🧱 Database Setup with Drizzle + Neon
Push schema to database:
npx drizzle-kit push


Make sure your drizzle.config.ts is set up correctly:

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/blogSchema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
});

🏃 Run the Application
Development Mode
npm run dev
# or
yarn dev


Open http://localhost:3000
 in your browser.

Build for Production
npm run build
npm start
