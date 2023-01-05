import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; 
import { getProducts, deleteProduct } from "./apiAdmin";
import { Link } from 'react-router-dom';
import styles from "./Admin.module.scss";


const ManageProducts = () => {
  
    const [products, setProducts] = useState([]);


    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = id => {
        deleteProduct(id).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
     
            <div className={styles.managePro}>
                <div className={styles.table}>
                    <h2 className={styles.h2}>
                        Total {products.length} Products
                    </h2>
                    <hr />
                    <table>
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                    <tbody className={styles.product}>
                        {products.map((p, i) => (
                             <tr key={i}>
                                <td>{i + 1}</td>
                                <td> <Link to={`../${p.slug}`}>
                                  <img src={`../${p.images[0]}`} alt={p.name} width="80" />
                                </Link></td>
                                <td>
                               
                                <strong>{p.name}</strong> 
                                </td>
                                <td>{p.category}</td>
                                <td>{p.price}</td>
                                <td>
                                <FaTrashAlt
                                size={18}
                                color="red"
                                cursor="pointer"
                                onClick={() => destroy(p._id)}
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

export default ManageProducts;