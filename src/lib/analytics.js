export const analytics = {
  getExpensesByCategory(transactions) {
    return transactions.map((t) => ({
      category: t.category,
      amount: t.amount,
      percentage: 50, // dummy percent
    }));
  },

  getMonthlyTrend() {
    return [
      { month: "Jan", savings: 200 },
      { month: "Feb", savings: 150 },
      { month: "Mar", savings: 120 },
    ];
  }
};
