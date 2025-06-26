import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "~/server/auth";

// Icons (same as main page for consistency)
const ICONS = {
  user: "👤",
  register: "📝",
  home: "🏠",
  back: "←",
};

export default async function Register() {
  const session = await auth();
  
  // If user is already signed in, redirect to dashboard
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Header - consistent with main page */}
      <header className="flex justify-between items-center p-4 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <span>{ICONS.user}</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">Personance</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
          >
            <span>{ICONS.home}</span>
            <span>Home</span>
          </Link>
        </div>
      </header>

      {/* Main content - registration form */}
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
            
            {/* Registration Form */}
            <form className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white rounded-md py-3 hover:bg-indigo-700 transition-colors"
              >
                <span>{ICONS.register}</span>
                <span>Create Account</span>
              </button>
            </form>
            
            {/* Back to Sign In Option */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
