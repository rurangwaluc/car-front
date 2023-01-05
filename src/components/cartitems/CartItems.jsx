import { faEye, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Store } from '../../Store'
import Checkout from './Checkout'
import styles from "./CartItems.module.scss";

const CartItems = () => {

    const navigate = useNavigate();

    const [openCheckout, setOpenCheckout] = useState(false);

    useEffect(() => {

        if(!localStorage.getItem("userInfo")) {
            localStorage.getItem("userInfo");
            navigate('/');
        }

    });

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const {
        cart: {cartItems},
    } = state;

    const idSeller = cartItems.map((sellId) => (
        sellId.sellerId
    ));

    //console.log(idSeller);

    const totalItems = cartItems.reduce((a, c) => a + c.quantity, 0) + '/items';

    const roundPrice = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    const itemsPrice = roundPrice(cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
    const taxPrice = roundPrice(0.20 * itemsPrice); //for tax in Serbia 20%
    const totalPrice = itemsPrice + taxPrice;

    const updateQuantityHandler = async (item, quantity) => {

        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });

    }

    const removeProduct = (item) => {
        ctxDispatch({
            type: 'CART_REMOVE_ITEM',
            payload: item,
        });
    }

  return (
    <div className={styles['cart-wrapper']}>
      <h1>My Shopping WishList</h1>
      <div className={styles.project}>
          <div className="">
            {cartItems.length === 0 ? (<h3 className='info'>Your Bag is empty!</h3>) : (
                <div className={styles.shop}>
                    {cartItems.map((item) => (
                        <div className={styles.box} key={item._id}>
                            <div>
                                <Link to={`../${item.slug}`}>
                                <img className={styles.image} src={item.images[0]} alt={item.name} /></Link>
                                <Link to={`../seller/${item.sellerId}`}><img width={40} className={styles['card-sellers']} src={item.sellerImage} alt={item.sellerName} /></Link>
                            
                            </div>
                            <div className={styles.content}>
                                <h3> <Link to={`../${item.slug}`}>{item.name}</Link> </h3>
                                <span className={styles.category}>{item.category}</span>
                                <h4>${Number(item.price).toFixed(2)}</h4>
                                    <div className={styles["card-action"]}>
                                    <button onClick={() => updateQuantityHandler(item, item.quantity - 1)} disabled={item.quantity === 1}><FontAwesomeIcon icon={faMinusCircle} /></button>
                                    <span className='quantity'>{item.quantity}</span>
                                    <button onClick={() => updateQuantityHandler(item, item.quantity + 1)}><FontAwesomeIcon icon={faPlusCircle} /></button>
                                    </div>  
                                <p className={styles["btn-area"]}>
                                <span className={styles.btn2} onClick={() => removeProduct(item)}>Delete</span>
                            </p>
                            </div>
                            
                            
                        </div>
                    ))}
                </div>
            )}
            
          </div>
          <div className={styles["right-bar"]}>
            <div className="cart-bill">
                <h2 className={styles["bill-title"]}>My Bill</h2>
                {cartItems.length === 0 ? (<h3 className={styles.info}>No Products!</h3>) : (
                    <div className={styles["bill-groups"]}>
                        {cartItems.map((product) => (
                            <div className={styles["bill-group"]} key={product._id}>
                                <span>{product.name}</span>
                                <span>${Number(product.price).toFixed(2)}/kg</span>
                            </div>
                        ))}
                    </div>
                )}
                <div className={styles["bill-total"]}>
                    <div className={styles["bill-group"]}>
                        <span>SubTotal:</span>
                        <span>{totalItems} {itemsPrice}</span>
                    </div>
                    <div className={styles["bill-group"]}>
                        <span>Tax 20%:</span>
                        <span>${taxPrice}</span>
                    </div>
                    <div className={styles["bill-group"]}>
                        <h3>Total:</h3>
                        <h3>${totalPrice.toFixed(2)}</h3>
                    </div>
                </div>
                <div className={styles["bill-btn"]}>
                    <button onClick={() => setOpenCheckout(true)}>Checkout</button>
                </div>
            </div>
          </div>
      </div>
      {openCheckout && <Checkout cartItems={cartItems} idSeller={idSeller} itemsPrice={itemsPrice} taxPrice={taxPrice} totalPrice={totalPrice} setOpenCheckout={setOpenCheckout} />}
    </div>
  )
}

export default CartItems
