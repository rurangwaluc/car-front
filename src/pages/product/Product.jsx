import React from 'react';
import ProductDetails from '../../components/productdetails/ProductDetails'
import styles from "./Product.module.scss";


const Product = ({myTheme}) => {
  return (
    <div className={styles["product-wrapper"]} data-theme={myTheme}>
       
        <main className='main-container'>
          <ProductDetails />
        </main>

    </div>
  )
}

export default Product
