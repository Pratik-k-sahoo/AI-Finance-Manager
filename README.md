# 💰 Finance Manager – Frontend

**AI Finance Manager Frontend** is a modern, responsive finance dashboard built with **React**, **Redux Toolkit**, **React Query**, and **Tailwind CSS**.  
It connects seamlessly with the AI Finance Manager Backend to provide **real-time income & expense tracking**, **analytics**, **AI-powered insights**, and **Excel exports**.

---

## 🔍 GitHub SEO Keywords

Finance Dashboard · Expense Tracker App · Income Tracker UI ·  
React Finance App · Personal Finance Dashboard ·  
Redux Toolkit · React Query · Tailwind CSS ·  
Finance Manager · Expense Analytics UI

---

## ✨ Features

- 🔐 Authentication (Login / Signup / Logout)
- 🛡️ Protected Routes
- 💰 Income & Expense Management
- 📊 Interactive Analytics Dashboard
  - Category-wise expense breakdown
  - Monthly income vs expense trends
  - Savings rate & biggest expense
- 🤖 AI Insights & Smart Suggestions
- 📥 Excel Export (Income / Expense / All Transactions)
- 🔍 Advanced Transaction Filters & Search
- 🌗 Light & Dark Theme Support
- ⚡ Optimized with React Query & Redux Persist

---

## 🛠️ Tech Stack

- **React (Vite)**
- **Redux Toolkit + Redux Persist**
- **@tanstack/react-query**
- **React Router**
- **Tailwind CSS**
- **shadcn/ui**
- **Recharts**
- **Axios**
- **Lucide Icons**

---

## 📁 Project Structure
src\
├── components\
│ ├── dashboard\
│ │ ├── AiInsight.jsx\
│ │ ├── BalanceCard.jsx\
│ │ ├── StatsCard.jsx\
│ │ └── TransactionCard.jsx\
│ ├── Transaction\
│ │ ├── Header.jsx\
│ │ ├── List.jsx\
│ │ └── TransactionCard.jsx\
│ ├── ui/shadcn/ui components\
│ ├── AddTransactionForm.jsx\
│ ├── AppContent.jsx\
│ ├── AppProvider.jsx\
│ ├── ChartComponent.jsx\
│ ├── ChartLine.jsx\
│ ├── ChartPie.jsx\
│ ├── Databox.jsx\
│ ├── DataTable.jsx\
│ ├── ExportDialog.jsx\
│ ├── Navbar.jsx\
│ ├── NavLink.jsx\
│ └── ProtectedRoutes.jsx\
├── hooks\
│ ├── useAppMutation.js\
│ ├── useExpenseAnalytics.js\
│ └── useGetQuery.js\
├── lib/\
│ ├── analytics.js\
│ ├── api.js\
│ ├── axios.js\
│ ├── axiosBase.js\
│ ├── queryClient.js\
│ └── utils.js\
├── pages/\
│ ├── Analytics.jsx\
│ ├── Auth.jsx\
│ ├── index.js\
│ ├── Main.jsx\
│ ├── NotFound.jsx\
│ └── Transaction.jsx\
├── redux/\
│ ├── selectors\
│ │ └── dashboardSelectors.js\
│ ├── slices\
│ │ ├── authSlice.jsx\
│ │ └── dashboardSlice.jsx\
│ └── storeConfig.js/\
├── App.jsx\
├── index.css\
└── main.jsx\


---

## 🔐 Authentication Flow

- Auth state managed via **Redux Toolkit**
- Session persisted using **redux-persist**
- API authentication via **HTTP-only cookies**
- Automatic redirect on session expiry (Axios interceptor)

---

## 📊 Analytics Engine

Powered by `useExpenseAnalytics` hook:

- Merges income & expense data
- Monthly filtering
- Category-wise aggregation
- Alerts (overspending, negative balance)
- AI-style suggestions (savings rate, spending control)
- Monthly income vs expense vs savings trend

---

## 🌐 Environment Variables

Create a `.env` file:

```env
VITE_BASE_URL=https://your-backend-url/api
VITE_USER_URL=user
VITE_INCOME_URL=income
VITE_EXPENSE_URL=expense
VITE_DASHBOARD_URL=dashboard
```

## ▶️ Running Locally
### Install dependencies
```bash
pnpm install
```
### Start development server
```bash
pnpm dev
```

## 🔁 API Integration
### All API calls are centralized in:
```file
src/lib/api.js
```
Handled using:

- Axios instance (axiosBase.js)
- Global 401 interceptor (axios.js)
- React Query for caching & revalidation

## 📥 Excel Export
Users can export:
- Income transactions
- Expense transactions
- All transactions

Handled via backend APIs and downloaded directly in the browser.

## 🧠 AI Like Insights

The dashboard provides:

- Overspending alerts (category > 30%)
- Savings rate analysis
- Smart recommendations
- Monthly financial health summary

## 🔒 Security & UX

- Protected routes (ProtectedRoutes)
- Auto logout on session expiry
- Optimistic UI updates
- Query invalidation on mutation

## 🎨 UI & Design

- Tailwind CSS with custom theme tokens
- Dark mode support
- shadcn/ui components
- Responsive layouts
- Interactive charts (Recharts)

## 🚀 Deployment

Recommended:
- Vercel
- Netlify

Make sure environment variables are set in the hosting platform.

## ⭐ Author

Finance Manager – Frontend

Built for performance, clarity, and real-world finance tracking 🚀