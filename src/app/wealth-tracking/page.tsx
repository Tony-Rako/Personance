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
  wealth: "💰",
  stock: "📈",
  notification: "🔔",
  settings: "⚙️",
  home: "🏠",
};

// Define types for wealth tracking data
interface AssetItem {
  id: string;
  name: string;
  value: number;
  growthRate: number;
  lastUpdated: string;
  type: 'stock' | 'real-estate' | 'cash' | 'other';
}

interface AssetGroup {
  name: string;
  totalValue: number;
  percentOfTotal: number;
  items: AssetItem[];
}

interface WealthSummary {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  monthlyChange: number;
  monthlyChangePercent: number;
  yearlyChange: number;
  yearlyChangePercent: number;
}

export default async function WealthTrackingPage() {
  const session = await auth();

  // Mock wealth tracking data
  const wealthSummary: WealthSummary = {
    totalAssets: 325000,
    totalLiabilities: 185000,
    netWorth: 140000,
    monthlyChange: 3500,
    monthlyChangePercent: 2.56,
    yearlyChange: 22000,
    yearlyChangePercent: 18.64
  };

  const assetGroups: AssetGroup[] = [
    {
      name: "Real Estate",
      totalValue: 250000,
      percentOfTotal: 76.92,
      items: [
        {
          id: "1",
          name: "Primary Home",
          value: 250000,
          growthRate: 5.2,
          lastUpdated: "Apr 30, 2025",
          type: 'real-estate'
        }
      ]
    },
    {
      name: "Investments",
      totalValue: 45000,
      percentOfTotal: 13.85,
      items: [
        {
          id: "2",
          name: "S&P 500 Index Fund",
          value: 25000,
          growthRate: 12.5,
          lastUpdated: "May 16, 2025",
          type: 'stock'
        },
        {
          id: "3",
          name: "Tech Growth ETF",
          value: 15000,
          growthRate: 15.8,
          lastUpdated: "May 16, 2025",
          type: 'stock'
        },
        {
          id: "4",
          name: "Bond Fund",
          value: 5000,
          growthRate: 3.2,
          lastUpdated: "May 16, 2025",
          type: 'stock'
        }
      ]
    },
    {
      name: "Cash & Equivalents",
      totalValue: 30000,
      percentOfTotal: 9.23,
      items: [
        {
          id: "5",
          name: "Emergency Fund",
          value: 15000,
          growthRate: 0.5,
          lastUpdated: "May 16, 2025",
          type: 'cash'
        },
        {
          id: "6",
          name: "Checking Account",
          value: 5000,
          growthRate: 0,
          lastUpdated: "May 16, 2025",
          type: 'cash'
        },
        {
          id: "7",
          name: "Savings Account",
          value: 10000,
          growthRate: 0.65,
          lastUpdated: "May 16, 2025",
          type: 'cash'
        }
      ]
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
              {session?.user?.name ? `${session.user.name}'s Wealth` : "Personance Wealth"}
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
            { name: "Wealth Tracking", href: "/wealth-tracking", icon: ICONS.wealth }
          ]}
        />
      </div>

      {/* Main content */}
      <main className="container mx-auto py-6 px-4">
        {/* Wealth Summary */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-l-4 border-purple-500">
              <h2 className="font-bold text-lg">Net Worth Overview</h2>
              <p className="text-sm text-gray-500">
                Updated as of May 17, 2025
              </p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-sm text-gray-500">Total Assets</h3>
                  <p className="text-2xl font-bold text-green-600">${wealthSummary.totalAssets.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-sm text-gray-500">Total Liabilities</h3>
                  <p className="text-2xl font-bold text-red-500">${wealthSummary.totalLiabilities.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-sm text-gray-500">Net Worth</h3>
                  <p className="text-2xl font-bold">${wealthSummary.netWorth.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-sm text-gray-500">Monthly Change</h3>
                  <div className="flex items-center">
                    <p className={`text-2xl font-bold ${wealthSummary.monthlyChange >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {wealthSummary.monthlyChange >= 0 ? '+' : ''}{wealthSummary.monthlyChange.toLocaleString()}
                    </p>
                    <span className={`ml-1 text-sm ${wealthSummary.monthlyChange >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      ({wealthSummary.monthlyChange >= 0 ? '+' : ''}{wealthSummary.monthlyChangePercent}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Asset Allocation Chart (simplified version using divs) */}
              <div className="mt-8">
                <h3 className="font-medium mb-2">Asset Allocation</h3>
                <div className="h-8 flex rounded-md overflow-hidden mb-2">
                  {assetGroups.map((group, index) => (
                    <div 
                      key={index}
                      className={`h-full ${
                        index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-purple-500' : 
                        index === 2 ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${group.percentOfTotal}%` }}
                      title={`${group.name}: ${group.percentOfTotal}%`}
                    ></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  {assetGroups.map((group, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-1 ${
                        index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-purple-500' : 
                        index === 2 ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                      <span className="text-xs">{group.name} ({group.percentOfTotal}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Asset Groups */}
        {assetGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="bg-white rounded-lg shadow-md overflow-hidden mb-8 last:mb-0">
            <div className="p-4 border-l-4 border-blue-500 flex justify-between items-center">
              <div>
                <h2 className="font-bold text-lg">{group.name}</h2>
                <p className="text-sm text-gray-500">${group.totalValue.toLocaleString()}</p>
              </div>
              <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">+ Add Asset</button>
            </div>
            
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-gray-500 text-sm">Name</th>
                    <th className="text-right py-2 text-gray-500 text-sm">Value</th>
                    <th className="text-right py-2 text-gray-500 text-sm">Growth</th>
                    <th className="text-right py-2 text-gray-500 text-sm">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((asset) => (
                    <tr key={asset.id} className="border-b hover:bg-gray-50 cursor-pointer">
                      <td className="py-3 flex items-center">
                        <span className="mr-2">
                          {asset.type === 'stock' ? ICONS.stock : 
                           asset.type === 'real-estate' ? ICONS.home :
                           asset.type === 'cash' ? ICONS.cash : ICONS.wealth}
                        </span>
                        {asset.name}
                      </td>
                      <td className="py-3 text-right font-medium">
                        ${asset.value.toLocaleString()}
                      </td>
                      <td className={`py-3 text-right font-medium ${
                        asset.growthRate > 0 ? 'text-green-500' : 
                        asset.growthRate < 0 ? 'text-red-500' : 'text-gray-500'
                      }`}>
                        {asset.growthRate > 0 ? '+' : ''}{asset.growthRate}%
                      </td>
                      <td className="py-3 text-right text-gray-500 text-sm">
                        {asset.lastUpdated}
                      </td>
                    </tr>
                  ))}
                  
                  {/* Empty placeholder row */}
                  <tr className="border-b border-dashed">
                    <td colSpan={4} className="py-2 text-center text-gray-400 text-sm">
                      Click to add new {group.name.toLowerCase()} asset
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
        
        {/* Performance Metrics */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-l-4 border-green-500">
            <h2 className="font-bold text-lg">Performance Metrics</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-2">Yearly Performance</h3>
                <div className="flex items-baseline">
                  <span className={`text-2xl font-bold ${wealthSummary.yearlyChange >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {wealthSummary.yearlyChange >= 0 ? '+' : ''}{wealthSummary.yearlyChangePercent}%
                  </span>
                  <span className="ml-2 text-gray-500">
                    (${wealthSummary.yearlyChange.toLocaleString()})
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Year-over-year change in net worth</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-2">Financial Independence</h3>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-blue-600">35%</span>
                  <span className="text-xs text-gray-500">Progress toward financial freedom goal of $400,000</span>
                  
                  {/* Progress bar */}
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500"
                      style={{ width: '35%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
