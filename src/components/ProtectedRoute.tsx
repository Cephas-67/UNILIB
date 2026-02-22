import { Navigate, useLocation } from "react-router-dom";
import { useSession } from "@/hooks/use-session";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loading, logout } = useSession();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/e-fri/connexion" state={{ from: location }} replace />;
    }

    if (user.status && user.status !== "active") {
        logout();
        const message = user.status === "banned" ? "Votre compte a été banni." : "Votre compte est désactivé.";
        return <Navigate to="/e-fri/connexion" state={{ error: message }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
