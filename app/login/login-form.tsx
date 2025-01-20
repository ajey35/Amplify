'use client'

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginForm({ providers }: { providers: any }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (providerId: string) => {
    setIsLoading(true);
    try {
      await signIn(providerId,{callbackUrl:"/"});
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!providers) {
    return (
      <div className="text-center text-red-400">
        <p>No authentication providers available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.values(providers).map((provider: any) => (
        <button
          key={provider.id}
          onClick={() => handleSignIn(provider.id)}
          disabled={isLoading}
          className="w-full px-6 py-3 text-white bg-green-600 rounded-full font-semibold text-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing in..." : `Sign in with ${provider.name}`}
        </button>
      ))}
    </div>
  );
}

