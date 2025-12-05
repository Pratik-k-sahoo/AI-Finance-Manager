// Transaction.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Wallet,
  Utensils,
  BringToFront,
  FireExtinguisher,
  ReceiptIndianRupee,
  ShoppingCart,
  Search as SearchIcon,
  ChevronsDown,
  ChevronDown,
} from "lucide-react";

/* ------------------------------------------
   INITIAL DATA
   ------------------------------------------ */
const INITIAL_TRANSACTIONS = [
  { id: 1, title: "Groceries", category: "Food", amount: 3150, change: -150, icon: "cart" },
  { id: 2, title: "Salary", category: "Income", amount: 3000, change: 3000, icon: "wallet" },
  { id: 3, title: "Electric Bill", category: "Bills", amount: -100, change: -100, icon: "bill" },
  { id: 4, title: "Restaurant", category: "Food", amount: -60, change: -60, icon: "utensils" },
  { id: 5, title: "Gas", category: "Transportation", amount: -40, change: -40, icon: "gas" },
];

const CATEGORIES = ["All", "Food", "Income", "Bills", "Transportation", "Shopping", "Other"];

/* ------------------------------------------
   ICON HANDLER
   ------------------------------------------ */
const Icon = ({ name, className = "w-5 h-5 text-gray-700" }) => {
  switch (name) {
    case "cart":
      return <ShoppingCart className={className} />;
    case "wallet":
      return <Wallet className={className} />;
    case "bill":
      return <ReceiptIndianRupee className={className} />;
    case "utensils":
      return <Utensils className={className} />;
    case "gas":
      return <FireExtinguisher className={className} />;
    default:
      return <BringToFront className={className} />;
  }
};

const formatAmount = (value) => {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  return `${sign}$${abs.toLocaleString()}`;
};

/* ------------------------------------------
   SEQUENTIAL ID GENERATOR (1,2,3,4...)
   ------------------------------------------ */
function getNextId(list) {
  if (!list || list.length === 0) return 1;
  return Math.max(...list.map((i) => i.id)) + 1;
}

/* ------------------------------------------
   Small UI wrappers (replace with shadcn/ui if you use it)
   ------------------------------------------ */
