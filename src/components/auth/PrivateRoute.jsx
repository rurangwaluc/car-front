import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ children})=>{
    const user =  isAuthenticated();
    if(!user){
        return <Navigate to="/login" />
    }
return children
};

export default PrivateRoute;

