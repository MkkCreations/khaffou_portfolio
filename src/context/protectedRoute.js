import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({children}) {
    const {token} = useAuth();

    if(!token) return <Navigate to='/login' />

    
    return <>{children}</>;
}