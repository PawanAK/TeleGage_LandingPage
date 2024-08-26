"use client";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock, FaWallet } from 'react-icons/fa';

export const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginMethod, setLoginMethod] = useState<"credentials" | "wallet">("credentials");
    const [petraAddress, setPetraAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    
    const router = useRouter();

    const getAptosWallet = () => {
        if ('aptos' in window) {
          return window.aptos;
        } else {
          window.open('https://petra.app/', `_blank`);
        }
    };

    const wallet = getAptosWallet();
    
    const connectPetra = async () => {
      if (typeof window !== "undefined" && window.aptos) {
        try {
          const response = await wallet.connect();
          console.log("Petra wallet connected, address:", response.address);
          setPetraAddress(response.address);
          localStorage.setItem('petraAddress', response.address);
        } catch (error) {
          console.error("Failed to connect to Petra wallet:", error);
        }
      } else {
        window.open('https://petra.app/', '_blank');
      }
    };

    const disconnectPetra = async () => {
        await wallet.disconnect();
        setPetraAddress('');
        localStorage.removeItem('petraAddress');
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (isLogin) {
          if (loginMethod === "wallet") {
            const response = await axios.post('http://localhost:3001/api/login', { walletAddress: petraAddress });
            console.log("Login with wallet successful", response.data);
            setSuccessMessage(response.data.message);
            setErrorMessage("");
            localStorage.setItem('user', JSON.stringify({ username, walletAddress: petraAddress }));
            router.push('/dashboard');
          } else {
            const response = await axios.post('http://localhost:3001/api/login', { username, password });
            console.log("Login with credentials successful", response.data);
            setSuccessMessage(response.data.message);
            setErrorMessage("");
            localStorage.setItem('user', JSON.stringify({ username, walletAddress: petraAddress }));
            router.push('/dashboard');
          }
        } else {
          if (petraAddress && username && password) {
            const response = await axios.post('http://localhost:3001/api/signup', { username, password, walletAddress: petraAddress });
            console.log("Sign Up successful", response.data);
            setSuccessMessage(response.data.message);
            setErrorMessage("");
            localStorage.setItem('user', JSON.stringify({ username, walletAddress: petraAddress }));
          } else {
            setErrorMessage("Please fill all fields and connect wallet for signup");
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Authentication error:", error.response?.data.message);
          setErrorMessage(error.response?.data.message || "An error occurred");
        } else {
          console.error("Authentication error:", error);
          setErrorMessage("An error occurred");
        }
        setSuccessMessage("");
      }
    };

    useEffect(() => {
      const storedAddress = localStorage.getItem('petraAddress');
      if (storedAddress) {
        setPetraAddress(storedAddress);
      }
    }, []);

    return (
        <div className="bg-gray-900 p-8 rounded-xl shadow-2xl max-w-md w-full mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                {isLogin ? "Welcome Back" : "Join Us"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {isLogin && (
                    <div className="flex space-x-4 mb-6">
                        <button
                            type="button"
                            onClick={() => setLoginMethod("credentials")}
                            className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${loginMethod === "credentials" ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                            <FaUser className="inline-block mr-2" />
                            Credentials
                        </button>
                        <button
                            type="button"
                            onClick={() => setLoginMethod("wallet")}
                            className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${loginMethod === "wallet" ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                            <FaWallet className="inline-block mr-2" />
                            Wallet
                        </button>
                    </div>
                )}
                
                {(!isLogin || (isLogin && loginMethod === "credentials")) && (
                    <>
                        <div className="relative">
                            <FaUser className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 pl-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                placeholder="Username"
                                required
                            />
                        </div>
                        <div className="relative">
                            <FaLock className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 pl-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                placeholder="Password"
                                required
                            />
                        </div>
                    </>
                )}
                
                {(!isLogin || (isLogin && loginMethod === "wallet")) && (
                    <div className="space-y-4">
                        <button 
                            type="button" 
                            onClick={petraAddress ? disconnectPetra : connectPetra} 
                            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-all duration-300 flex items-center justify-center"
                        >
                            <FaWallet className="mr-2" />
                            {petraAddress 
                                ? `Connected: ${petraAddress.slice(0, 6)}...${petraAddress.slice(-4)}` 
                                : "Connect Petra Wallet"}
                        </button>
                        {petraAddress && (
                            <button 
                                type="button" 
                                onClick={disconnectPetra}
                                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-300"
                            >
                                Disconnect Wallet
                            </button>
                        )}
                    </div>
                )}
                
                {errorMessage && <div className="text-red-500 text-sm bg-red-100 border border-red-400 rounded-lg p-2">{errorMessage}</div>}
                {successMessage && <div className="text-green-500 text-sm bg-green-100 border border-green-400 rounded-lg p-2">{successMessage}</div>}
                <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                    disabled={!isLogin && (!petraAddress || !username || !password)}
                >
                    {isLogin ? "Login" : "Sign Up"}
                </button>
            </form>
        </div>
    );
};