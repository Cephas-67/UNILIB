import { useState, useEffect } from "react";
import { DataService } from "@/lib/dataService";

export interface User {
    id?: string;
    nom: string;
    prenom: string;
    email: string;
    filiere: string;
    promotion: string;
    semestre: string;
    avatar?: string;
    role: "etudiant" | "responsable" | "admin";
    password?: string;
    status?: "active" | "inactive" | "banned";
}

export const useSession = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionData = localStorage.getItem("unilib_session");
        if (sessionData) {
            try {
                setUser(JSON.parse(sessionData));
            } catch (e) {
                console.error("Failed to parse session", e);
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await DataService.login(email, password);
            const userData = response.user;
            
            localStorage.setItem("unilib_session", JSON.stringify(userData));
            setUser(userData);
            
            return userData;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("unilib_session");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
    };

    const updateSession = (updates: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...updates };
            localStorage.setItem("unilib_session", JSON.stringify(updatedUser));
            setUser(updatedUser);

            // Update in registered users list too
            const users = JSON.parse(localStorage.getItem("unilib_users") || "[]");
            const index = users.findIndex((u: User) => u.email === user.email);
            if (index !== -1) {
                users[index] = { ...users[index], ...updates };
                localStorage.setItem("unilib_users", JSON.stringify(users));
            }
        }
    };

    return { user, login, logout, updateSession, loading };
};