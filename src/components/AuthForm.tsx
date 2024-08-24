"use client";
import { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import axios from 'axios';

export const AuthForm = ({ isLogin }: { isLogin: boolean }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginMethod, setLoginMethod] = useState<"credentials" | "wallet">("credentials");
    const [petraAddress, setPetraAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    
    const { connect, disconnect, account, connected } = useWallet();

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
          } else {
            const response = await axios.post('http://localhost:3001/api/login', { username, password });
            console.log("Login with credentials successful", response.data);
            setSuccessMessage(response.data.message);
            setErrorMessage("");
          }
        } else {
          if (petraAddress && username && password) {
            const response = await axios.post('http://localhost:3001/api/signup', { username, password, walletAddress: petraAddress });
            console.log("Sign Up successful", response.data);
            setSuccessMessage(response.data.message);
            setErrorMessage("");
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
        <form onSubmit={handleSubmit} className="space-y-6">
            {isLogin && (
                <div className="flex space-x-4 mb-4">
                    <button
                        type="button"
                        onClick={() => setLoginMethod("credentials")}
                        className={`flex-1 py-2 px-4 rounded-lg ${loginMethod === "credentials" ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    >
                        Username & Password
                    </button>
                    <button
                        type="button"
                        onClick={() => setLoginMethod("wallet")}
                        className={`flex-1 py-2 px-4 rounded-lg ${loginMethod === "wallet" ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    >
                        Wallet
                    </button>
                </div>
            )}
            
            {(!isLogin || (isLogin && loginMethod === "credentials")) && (
                <>
                    <div>
                        <label htmlFor="username" className="block mb-1 text-sm font-medium">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                </>
            )}
            
            {(!isLogin || (isLogin && loginMethod === "wallet")) && (
                <div className="space-y-2">
                    <button 
                        type="button" 
                        onClick={petraAddress ? disconnectPetra : connectPetra} 
                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 overflow-hidden text-ellipsis"
                    >
                        {petraAddress 
                            ? `Connected: ${petraAddress.slice(0, 6)}...${petraAddress.slice(-4)}` 
                            : "Connect Petra Wallet"}
                    </button>
                    {petraAddress && (
                        <button 
                            type="button" 
                            onClick={disconnectPetra}
                            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                        >
                            Disconnect Wallet
                        </button>
                    )}
                </div>
            )}
            
            {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
            {successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}
            <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-300"
                disabled={!isLogin && (!petraAddress || !username || !password)}
            >
                {isLogin ? "Login" : "Sign Up"}
            </button>
        </form>
    );
};