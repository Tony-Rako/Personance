import Link from "next/link";
import { auth } from "~/server/auth";
import { NavTabs } from "~/app/_components/layout/NavTabs";

// Icons (consistent with main page)
const ICONS = {
  user: "👤",
  up: "↑",
  down: "↓",
  cash: "💵",
  card: "💳",
  chart: "📊",
  budget: "📝",
  notification: "🔔",
  settings: "⚙️",
  home: "🏠",
};

// Define types for our budget data
interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  remaining: number;
  progress: number;
}

interface BudgetingSummary {
  totalBudgeted: number;
  totalSpent: number;
  totalRemaining: number;
  startDate: string;
  endDate: string;
}

export default async function BudgetingPage() {
  const session = await auth();

  // Mock budget data
  const budgetSummary: BudgetingSummary = {
    totalBudgeted: 3000,
    totalSpent: 1850,
    totalRemaining: 1150,
    startDate: "May 1, 2025",
    endDate: "May 31, 2025"
  };

  const budgetCategories: BudgetCategory[] = [
    {
      id: "1",
      name: "Housing",
      allocated: 1200,
      spent: 1200,
      remaining: 0,
      progress: 100
    },
    {
      id: "2",
      name: "Food",
      allocated: 600,
      spent: 350,
      remaining: 250,
      progress: 58
    },
    {
      id: "3",
      name: "Transportation",
      allocated: 200,
      spent: 120,
      remaining: 80,
      progress: 60
    },
    {
      id: "4",
      name: "Entertainment",
      allocated: 300,
      spent: 180,
      remaining: 120,
      progress: 60
    },
    {
      id: "5",
      name: "Utilities",
      allocated: 250,
      spent: 0,
      remaining: 250,
      progress: 0
    },
    {
      id: "6",
      name: "Personal",
      allocated: 450,
      spent: 0,
      remaining: 450,
      progress: 0
    }
  ];

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Header (consistent with main page) */}
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
              {session?.user?.name ? `${session.user.name}'s Budget` : "Personance Budget"}
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
            { name: "Budgeting", href: "/budgeting", icon: ICONS.budget },
            { name: "Wealth Tracking", href: "/wealth-tracking", icon: ICONS.chart }
          ]}
        />
      </div>

      {/* Main content */}
      <main className="container mx-auto py-6 px-4">
        {/* Budget Summary */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-l-4 border-indigo-500">
              <h2 className="font-bold text-lg">Budget Overview</h2>
              <p className="text-sm text-gray-500">
                {budgetSummary.startDate} - {budgetSummary.endDate}
              </p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-sm text-gray-500">Total Budgeted</h3>
                  <p className="text-2xl font-bold">${budgetSummary.totalBudgeted.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-sm text-gray-500">Total Spent</h3>
                  <p className="text-2xl font-bold text-red-500">${budgetSummary.totalSpent.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-sm text-gray-500">Remaining</h3>
                  <p className="text-2xl font-bold text-green-500">${budgetSummary.totalRemaining.toLocaleString()}</p>
                </div>
              </div>
              
              {/* Overall Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Budget Progress</span>
                  <span>{Math.round((budgetSummary.totalSpent / budgetSummary.totalBudgeted) * 100)}%</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600" 
                    style={{ width: `${Math.round((budgetSummary.totalSpent / budgetSummary.totalBudgeted) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Budget Categories */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-l-4 border-indigo-500 flex justify-between items-center">
            <h2 className="font-bold text-lg">Budget Categories</h2>
            <button className="text-indigo-500 hover:text-indigo-700 text-sm font-medium">+ Add Category</button>
          </div>
          
          <div className="p-4">
            <div className="space-y-6">
              {budgetCategories.map((category) => (
                <div key={category.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium">{category.name}</h3>
                    <div className="text-sm">
                      <span className="text-gray-500">
                        ${category.spent.toLocaleString()} of ${category.allocated.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Category Progress Bar */}
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-1">
                    <div 
                      className={`h-full ${
                        category.progress >= 100 
                          ? 'bg-red-500' 
                          : category.progress > 80 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(category.progress, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>${category.remaining.toLocaleString()} remaining</span>
                    <span>{category.progress}% used</span>
                  </div>
                </div>
              ))}
              
              {/* Add Category Placeholder */}
              <div className="border-t border-dashed pt-4 text-center">
                <button className="text-indigo-500 hover:text-indigo-700 text-sm">
                  + Add New Budget Category
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Spending Goals and Tips - Could add more sections below */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-l-4 border-green-500">
            <h2 className="font-bold text-lg">Spending Goals</h2>
          </div>
          <div className="p-6">
            <div className="bg-green-50 p-4 rounded-md mb-4 border-l-4 border-green-500">
              <h3 className="font-medium text-green-800">You're under budget!</h3>
              <p className="text-sm text-green-700 mt-1">
                You're currently $1,150 under your monthly budget. Great job keeping expenses in check!
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
              <h3 className="font-medium text-blue-800">Budget Tip</h3>
              <p className="text-sm text-blue-700 mt-1">
                Consider allocating your remaining funds toward savings or paying down debt to improve your financial health.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
