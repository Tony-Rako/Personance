import Link from "next/link";
import { redirect } from "next/navigation";

import { auth, signIn } from "~/server/auth";

// Icons (same as main page for consistency)
const ICONS = {
  user: "👤",
  google: "🔍",
  email: "✉️",
  register: "📝",
  home: "🏠",
};

export default async function SignIn() {
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

      {/* Main content - sign in options */}
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Sign In to Your Account</h2>
            
            {/* Sign in with Google */}
            <form 
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/" });
              }}
              className="mb-4"
            >
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-800 rounded-md py-3 hover:bg-gray-50 transition-colors"
              >
                <span>{ICONS.google}</span>
                <span>Sign in with Google</span>
              </button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            {/* Sign in with Email Form */}
            <form className="space-y-4 mb-6">
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
                  autoComplete="current-password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white rounded-md py-3 hover:bg-indigo-700 transition-colors"
              >
                <span>{ICONS.email}</span>
                <span>Sign in with Email</span>
              </button>
            </form>
            
            {/* Register Option */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Register now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
