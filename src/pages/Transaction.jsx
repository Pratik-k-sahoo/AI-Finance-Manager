import React from "react";


const transactions = [
  { id: 1, title: "Groceries", category: "Food", amount: 3150, change: -150, icon: "cart" },
  { id: 2, title: "Salary", category: "Income", amount: 3000, change: 3000, icon: "wallet" },
  { id: 3, title: "Electric Bill", category: "Bills", amount: -100, change: -100, icon: "bill" },
  { id: 4, title: "Restaurant", category: "Food", amount: -60, change: -60, icon: "utensils" },
  { id: 5, title: "Gas", category: "Transportation", amount: -40, change: -40, icon: "gas" },
  // add more transactions here to test scrolling / "all" view
];

const Icon = ({ name }) => {
  switch (name) {
    case "cart":
      return (
        <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="10" cy="20" r="1" fill="currentColor"/>
          <circle cx="18" cy="20" r="1" fill="currentColor"/>
        </svg>
      );
    case "wallet":
      return (
        <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 7h14v10H3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 9v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="18" cy="12" r="1" fill="currentColor"/>
        </svg>
      );
    case "bill":
      return (
        <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 6h14v12H4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "utensils":
      return (
        <svg className="w-6 h-6 text-pink-600" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M7 2v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 2v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 21c4-2 8-2 12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "gas":
      return (
        <svg className="w-6 h-6 text-sky-600" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="3" y="8" width="10" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M17 7v6l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      );
  }
};

const formatAmount = (value) => {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  return `${sign}$${abs.toLocaleString()}`;
};

export default function Transaction() {
  return (
    <div className="h-screen w-full bg-gray-50">
      {/* Top bar / header */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Transactions</h1>
            <p className="text-sm text-gray-500 mt-0.5">All transactions — total {transactions.length}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-200 rounded-md text-sm bg-white hover:bg-gray-50"
            >
              Export
            </button>
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
            >
              Add Transaction
            </button>
          </div>
        </div>
      </header>

      
      <main className="max-w-7xl mx-auto px-6 py-6 h-[calc(100vh-72px)]"> 
   
       <div className="h-full bg-blue-50/40 rounded-2xl shadow-sm border border-blue-200 overflow-hidden flex flex-col">

     
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-medium text-gray-800">All Transactions</h2>
              <span className="text-sm text-gray-500">Showing {transactions.length} items</span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search transactions..."
                className="text-sm px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
              <select className="text-sm px-3 py-2 border border-gray-200 rounded-md">
                <option>All categories</option>
                <option>Food</option>
                <option>Income</option>
                <option>Bills</option>
                <option>Transportation</option>
              </select>
            </div>
          </div>

          
          <div className="flex-1 overflow-auto">
           
            <div className="hidden md:grid grid-cols-12 items-center gap-4 px-6 py-3 border-b border-gray-100 text-sm text-gray-500 sticky top-0 bg-white z-10">
              <div className="col-span-6">Description</div>
              <div className="col-span-3">Category</div>
              <div className="col-span-3 text-right">Amount / Change</div>
            </div>

            <ul className="divide-y divide-gray-100">
              {transactions.map((tx) => {
                const isPositiveChange = tx.change > 0;
                const changeClass = isPositiveChange ? "text-green-600" : "text-red-500";
                const amountColor = tx.amount >= 0 ? "text-gray-900" : "text-gray-700";

                return (
                  <li key={tx.id} className="px-6 py-4">
                    <div className="grid grid-cols-12 gap-4 items-center">

                      {/* Description */}
                      <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                          <Icon name={tx.icon} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-800">{tx.title}</div>
                          <div className="text-xs text-gray-400">ID #{tx.id}</div>
                        </div>
                      </div>

                      {/* Category */}
                      <div className="col-span-6 md:col-span-3">
                        <div className="text-sm text-gray-700">{tx.category}</div>
                      </div>

                      {/* Amount / Change */}
                      <div className="col-span-6 md:col-span-3 text-right">
                        <div className={`text-sm font-semibold ${amountColor}`}>
                          {formatAmount(tx.amount)}
                        </div>
                        <div className={`text-xs mt-1 ${changeClass}`}>
                          {tx.change > 0 ? `+${formatAmount(tx.change)}` : `${formatAmount(tx.change)}`}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* footer (optional) */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-500">Showing all transactions</div>
            <div className="text-sm text-gray-500">Total: {transactions.length}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
