import Link from "next/link";

import { auth } from "~/server/auth";
import { NavTabs } from "~/app/_components/layout/NavTabs";
// Icons (we'll use emoji for now, but you could replace these with proper icons from a library)
const ICONS = {
  user: "👤",
  up: "↑",
  down: "↓",
  cash: "💵",
  card: "💳",
  chart: "📊",
  notification: "🔔",
  settings: "⚙️",
  home: "🏠",
};

// Define types for our financial data
interface FinancialData {
  balance: number;
  passiveIncome: number;
  passiveIncomeTarget: number;
  cash: number;
  totalIncome: number;
  totalExpenses: number;
  payday: number;
  incomeData: IncomeItem[];
  expenseData: ExpenseItem[];
  transactions: Transaction[];
  assetData: AssetCategory[];
  liabilityData: (LiabilityItem | LiabilityCategory)[];
}

interface IncomeItem {
  source: string;
  amount: number | null;
}

interface ExpenseItem {
  item: string;
  amount: number;
}

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface AssetCategory {
  category: string;
  label: string;
  items: AssetItem[];
}

interface AssetItem {
  name: string;
  value: number;
}

interface LiabilityItem {
  item: string;
  amount: number;
}

interface LiabilityCategory {
  category: string;
  label: string;
  items: LiabilityItem[];
}

