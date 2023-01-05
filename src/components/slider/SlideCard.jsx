import React from "react"
import Sdata from "./Sdata"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styles from "./HeroSlider.module.scss";

const SlideCard = () => {
  const settings = {
    dots: false,
    centerMode: true,
    centerPadding: '10px',
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  }
  return (
    <>
      <Slider {...settings}>
        {Sdata.map((value, index) => {
          return (
            <div className={styles.slideCard}>
              <div className={styles.flex} key={index}>
                <div className={styles.left}>
                  <h1>{value.title}</h1>
                  <p>{value.desc}</p>
                  <button className='btn'>Visit Collections</button>
                </div>
                <div className={styles.right}>
                  <img src={value.cover} alt='' />
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    </>
  )
}

export default SlideCard
