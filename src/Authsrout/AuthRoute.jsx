import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthRoute = () => {
    const userEmail = localStorage.getItem("email");
    const uid = localStorage.getItem("uid");
    const location = useLocation();

    // Check if the current location is '/login' or '/signup'
    const isLoginPage = location.pathname === '/';
    const isSignUpPage = location.pathname === '/signup';

    return (
        <div>
            {/* If user is logged in or trying to access '/signup', redirect to login page */}
            {!userEmail && (isLoginPage || isSignUpPage) && (
                <Outlet />
            )}
            {/* If user is logged in, allow access to protected routes */}
            {userEmail && uid && (
                <Outlet />
            )}
            {/* If user is not logged in and trying to access protected routes, redirect to login page */}
            {!userEmail && !isLoginPage && !isSignUpPage && (
                <Navigate to="/" replace />
            )}
        </div>
    );
}

export default AuthRoute;
