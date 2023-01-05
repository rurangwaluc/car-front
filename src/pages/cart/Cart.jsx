import React from 'react'
import CartItems from '../../components/cartitems/CartItems'
import Footer from '../../components/footer/Footer'
import styles from './Cart.module.scss'

const Cart = ({myTheme}) => {
  return (
    <div className={styles.cart} data-theme={myTheme}>


          <CartItems />

    </div>
  )
}

export default Cart
