import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../../Store';
import styles from "./Seller.module.scss";

const SellerProductInfo = ({pro}) => {

    

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {cart} = state;
 
    const existUser = localStorage.getItem("userInfo");

    const addToCart = () => {

        if(!existUser) {
            window.alert('Sorry. You must login.');
        } else { 

            const existItem = cart.cartItems.find((x) => x._id === pro._id);
            const quantity = existItem ? existItem.quantity + 1 : 1; // if exists in cart than quantity + 1, if not than 1


            ctxDispatch({
                type: 'CART_ADD_ITEM',
                payload: { ...pro, quantity },
            });

        }

    }

  return (
    <>
     {pro.isApproved === true ? (
    <div className={styles["featured-car-card"]} key={pro._id}>
        <figure className={styles["card-banner"]}>
            <Link to={`../${pro.slug}`}>
                <img src={`../${pro.images[0]}`} alt={pro.name} className={styles["w-100"]}/>
            </Link>
        </figure>
        <div className={styles.category}>
           <span >{pro.category}</span>
        </div>
        <div className={styles["card-content"]}>
            <div className={styles["card-title-wrapper"]}>
              <h3 className={`${styles["h3"]} ${styles["card-title"]}`}>
                <Link to={`../${pro.slug}`}>{pro.name}</Link>                                    </h3>
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
             <p className={styles["card-price"]}><strong>${(pro.price).toFixed(2)}</strong></p>
            <button className="btn" onClick={addToCart}>Add to Bag</button>
             </div>
         </div>
      
    </div>
     ) : ''}
    </>

  )
}

export default SellerProductInfo