export default async function Home() {
  const session = await auth();

  // Mock values for demonstration
  const mockData: FinancialData = {
    balance: 2589.50,
    passiveIncome: 0,
    passiveIncomeTarget: 2000,
    cash: 520,
    totalIncome: 3000,
    totalExpenses: -1880,
    payday: 1120,
    incomeData: [
      { source: "Police Officer Salary", amount: 3000 },
      { source: "Interest/Dividends", amount: null },
      { source: "Real Estate/Business", amount: null },
    ],
    expenseData: [
      { item: "Taxes", amount: 580 },
      { item: "Home Mortgage Payment", amount: 400 },
      { item: "Car Loan Payment", amount: 100 },
      { item: "Credit Card Payment", amount: 60 },
      { item: "Retail Payment", amount: 50 },
      { item: "Other Expenses", amount: 690 },
    ],
    transactions: [
      { 
        id: "1", 
        type: "expense", 
        description: "Grocery", 
        amount: -50.68, 
        date: "Aug 26", 
        category: "Eataly downtown" 
      },
      { 
        id: "2", 
        type: "expense", 
        description: "Transport", 
        amount: -6.00, 
        date: "Aug 26", 
        category: "UBER Pool" 
      },
      { 
        id: "3", 
        type: "income", 
        description: "Payment", 
        amount: 650.00, 
        date: "Aug 25", 
        category: "Payment from Andre" 
      },
    ],
    assetData: [
      { category: "Stocks/Funds/CDs", label: "Cost/Share", items: [] },
      { category: "Real Estate/Business", label: "Cost", items: [] },
    ],
    liabilityData: [
      { item: "Home Mortgage", amount: 46000 },
      { item: "Car Loans", amount: 5000 },
      { item: "Credit Cards", amount: 2000 },
      { item: "Retail Debt", amount: 1000 },
      { category: "Real Estate/Business", label: "Liability", items: [] },
    ],
  };
  
  // Calculate progress percentage for passive income
  const progressPercent = Math.min((mockData.passiveIncome / mockData.passiveIncomeTarget) * 100, 100);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Modern Dashboard Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            {session?.user?.image ? (
              <img src={session.user.image} alt="Profile" className="h-10 w-10 rounded-full" />
            ) : (
              <span>{ICONS.user}</span>
            )}
          </div>
          <div>
            <h1 className="font-bold text-lg">
              {session?.user?.name ? `Welcome, ${session.user.name}` : "Welcome To Your Dashboard"}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-full">
            <span>{ICONS.notification}</span>
          </div>
          <div className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-full">
            <span>{ICONS.settings}</span>
          </div>
          <Link
            href={session ? "/api/auth/signout" : "/sign-in"}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="container mx-auto">
        <NavTabs 
          tabs={[
            { name: "Dashboard", href: "/" },
            { name: "Budgeting", href: "/budgeting", icon: ICONS.cash },
            { name: "Wealth Tracking", href: "/wealth-tracking", icon: ICONS.chart }
          ]}
        />
      </div>
      
      {/* Main content - modern dashboard layout */}
      <main className="container mx-auto py-6 px-4">
        {/* ROW 1: Two-column layout with Income/Expense on left and Passive Income on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* COLUMN 1: Income and Expenses (Left) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Income section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-l-4 border-green-500 flex justify-between items-center">
                <h3 className="font-bold text-lg">Income</h3>
                <button className="text-green-500 hover:text-green-700 text-sm font-medium">+ Add</button>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-gray-500 text-sm">Source</th>
                      <th className="text-right py-2 text-gray-500 text-sm">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.incomeData.map((income: IncomeItem, index: number) => (
                      <tr key={`income-${index}`} className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="py-3">{income.source}</td>
                        <td className="py-3 text-right font-medium">
                          {income.amount !== null ? `$${income.amount.toLocaleString()}` : ''}
                        </td>
                      </tr>
                    ))}
                    {/* Empty placeholder row */}
                    <tr className="border-b border-dashed">
                      <td colSpan={2} className="py-2 text-center text-gray-400 text-sm">
                        Click to add new income source
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Expenses section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-l-4 border-red-500 flex justify-between items-center">
                <h3 className="font-bold text-lg">Expenses</h3>
                <button className="text-red-500 hover:text-red-700 text-sm font-medium">+ Add</button>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-gray-500 text-sm">Item</th>
                      <th className="text-right py-2 text-gray-500 text-sm">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.expenseData.map((expense: ExpenseItem, index: number) => (
                      <tr key={`expense-${index}`} className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="py-3">{expense.item}</td>
                        <td className="py-3 text-right font-medium text-red-500">
                          ${expense.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {/* Empty placeholder row */}
                    <tr className="border-b border-dashed">
                      <td colSpan={2} className="py-2 text-center text-gray-400 text-sm">
                        Click to add new expense
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Passive Income Section (Right) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
              {/* Passive Income Section */}
              <div className="p-6 h-full flex flex-col">
                <div className="mb-3 flex flex-col md:justify-between md:items-center">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">
                    Increase Passive Income To Escape The Rat Race
                  </h2>
                  <div className="bg-blue-50 text-blue-700 py-1 px-3 rounded-full text-sm font-medium self-end">
                    ${mockData.passiveIncome} of ${mockData.passiveIncomeTarget}
                  </div>
                </div>
                
                {/* Interactive Progress Bar */}
                <div className="mb-6 relative">
                  <div className="h-6 bg-gray-200 rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  {/* Pointer */}
                  <div 
                    className="absolute top-0 transform -translate-y-full"
                    style={{ left: `${progressPercent}%` }}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium bg-gray-800 text-white px-2 py-1 rounded mb-1">
                        ${mockData.passiveIncome}
                      </span>
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-gray-500">Passive Income</span>
                  </div>
                </div>
                
                {/* Financial Summary Cards */}
                <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <h4 className="text-xs text-gray-500 uppercase">Cash</h4>
                    <p className="text-lg font-bold text-gray-800">${mockData.cash.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <h4 className="text-xs text-gray-500 uppercase">Total Income</h4>
                    <p className="text-lg font-bold text-green-600">${mockData.totalIncome.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <h4 className="text-xs text-gray-500 uppercase">Total Expenses</h4>
                    <p className="text-lg font-bold text-red-600">-${Math.abs(mockData.totalExpenses).toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <h4 className="text-xs text-gray-500 uppercase">Payday</h4>
                    <p className="text-lg font-bold text-blue-600">${mockData.payday.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: Assets and Liabilities */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Assets Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-l-4 border-blue-500 flex justify-between items-center">
              <h3 className="font-bold text-lg">Assets</h3>
              <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">Manage</button>
            </div>
            <div className="p-4">
              {mockData.assetData.map((category: AssetCategory, catIndex: number) => (
                <div key={`asset-category-${catIndex}`} className="mb-4">
                  <div className="flex justify-between border-b py-2">
                    <span className="font-medium">{category.category}</span>
                    <span className="font-medium">{category.label} {category.label === "Cost/Share" && "▲"}</span>
                  </div>
                  {/* Interactive placeholder for adding new assets */}
                  <div className="py-3 text-center text-gray-400 hover:bg-gray-50 cursor-pointer border-b border-dashed">
                    <span className="text-sm">+ Add {category.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Liabilities Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-l-4 border-yellow-500 flex justify-between items-center">
              <h3 className="font-bold text-lg">Liabilities</h3>
              <button className="text-yellow-500 hover:text-yellow-700 text-sm font-medium">Manage</button>
            </div>
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-gray-500 text-sm">Item</th>
                    <th className="text-right py-2 text-gray-500 text-sm">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.liabilityData.filter((item): item is LiabilityItem => 'item' in item).map((liability: LiabilityItem, index: number) => (
                    <tr key={`liability-${index}`} className="border-b hover:bg-gray-50 cursor-pointer">
                      <td className="py-3">{liability.item}</td>
                      <td className="py-3 text-right font-medium text-yellow-600">
                        ${liability.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {/* Empty placeholder row */}
                  <tr className="border-b border-dashed">
                    <td colSpan={2} className="py-2 text-center text-gray-400 text-sm">
                      Click to add new liability
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

