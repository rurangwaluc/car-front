import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Store } from '../../Store'
import SellerProduct from './SellerProduct';
import styles from "./Seller.module.scss";

const SellerInfo = () => {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {cart, wish} = state;

    const [seller, setSeller] = useState([]);
    const [product, setProduct] = useState([]);

    const params = useParams();
    const {id} = params;

    const existUser = localStorage.getItem("userInfo");

  useEffect(() => {

    const fetchData = async () => {
        
      try {
        const result = await axios.get(`/api/users/user/${id}`);
        console.log(result.data);
        setSeller(result.data)


        const res = await axios.get(`/api/products/seller/${id}`);
        console.log(res.data);
        setProduct(res.data)


      } catch(err) {
        console.log("Error!");
      }
      
    }
    fetchData();

  }, [id]);

  const handlerFollow = () => {

    if(!existUser) {
      window.alert('Sorry. You must login.');
  } else {

      //If there is a user I am already following (localstorage), his id, from db
      const existItem = wish.wishItems.find((x) => x._id === seller._id);
        const quantity = existItem ? existItem.quantity : 1;
        
        if (existItem) {
            window.alert('Sorry. You are already following this user.');
            return;
        }
        
        ctxDispatch({
          type: 'WISH_ADD_ITEM',
          payload: { ...seller, quantity },
        });
    
    }

  }

  const handlerUnfollow = (seller) => {

    ctxDispatch({
        type: 'WISH_REMOVE_ITEM',
        payload: seller
    });
 
}

  //if exists seller
  const sellerExists = wish.wishItems.find((x) => x._id === seller._id);
    
 
  return (
    <div className={styles['account-row']}>
       <div className={styles["account-groups"]}>
       <div className={styles["account-group"]}>
       <h2 className={styles["account-subtitle"]}>{seller.name}'s Full Information</h2>
       <div className={styles["seller-info"]}>
            <div className={styles['form-image']}>
            { !seller.image  ? <img className={styles.file} src="https://res.cloudinary.com/db7jv57dm/image/upload/v1667836050/userImage.png" alt={seller.name} /> :  <img className={styles.file} src={seller.image} alt={seller.name} /> }
               
            </div>
            <div  className={styles["seller-body"]}>
            <div className={styles["list-item"]}>
              <ion-icon name="person-outline"></ion-icon> 
                  <span>{seller.name}</span>
              </div>
            <div  className={styles["list-item"]}>
            <ion-icon name="mail-outline"></ion-icon>
                <span>{seller.email}</span>
            </div>
            <div  className={styles["list-item"]}>
            <ion-icon name="phone-portrait-outline"></ion-icon> 
                <span> {seller.phone}</span>
            </div>
            <div  className={styles["list-item"]}>
            <ion-icon name="navigate-outline"></ion-icon> 
                <span>{seller.address}</span>
            </div>
            <div className={styles["seller-footer"]}>
                {existUser && sellerExists ? (<span key={seller._id} onClick={() => handlerUnfollow(seller)} className='btn-red'>Unfollow</span>) : (<span onClick={handlerFollow} className='btn'>Follow</span>)}
                
            </div>
            </div>
          </div>
        </div>
      <div className={styles["account-group"]}>
          <h2 className={styles["pro-subtitle"]}>All Products of the Seller {seller.name}</h2>
          <div className={styles["account-products"]}>
            
          {product.length === 0 ? (<h3 className='info'>There are currently no products!</h3>) : (

            <div className="seller-products">
                <SellerProduct product={product} />
            </div>

          )}
          </div>
            
      </div>
      </div>
    </div>
  )
}

export default SellerInfo
