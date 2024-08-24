"use client";
import { useState } from "react";
import { AuthForm } from "@/components/AuthForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A45EDB_82%)]">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 px-4 rounded-lg ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        <AuthForm isLogin={isLogin} />
      </div>
    </div>
  );
}