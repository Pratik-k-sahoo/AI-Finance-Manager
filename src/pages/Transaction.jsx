import React from "react";


const transactions = [
  {
    id: 1,
    title: "Groceries",
    category: "Food",
    amount: 3150,
    change: -150,
    icon: "cart",
  },
  {
    id: 2,
    title: "Salary",
    category: "Income",
    amount: 3000,
    change: 3000,
    icon: "wallet",
  },
  {
    id: 3,
    title: "Electric Bill",
    category: "Bills",
    amount: -100,
    change: -100,
    icon: "bill",
  },
  {
    id: 4,
    title: "Restaurant",
    category: "Food",
    amount: -60,
    change: -60,
    icon: "utensils",
  },
  {
    id: 5,
    title: "Gas",
    category: "Transportation",
    amount: -40,
    change: -40,
    icon: "gas",
  },
];

const Icon = ({ name }) => {
  // simple inline SVG icons mapped by name
  switch (name) {
    case "cart":
      return (
        <svg className="w-6 h-6 text-indigo-600" viewBox="0 0 24 24" fill="none">
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="10" cy="20" r="1" fill="currentColor"/>
          <circle cx="18" cy="20" r="1" fill="currentColor"/>
        </svg>
      );
    case "wallet":
      return (
        <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none">
          <path d="M3 7h14v10H3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 9v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="18" cy="12" r="1" fill="currentColor"/>
        </svg>
      );
    case "bill":
      return (
        <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="none">
          <path d="M4 6h14v12H4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "utensils":
      return (
        <svg className="w-6 h-6 text-pink-600" viewBox="0 0 24 24" fill="none">
          <path d="M7 2v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 2v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 21c4-2 8-2 12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "gas":
      return (
        <svg className="w-6 h-6 text-sky-600" viewBox="0 0 24 24" fill="none">
          <path d="M6 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="3" y="8" width="10" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M17 7v6l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      );
  }
};

const formatAmount = (value) => {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  // show as $3,150 or $-60 etc. Use Intl for grouping
  return `${sign}$${abs.toLocaleString()}`;
};

export default function Transaction() {
  return (
    <div className="max-w-xl mx-auto p-6">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
            <a href="#" className="text-sm text-indigo-600 hover:underline">View all</a>
          </div>

          <div className="mt-4 divide-y divide-gray-100">
            {transactions.map((tx, idx) => {
              const isPositive = tx.change > 0;
              const changeClass = isPositive ? "text-green-600" : "text-red-500";
              const amountColor = tx.amount >= 0 ? "text-gray-900" : "text-gray-700";
              return (
                <div key={tx.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                      <Icon name={tx.icon} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{tx.title}</div>
                      <div className="text-xs text-gray-400">{tx.category}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-sm font-semibold ${amountColor}`}>
                      {formatAmount(tx.amount)}
                    </div>
                    <div className={`text-xs ${changeClass} mt-1`}>
                      {tx.change > 0 ? `+${formatAmount(tx.change)}` : `${formatAmount(tx.change)}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// 		</div>
// 	);
// }

//export default Transaction;
