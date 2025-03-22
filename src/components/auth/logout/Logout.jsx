import { Navigate } from "react-router";
import { useContext, useEffect } from "react";

import useAuth from "../../../hooks/useAuth";
import AuthContext from "../../../context/AuthContext";

export default function Logout() {
    const { auth } = useContext(AuthContext);
    const { logoutHandler } = useAuth();

    useEffect(()=> {
        logoutHandler(auth.accessToken)
            .then()
    })

    return (
        <Navigate to={'/'} />
    )
}