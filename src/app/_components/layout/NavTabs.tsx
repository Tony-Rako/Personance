"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

interface TabItem {
  name: string;
  href: string;
  icon?: string;
}

interface NavTabsProps {
  tabs: TabItem[];
}

export const NavTabs: React.FC<NavTabsProps> = ({ tabs }) => {
  const pathname = usePathname();

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8 px-4" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`
                flex items-center whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
                ${isActive 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

// For component traceability in React DevTools
NavTabs.displayName = "NavTabs";
