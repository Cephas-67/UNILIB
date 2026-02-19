import { useState, useEffect } from "react";

export interface User {
    id?: string;
    nom: string;
    prenom: string;
    email: string;
    filiere: string;
    promotion: string;
    semestre: string;
    avatar?: string;
    role: "etudiant" | "admin";
    password?: string;
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

    const login = (userData: User) => {
        localStorage.setItem("unilib_session", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("unilib_session");
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
