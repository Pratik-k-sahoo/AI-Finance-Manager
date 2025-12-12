import React from 'react'
import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TrendingUp,TrendingDown, PieChart as PieChartIcon } from 'lucide-react';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { storage } from '@/lib/storage';
import { analytics } from '@/lib/analytics';

const fallbackTransactions = [
  { id: "1", type: "expense", category: "Food", amount: 450, date: "2025-07-15", description: "Groceries" },
  { id: "2", type: "expense", category: "Travel", amount: 280, date: "2025-07-20", description: "Uber rides" },
  { id: "3", type: "expense", category: "Shopping", amount: 320, date: "2025-08-05", description: "Clothes" },
  { id: "4", type: "expense", category: "Entertainment", amount: 150, date: "2025-08-12", description: "Movies & Games" },
  { id: "5", type: "expense", category: "Utilities", amount: 200, date: "2025-09-01", description: "Electric bill" },
  { id: "6", type: "income", category: "Salary", amount: 5000, date: "2025-07-01", description: "Monthly salary" },
  { id: "7", type: "income", category: "Salary", amount: 5000, date: "2025-08-01", description: "Monthly salary" },
  { id: "8", type: "income", category: "Salary", amount: 5000, date: "2025-09-01", description: "Monthly salary" },
  { id: "9", type: "income", category: "Freelance", amount: 800, date: "2025-08-15", description: "Side project" },
  { id: "10", type: "expense", category: "Food", amount: 380, date: "2025-08-20", description: "Restaurants" },
  { id: "11", type: "expense", category: "Travel", amount: 450, date: "2025-09-10", description: "Weekend trip" },
  { id: "12", type: "expense", category: "Shopping", amount: 180, date: "2025-09-15", description: "Electronics" },
  { id: "13", type: "income", category: "Salary", amount: 5000, date: "2025-10-01", description: "Monthly salary" },
  { id: "14", type: "expense", category: "Food", amount: 420, date: "2025-10-08", description: "Groceries" },
  { id: "15", type: "expense", category: "Entertainment", amount: 220, date: "2025-10-20", description: "Concert" },
  { id: "16", type: "income", category: "Salary", amount: 5000, date: "2025-11-01", description: "Monthly salary" },
  { id: "17", type: "expense", category: "Utilities", amount: 250, date: "2025-11-05", description: "Gas & Electric" },
  { id: "18", type: "expense", category: "Food", amount: 500, date: "2025-11-15", description: "Holiday groceries" },
  { id: "19", type: "income", category: "Bonus", amount: 2000, date: "2025-11-30", description: "Year-end bonus" },
  { id: "20", type: "expense", category: "Travel", amount: 600, date: "2025-12-01", description: "Holiday travel" },
];
const fallbackCategoryData = [
  { category: "Food", amount: 1750, percentage: 35, fill: "hsl(var(--chart-1))" },
  { category: "Travel", amount: 1330, percentage: 27, fill: "hsl(var(--chart-2))" },
  { category: "Shopping", amount: 500, percentage: 10, fill: "hsl(var(--chart-3))" },
  { category: "Entertainment", amount: 370, percentage: 7, fill: "hsl(var(--chart-4))" },
  { category: "Utilities", amount: 450, percentage: 9, fill: "hsl(var(--chart-5))" },
];

const fallbackMonthlyData = [
  { month: "Jul 2025", income: 5000, expense: 730, savings: 4270 },
  { month: "Aug 2025", income: 5800, expense: 900, savings: 4900 },
  { month: "Sep 2025", income: 5000, expense: 830, savings: 4170 },
  { month: "Oct 2025", income: 5000, expense: 640, savings: 4360 },
  { month: "Nov 2025", income: 7000, expense: 750, savings: 6250 },
  { month: "Dec 2025", income: 5000, expense: 600, savings: 4400 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-card-foreground mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color || "inherit" }}>
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};


function Analytics() {
  const transactions = storage.getTransactions();
  const settings = storage.getSettings();

  const chartData = useMemo(() => {
    const categoryData = analytics.getExpensesByCategory(transactions);
    const monthlyData = analytics.getMonthlyTrend(transactions, 6);

    return { categoryData, monthlyData };
  }, [transactions]);
  
  const topCategory = chartData.categoryData[0];



    const categoryData = useMemo(() => {
    const data = analytics.getCategoryData ? analytics.getCategoryData(transactions) : [];
    return data && data.length > 0 ? data : fallbackCategoryData;
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const data = analytics.getMonthlyData ? analytics.getMonthlyData(transactions) : [];
    return data && data.length > 0 ? data : fallbackMonthlyData;
  }, [transactions]);

  return (
    <div className="min-h-[calc(100vh-4.05rem)] bg-linear-to-br from-primary/5 via-background to-secondary/5">
      <main className="container mx-auto px-4 py-8 space-y-6">
         <div className="space-y-1 mb-6">
        <h2 className="text-4xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Deep dive into your spending patterns and trends
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
            <CardAction>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent>
             <p className="text-2xl font-bold">{transactions.length}</p>
             <p className="text-sm text-muted-foreground">All time</p>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle>Highest Expense Category</CardTitle>
            <CardAction>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {topCategory ? topCategory.category : "N/A"}
            </p>
            <p className="text-sm text-muted-foreground">
              {topCategory
                ? `${settings.currency}${topCategory.amount.toLocaleString()}`
                : "No data"}
            </p>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle>Avg. Monthly Savings</CardTitle>
            <CardAction>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {settings.currency}
              {chartData.monthlyData.length > 0
                ? Math.round(
                    chartData.monthlyData.reduce((s, m) => s + m.savings, 0) /
                      chartData.monthlyData.length
                  )
                : "0"}
            </p>
            <p className="text-sm text-muted-foreground">Last 6 months</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-chart-1/10">
                  <PieChartIcon className="h-4 w-4 text-chart-1" />
                </div>
                <div>
                  <CardTitle className="text-lg">Spending by Category</CardTitle>
                  <CardDescription>Distribution of your expenses</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%" >
                    <PieChart>
                      <Pie 
                        data={categoryData}
                        cx="50%"
                        cy="45%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="amount"
                        nameKey="catagory"
                        label={(entry) => `${entry.category} ${entry.percentage}%`}
                      labelLine={false}
                      >
                         {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                        
                      </Pie>
                      <Tooltip  content={<CustomTooltip />} />
                    </PieChart>

                  </ResponsiveContainer>
              </div>
            </CardContent>
        </Card>

      </div>
    </main>
  </div>
)
}

export default Analytics