import React from 'react'
import Filter from '../../components/filters/Filter'
import styles from "./Shop.module.scss";


const Shop = ({myTheme}) => {
  return (
    <div className={styles["shop-wrapper"]} data-theme={myTheme}>


 
        <main className='main-container'>
          <Filter />
        </main>
       

     
 
    </div>
  )
}

export default Shop
