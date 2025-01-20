import { getProviders } from "next-auth/react";
import { Suspense } from "react";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const providers = await getProviders();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="w-full max-w-md p-10 space-y-8 bg-gray-950 rounded-2xl shadow-lg border border-gray-800">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto overflow-hidden rounded-full shadow-md border-4 border-green-500">
            <img
              className="w-full h-full object-cover"
              src="https://tse4.mm.bing.net/th?id=OIP.1AU_I8suoeFOHb_l_pkTVAHaEE&pid=Api&P=0&h=180#"
              alt="Spotify Logo"
            />
          </div>
          <h1 className="mt-6 text-4xl font-extrabold text-green-400">
            Welcome to Amplify
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to start your musical journey
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
          <LoginForm providers={providers} />
        </Suspense>
      </div>
    </div>
  );
}
