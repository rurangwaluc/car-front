import React from 'react'
import { Link } from 'react-router-dom';
import heroImg from '../../assets/slider-2.png';
import styles from "./HeroSlider.module.scss";
import SliderHome from "./Slider"

const HeroSlider = ({ myTheme }) => {
  
  return (
    <div className={styles.home} data-theme={myTheme}>
      
      <div className={styles.social} > 
            <a href="#"><i className='fab fa-github'></i></a>
            <a href="#"><i className='fab fa-dribbble' ></i></a>
            <a href="#"><i className='fab fa-behance' ></i></a>
        </div>
        <div className={styles["home-img"]}>
            <img src={heroImg} alt="" />
        </div>
        <div className={styles["home-text"]}>
            <h1>The largest <span>omline marketplace</span> in rwanda with the largest number of cars  </h1>
            <a href="#contact" className="btn">Contact Me <i className="fas fa-phone-alt"></i> </a>
        </div>

   </div>
  )
}

export default HeroSlider;
