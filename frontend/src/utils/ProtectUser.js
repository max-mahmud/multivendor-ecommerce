import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtechUser = () => {
    const { userInfo } = useSelector((state) => state.auth);
    if (userInfo) {
        return <Outlet />;
    } else {
        return <Navigate to={"/login"} replace={true} />;
    }
};

export default ProtechUser;