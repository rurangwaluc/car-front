import React from 'react'
import {  toast } from 'react-hot-toast';
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Forms.module.scss'

const Sign = () => {

    const navigate = useNavigate();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfrimPassword] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            toast.error("Passwords doesn't match!");
            return;
        }

        try {

            const {data} = await axios.post("/api/users/register", {
                name,
                email,
                password,
                address,
                phone
            });
            //localStorage.setItem("userInfo", JSON.stringify(data));
            toast.success("You have successfully registered!");
            navigate('/login');


        } catch(error) {

            console.log("Error!");
            toast.error("Registration failed, please try again!");
        }
    }

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
        <div className={styles.title}><span>Register</span></div>
        <form onSubmit={submitHandler}>
            <div className={styles.row}>
                <i className="fas fa-user"></i>
                <input placeholder="Full Name" required onChange={(e) => setName(e.target.value)} type="text" id='name' />
            </div>
            <div className={styles.row}>
            <i className="fas fa-envelope"></i>
            <input placeholder="Email" required onChange={(e) => setEmail(e.target.value)} type="email" id='email' />
            </div>
            <div className={styles.row}>
            <i className="fas fa-lock"></i>
             
            <input required placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" id='password' />        
            </div>
            <div className={styles.row}>
            <i className="fas fa-unlock"></i>
            <input placeholder="Confirm Password" required onChange={(e) => setConfrimPassword(e.target.value)} type="password" id='r_password' />
             </div>
            <div className={styles.row}>
            <i className="fa-solid fa-location-dot"></i>
                <input placeholder="Address"  required onChange={(e) => setAddress(e.target.value)} type="text" id='address' />
            </div>
            <div className={styles.row}>
            <i className="fas fa-phone"></i>
                <input placeholder="Phone"  required onChange={(e) => setPhone(e.target.value)} type="text" id='phone' />
            </div>
           
            <div className={`${styles["row"]} ${styles["button"]}`}>
             <input type="submit" value="Register" />
            </div>
             <div className={styles["signup-link"]}>Already a member? <Link to="/login">Login</Link></div>
        </form>
        </div>
    </div>
  )
}

export default Sign
