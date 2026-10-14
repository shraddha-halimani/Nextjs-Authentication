"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me');
            console.log(res.data);
            setData(res.data.data._id);
            toast.success("User details fetched!");
        } catch (error: any) {
            console.log(error.message);
            toast.error("Failed to fetch user details");
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card text-center">
                <h1 className="text-2xl font-bold mb-2 text-white">Profile</h1>
                <p className="text-sm text-gray-400 mb-6">Welcome to your profile dashboard</p>
                <hr className="mb-6 border-gray-600" />
                
                <div className="flex flex-col gap-4">
                    <div className="p-3 bg-gray-900 rounded-lg border border-gray-700">
                        <span className="text-xs text-gray-400 block mb-1">User ID Status:</span>
                        <h2 className="text-sm font-semibold text-green-400 break-all">
                            {data === 'nothing' ? (
                                "No data fetched yet"
                            ) : (
                                <Link href={`/profile/${data}`} className="hover:underline text-indigo-400">
                                    {data}
                                </Link>
                            )}
                        </h2>
                    </div>

                    <button
                        onClick={getUserDetails}
                        className="w-full p-3 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors">
                        Get User Details
                    </button>

                    <button
                        onClick={logout}
                        className="w-full p-3 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-500 transition-colors">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}