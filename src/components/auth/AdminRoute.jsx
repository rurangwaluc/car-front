import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ children})=>{ 
    
    const user =  isAuthenticated();
    if( isAuthenticated() && user.role === 1){
        return children
    }
    return <Navigate to="/" />
  
};

export default AdminRoute;
