import React from 'react';
import SellerInfo from '../../components/seller/SellerInfo';
import styles from "./Seller.module.scss";

const Seller = ({myTheme}) => {
  return (
    <div className={styles["seller-wrapper"]} data-theme={myTheme}>

        <main className='main-container'>
          <SellerInfo />
        </main>

    </div>
  )
}

export default Seller
