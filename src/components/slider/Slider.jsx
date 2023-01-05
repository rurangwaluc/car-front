import React from "react"
import SlideCard from "./SlideCard"
import styles from "./HeroSlider.module.scss";
const SliderHome = () => {
  return (
    
      <div className={`${styles.homeSlide} ${styles.contentWidth}`}>
        <div className='container'>
          <SlideCard />
        </div>
      </div>
  
  )
}

export default SliderHome
