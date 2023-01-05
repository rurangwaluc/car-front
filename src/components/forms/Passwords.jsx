import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react'
import { toast } from "react-hot-toast";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Forms.module.scss'

const Passwords = ({setOpen}) => {

    const navigate = useNavigate();

    const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

    const [password, setPassword] = useState('');
    const [rPassword, setRPassword] = useState('');

    const handlerUpdatePassword = async (e) => {
        e.preventDefault();
        
        //if equal pass with r_pass
        if(password === rPassword) {

            try {

                const {data} = await axios.put("/api/users/update", {
                    _id: userInfo._id,
                    password,
                });
                localStorage.removeItem("userInfo", JSON.stringify(data));
                toast.success("Password updated successfully!");
                navigate('/login');
    
            } catch(err) {
                toast.error("Password not updated!");
            }

        } else {

            toast.error("Passwords doesn't match!");

        }
    }

  return (
    <div className={styles.PassContainer}>
       <div className={styles.wrapper}>
        <div className={styles["close-form"]} onClick={() => setOpen(false)}>X</div>
      <form onSubmit={handlerUpdatePassword}>
        <div className={styles.row}>
            <i className="fas fa-lock"></i>
            <input placeholder="Password" required type="password" id='pass' onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <div className={styles.row}>
            <i className="fas fa-unlock"></i>
            <input placeholder="Retype Password" required type="password" id='r_pass' onChange={(e) => setRPassword(e.target.value)} value={rPassword} />
        </div>
        <div className="form-btn">
            <button className="btn" type='submit'><FontAwesomeIcon icon={faRefresh} /> Update Password</button>
        </div>
      </form>
    </div>
</div>
  )
}

export default Passwords
