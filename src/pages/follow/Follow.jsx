import React from 'react'
import FollCustomer from '../../components/followcustomer/FollCustomer'
import styles from "./Follow.module.scss";

const Follow = ({myTheme}) => {
  return (
    <div className={styles["follow-wrapper"]} data-theme={myTheme}>

        <main className='main-container'>
          <FollCustomer />
        </main>

    </div>
  )
}
  
export default Follow
