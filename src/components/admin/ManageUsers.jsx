import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; 
import styles from "./Admin.module.scss";
import { getUsers, deleteUser } from "./apiAdmin";
import { Link } from 'react-router-dom';

const ManageUsers = () => {
  
    const [users, setUsers] = useState([]);

    const  user = isAuthenticated();

    const loadUsers = () => {
        getUsers().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUsers(data);
            }
        });
    };

    const destroy = id => {
        deleteUser(id).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadUsers();
            }
        });
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
     
        <div className={styles.managePro}>
        <div className={styles.table}>
            <h2 className={styles.h2}>
                Total {users.length} Sellers
            </h2>
                    <hr />
                    <table>
                    <thead>
                         <tr>
                                <th>s/n</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <td>{i + 1}</td>
                                <td>
                                { !user.image  ? <Link to={`../seller/${user._id}`}><img width="80" src="https://res.cloudinary.com/db7jv57dm/image/upload/v1667836050/userImage.png" alt={user.name} /></Link> :  
                                     <Link to={`../seller/${user._id}`}><img src={user.image} alt={user.name} width="80" /></Link> }

                               
                                </td>
                               <td>
                                <strong>{user.name}</strong>
                               </td>
                               <td>
                                <FaTrashAlt
                                size={18}
                                color="red"
                                cursor="pointer"
                                onClick={() => destroy(user._id)}
                                />
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                    </table>
                    <br />
                </div>
            </div>
    
    );
};

export default ManageUsers;