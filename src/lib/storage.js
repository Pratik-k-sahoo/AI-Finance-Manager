export const storage = {
  getTransactions() {
    return [
      { category: "Food", amount: 500 },
      { category: "Shopping", amount: 200 },
    ];
  },

  getSettings() {
    return {
      currency: "₹",
    };
  },
};
