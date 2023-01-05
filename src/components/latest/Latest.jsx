
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import LatestSeller from './LatestSeller'
import styles from "./Latest.module.scss";

const Latest = () => {

    const[users, setUsers] = useState([]); //Default is empty
    const[products, setProducts] = useState([]); //Default is empty

    useEffect(() => {
        
        const fetchData = async () => {

            const result = await axios.get("/api/users/all");
            console.log(result.data);
            setUsers(result.data);

            const res = await axios.get("/api/products");
            console.log(res.data);
            setProducts(res.data);
        }

        fetchData();

    }, []);

  return (
 <div className={styles.latest}>
        <div className='latest-row'>
            <div className="latest-col">
                {products.length === 0 ? (<h3 className='info'>There are currently no products!</h3>) : (

                <div className={styles["latest-products"]}>
                    <div className={styles["featured-car"]}>
                        <div className={styles["title-wrapper"]}>
                            <h2 className={`${styles["h2"]} ${styles["section-title"]}`}>Featured cars</h2>

                            <Link to="/shop" className={styles["featured-car-link"]}>
                            <span>View more</span>

                            <ion-icon name="arrow-forward-outline"></ion-icon>
                            </Link>
                        </div>
                        <ul className={styles["featured-car-list"]}>
                         {/*i want only last 3 fetch, not all*/} 
                        {products.slice(-6).map((product) => (
                            <li key={product._id}>
                            {product.isApproved === true ? (
                                <div >
                                <div className={styles["featured-car-card"]} >
                                    <figure className={styles["card-banner"]}>
                                    <Link to={`${product.slug}`}>
                                    <img src={product.images[0]} alt={product.name} className={styles["w-100"]}/>
                                    </Link>
                                    </figure>
                                <div className={styles.category}>
                                <span >{product.category}</span>
                                </div>
                                    <div className={styles["card-content"]}>
                                    <div className={styles["card-title-wrapper"]}>
                                        <h3 className={`${styles["h3"]} ${styles["card-title"]}`}>
                                        <Link to={`${product.slug}`}>{product.name}</Link>
                                        </h3>
                                        <data className={styles.year} value="2021">2021</data>
                                    </div>
                                    <ul className={styles["card-list"]}>

                                        <li className={styles["card-list-item"]}>
                                        <ion-icon name="people-outline"></ion-icon>

                                        <span className={styles["card-item-text"]}>4 People</span>
                                        </li>

                                        <li className={styles["card-list-item"]}>
                                        <ion-icon name="flash-outline"></ion-icon>

                                        <span className={styles["card-item-text"]}>Hybrid</span>
                                        </li>

                                        <li className={styles["card-list-item"]}>
                                        <ion-icon name="speedometer-outline"></ion-icon>

                                        <span className={styles["card-item-text"]}>6.1km / 1-litre</span>
                                        </li>

                                        <li className={styles["card-list-item"]}>
                                        <ion-icon name="hardware-chip-outline"></ion-icon>

                                        <span className={styles["card-item-text"]}>Automatic</span>
                                        </li>

                                    </ul>
                                    <div className={styles["card-price-wrapper"]}>

                                        <p className={styles["card-price"]}>
                                        <strong>{(product.price).toFixed(2)} Rwf</strong>
                                        </p>

                                        <button  className="btns"><Link  className="btn" to={`${product.slug}`}>View Details</Link></button>

                                        </div>
                                        
                                    </div>
                                </div>
                                </div>
                             ) : ''}
                            </li>
                        ))}
                    </ul>
                    </div>
                </div>

                )}
                
            </div>
         
        </div>
            <div className={styles.team} >
                <h2 className={styles.h2}>We provide support to newly registered sellers</h2>
                {users.length === 0 ? (<h3 className='info'>There are currently no registered sellers!</h3>) : (

                    <div>
                        <div className={styles["team-content"]} >
                        {/* i want only last 6 fetch, not all */}
                        {users.slice(-6).map((user) => (
                        <LatestSeller key={user._id} user={user} />
                        ))}

                        </div>
                    </div>

                )}
                
            </div>
 </div>
  )
}

export default Latest
