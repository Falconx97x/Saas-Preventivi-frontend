"use client";

import {createContext, useState, useEffect, useContext} from "react";
import {useRouter} from "next/navigation";
import {logout as apiLogout} from "@/src/lib/api";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const[isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    const logout = async () => {
        try {
            await apiLogout();
            
        } catch (error) {
            console.error("Logout failed:", error);
        }

        localStorage.removeItem("token");
        setIsAuthenticated(false);
        router.push("/login");

    };

    return (
        <AuthContext.Provider value={{isAuthenticated, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

export const useAuthContext = () => useContext(AuthContext);