"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="text-2xl font-bold mb-2 text-white">{loading ? "Processing..." : "Login"}</h1>
                <hr className="mb-6 border-gray-600" />
                
                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">Email</label>
                        <input 
                            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:border-indigo-500"
                            id="email"
                            type="text"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-300">Password</label>
                        <input 
                            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:border-indigo-500"
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        onClick={onLogin}
                        disabled={buttonDisabled}
                        className="w-full mt-2 p-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition-colors disabled:opacity-50">
                        {buttonDisabled ? "Fill details to login" : "Login here"}
                    </button>

                    <div className="text-center mt-2">
                        <Link href="/signup" className="text-sm text-indigo-400 hover:underline">
                            Visit Signup page
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}