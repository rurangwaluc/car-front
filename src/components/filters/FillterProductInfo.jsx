import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../../Store'
import styles from "./Filter.module.scss";

const FillterProductInfo = ({product}) => {

    
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {cart} = state;

    const existUser = localStorage.getItem("userInfo");


    const addToCart = () => {

        if(!existUser) {
            window.alert('Sorry. You must login.');
        } else { 

            const existItem = cart.cartItems.find((x) => x._id === product._id);
            const quantity = existItem ? existItem.quantity + 1 : 1; // if exists in cart than quantity + 1, if not than 1


            ctxDispatch({
                type: 'CART_ADD_ITEM',
                payload: { ...product, quantity },
            });

        }

    } 

  return (
    <div>
        {product.isApproved === true ? (
        <li key={product._id}>
    <div className={styles["featured-car-card"]} >
        <figure className={styles["card-banner"]}>
            <Link className={styles.url} to={`../${product.slug}`}>
                <img src={product.images[0]} alt={product.name} width="100" className={styles["w-100"]}/>
            </Link>
            <Link to={`../seller/${product.sellerId}`}><img width={60} className={styles['seller-product']} src={product.sellerImage} alt={product.seller} /></Link>
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
                    <strong>${(product.price).toFixed(2)}</strong>
                  </p>
                  <button  className="btns"><Link  className="btn" to={`../${product.slug}`}>View Details</Link></button>
                  </div>
                               
        </div>
        </div>
        </li>
      ) : null}
     </div>
  )
}

export default FillterProductInfo
