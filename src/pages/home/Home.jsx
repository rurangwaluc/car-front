import React from 'react'
import Latest from '../../components/latest/Latest';
import HeroSlider from '../../components/slider/HeroSlider';
import styles from "./Home.module.scss";


const Home = ({ myTheme }) => {
  return (
    <div className={styles.home} data-theme={myTheme}>
        <main className='main-container'>
          <HeroSlider />
          <Latest />
        </main>
   
    </div>
  )
}

export default Home