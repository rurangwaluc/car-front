import React, { useContext, useEffect } from 'react';
import ProductImage from './ProductImage';
import axios from 'axios';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import styles from "./ProductDetails.module.scss";

const ProductDetails = () => {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {cart} = state;

  const existUser = localStorage.getItem("userInfo");
    
    const [product, setProduct] = useState([]);
    const [Images, setImages] = useState([]);



    const params = useParams(); 
    const {slug} = params;



  useEffect(() => {

    const fetchData = async () => {
        
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        console.log(result.data);
        setProduct(result.data)
      } catch(err) {
        console.log("Error!");
      }
      
    }
    fetchData();

  }, [slug]);

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
    <div className={styles['product-page']} >
      <div className={styles.card}>
      <div className={styles["product-imgs"]}>
          <div className={styles["img-display"]}>
            <div className={styles["img-showcase"]}>
              <ProductImage detail={product} />
            <Link to={`../seller/${product.sellerId}`}><img width={80} className={styles['seller-product']} src={product.sellerImage} alt={product.seller} /></Link>
            </div>
          </div>
        </div>

        <div className={styles["product-content"]}>
                <h2 className={styles["product-title"]}>{product.name}</h2>
                <span className={styles["product-category"]}>{product.category}</span>
          
            <div className={styles["product-price"]}>
                <p className={styles["new-price"]}>Price: <span> ${Number(product.price).toFixed(2)} </span></p>
            </div>
            <div className={styles["product-detail"]}>
               <h2>About This Car: </h2>
                <p>{product.description}</p>
                <ul>
                  <li><ion-icon name="people-outline"></ion-icon> 4 People</li>
                  <li><ion-icon name="flash-outline"></ion-icon> Gasoline</li>
                  <li> <ion-icon name="speedometer-outline"></ion-icon> 6.1km / 1-litre</li>
                  <li> <ion-icon name="hardware-chip-outline"></ion-icon> Automatic</li>
                </ul>
            </div>
            <div className={styles["purchase-info"]}>
                <button className='btn' onClick={addToCart}>Add to Bag</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
