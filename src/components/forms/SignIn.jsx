
import React, { useState, useEffect } from 'react'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { toast } from "react-hot-toast";
import styles from './Forms.module.scss'
import { signin, authenticate, isAuthenticated } from "../auth";

const SignIn = () => {



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [values, setValues] = useState({
        loading: false,
        redirectToReferrer: false
    });
    const { loading,  redirectToReferrer } = values;
    const  user  = isAuthenticated();
   
    const submitHandler =  async (e) => {
        e.preventDefault();

        try {

            const {data} = await axios.post("/api/users/login", {
                email,
                password
            });
            const authenticate = (next) => {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('userInfo', JSON.stringify(data));
                    next();
                }
            };

            authenticate(() => {
                setValues({
                    ...values,
                    redirectToReferrer: true 
                });
            });

        toast.success("You've Successfully Logged In");

        } catch(error) {
            
            toast.error("Invalid Email or Password");
        }
    }

    // useEffect(() => {
    //     if(localStorage.getItem("userInfo")) {
    //         localStorage.getItem("userInfo");
    //         Navigate('/');
    //     }
    // })

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Navigate to="/admin/dashboard" />;
            } else {
                console.log(user)
                return <Navigate to="/seller/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Navigate to="/" />;
        }
    };
  

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
        <div className={styles.title}><span>Login</span></div>
        <form onSubmit={submitHandler}>
            <div className={styles.row}>
            <i className="fas fa-envelope"></i>
            <input placeholder="Email" id='email' onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className={styles.row}>
                <i className="fas fa-lock"></i>
                    <input placeholder="Password" type="password" id='password' onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className={`${styles["row"]} ${styles["button"]}`}>
                 <input type="submit" value="Login" />
                </div>
                <div className={styles["signup-link"]}>Not a member? <Link to="/register">Register</Link></div>

            </form>
        </div>
        {redirectUser()}
    </div>
  )
}

export default SignIn