const Button = ({ children, variant = "default", className = "", ...props }) => {
  const variants = {
    default: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-50",
  };
  return (
    <button
      {...props}
      className={`px-3 py-2 rounded-md text-sm font-medium transition ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full px-3 py-2 rounded-md bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
  />
);

const Select = ({ children, className = "", ...props }) => (
  <select
    {...props}
    className={`w-full px-3 py-2 rounded-md bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
  >
    {children}
  </select>
);

/* ------------------------------------------
   MAIN COMPONENT
   ------------------------------------------ */
export default function Transaction() {
  // transactions state (persisted)
  const [transactions, setTransactions] = useState(() => {
    const raw = localStorage.getItem("transactions_v1");
    return raw ? JSON.parse(raw) : INITIAL_TRANSACTIONS;
  });

  // modal state for add
  const [isOpen, setIsOpen] = useState(false);

  // add-form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [formError, setFormError] = useState("");

  // FILTER / SORT / SEARCH state
  const [isFiltersOpen, setIsFiltersOpen] = useState(false); // accordion toggle
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, amountDesc, amountAsc

  // persist transactions to localStorage
  useEffect(() => {
    localStorage.setItem("transactions_v1", JSON.stringify(transactions));
  }, [transactions]);

  // open modal and reset form
  const openModal = () => {
    setTitle("");
    setCategory("Food");
    setAmount("");
    setFormError("");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormError("");
  };

  // Add transaction (append at end with sequential ID)
  const handleSave = (e) => {
    e.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError("Please enter a description.");
      return;
    }
    if (!category.trim()) {
      setFormError("Please select a category.");
      return;
    }
    if (amount === "" || isNaN(Number(amount))) {
      setFormError("Please enter a valid numeric amount.");
      return;
    }

    const parsed = Number(amount);
    const newTx = {
      id: getNextId(transactions), // sequential id
      title: title.trim(),
      category,
      amount: parsed,
      change: parsed,
      icon:
        category === "Food"
          ? "cart"
          : category === "Income"
          ? "wallet"
          : category === "Bills"
          ? "bill"
          : category === "Transportation"
          ? "gas"
          : "cart",
    };

    // Append at the end so IDs increase and list shows oldest->newest ordering by default
    setTransactions((prev) => [...prev, newTx]);
    closeModal();
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const resetFilters = () => {
    setSearch("");
    setFilterCategory("All");
    setMinAmount("");
    setMaxAmount("");
    setSortBy("newest");
  };

  // Create filtered + sorted list from transactions
  const visibleTransactions = useMemo(() => {
    let list = [...transactions];

    // Search (title, category, id, amount)
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((tx) => {
        return (
          tx.title.toLowerCase().includes(q) ||
          tx.category.toLowerCase().includes(q) ||
          String(tx.id).includes(q) ||
          String(tx.amount).includes(q)
        );
      });
    }

    // Category filter
    if (filterCategory && filterCategory !== "All") {
      list = list.filter((tx) => tx.category === filterCategory);
    }

    // Amount range filter (min)
    const min = minAmount === "" ? null : Number(minAmount);
    const max = maxAmount === "" ? null : Number(maxAmount);
    if (min !== null) {
      list = list.filter((tx) => tx.amount >= min);
    }
    if (max !== null) {
      list = list.filter((tx) => tx.amount <= max);
    }

    // Sorting
    switch (sortBy) {
      case "newest":
        // IDs increasing when appended; newest = largest ID -> show last first
        list.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        list.sort((a, b) => a.id - b.id);
        break;
      case "amountDesc":
        list.sort((a, b) => b.amount - a.amount);
        break;
      case "amountAsc":
        list.sort((a, b) => a.amount - b.amount);
        break;
      default:
        list.sort((a, b) => b.id - a.id);
    }

    return list;
  }, [transactions, search, filterCategory, minAmount, maxAmount, sortBy]);

  return (
    <div className="h-screen w-full bg-gray-50">
      {/* HEADER */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Transactions</h1>
            <p className="text-sm text-gray-500">Total: {transactions.length}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-2 py-1">
              <SearchIcon className="w-4 h-4 text-gray-400" />
              <input
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm outline-none"
              />
            </div>

            <Button
              onClick={() => navigator.clipboard.writeText(JSON.stringify(transactions, null, 2))}
              variant="default"
            >
              Export
            </Button>
            <Button variant="primary" onClick={openModal}>
              Add Transaction
            </Button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-6 h-[calc(100vh-72px)]">
        <div className="h-full bg-blue-50/40 rounded-2xl border border-blue-200 shadow-sm overflow-hidden flex flex-col">
          {/* Filters accordion */}
          <div className="px-6 py-3 border-b border-gray-200">
            <button
              onClick={() => setIsFiltersOpen((s) => !s)}
              className="w-full flex items-center justify-between gap-3 bg-white/60 px-4 py-3 rounded-lg border border-gray-100"
              aria-expanded={isFiltersOpen}
            >
              <div className="flex items-center gap-3">
                <ChevronsDown className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-800">Filters</span>
                <span className="text-sm text-gray-500"></span>
              </div>
              <div>
                <ChevronDown className={`w-5 h-5 text-gray-500 transform ${isFiltersOpen ? "rotate-180" : ""}`} />
              </div>
            </button>

            {/* Accordion content */}
            {isFiltersOpen && (
              <div className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                {/* Category */}
                <div className="md:col-span-3">
                  <label className="block text-xs text-gray-600 mb-1">Category</label>
                  <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* Min Amount */}
                <div className="md:col-span-3">
                  <label className="block text-xs text-gray-600 mb-1">Min Amount</label>
                  <Input
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    placeholder="e.g., -100"
                    type="number"
                  />
                </div>

                {/* Max Amount */}
                <div className="md:col-span-3">
                  <label className="block text-xs text-gray-600 mb-1">Max Amount</label>
                  <Input
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    placeholder="e.g., 5000"
                    type="number"
                  />
                </div>

                {/* Sort */}
                <div className="md:col-span-3">
                  <label className="block text-xs text-gray-600 mb-1">Sort</label>
                  <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="newest">Type</option>
                    <option value="newest">Newest  </option>
                    <option value="oldest">Oldest </option>
                    <option value="amountDesc">Highest Amount </option>
                    <option value="amountAsc">Lowest Amount</option>
                  </Select>
                </div>

                {/* Buttons row */}
                <div className="md:col-span-12 flex gap-3 justify-end">
                  <Button variant="ghost" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Header row */}
          <div className="px-6 py-3 border-b border-gray-200 hidden md:flex items-center text-sm text-gray-600">
            <div className="w-1/2">Description</div>
            <div className="w-1/4">Category</div>
            <div className="w-1/4 text-right">Amount</div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-auto">
            <ul className="divide-y divide-gray-200">
              {visibleTransactions.map((tx) => (
                <li key={tx.id} className="px-6 py-4">
                  <div className="md:flex md:items-center md:gap-4">
                    <div className="md:w-1/2 flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl border">
                        <Icon name={tx.icon} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">{tx.title}</div>
                        <div className="text-xs text-gray-400">ID #{tx.id}</div>
                      </div>
                    </div>

                    <div className="md:w-1/4 text-sm text-gray-700 mt-3 md:mt-0">{tx.category}</div>

                    <div className="md:w-1/4 text-right mt-3 md:mt-0">
                      <div className={`text-sm font-semibold ${tx.amount >= 0 ? "text-gray-900" : "text-gray-600"}`}>
                        {formatAmount(tx.amount)}
                      </div>
                      <div className={`text-xs mt-1 ${tx.change > 0 ? "text-green-600" : "text-red-500"}`}>
                        {tx.change > 0 ? `+${formatAmount(tx.change)}` : `${formatAmount(tx.change)}`}
                      </div>
                      <div className="mt-2">
                        <button onClick={() => handleDelete(tx.id)} className="text-xs text-red-500 hover:underline">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}

              {visibleTransactions.length === 0 && (
                <li className="px-6 py-8 text-center text-gray-500">No matching results found.</li>
              )}
            </ul>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">Showing {visibleTransactions.length} items</div>
            <div className="text-sm text-gray-500">Total: {transactions.length}</div>
          </div>
        </div>
      </main>

      {/* Modal: Add Transaction */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal}></div>

          <div className="relative w-full max-w-lg bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Transaction</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form className="grid gap-4" onSubmit={handleSave}>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Coffee, Rent" />
              </div>

              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Amount</label>
                <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Use negative for expenses" />
              </div>

              {formError && <div className="text-sm text-red-500">{formError}</div>}

              <div className="flex justify-end gap-3 mt-4">
                <Button onClick={closeModal}>Cancel</Button>
                <Button type="submit" variant="primary">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
