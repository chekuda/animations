import React from 'react'

import FadeAnimation from '../../Components/FadeAnimation'
import CarouselContainer from '../../Container/CarouselContainer'

import './Carousel.css'

const CarouselPage = () => {
  return (
      <div>
        <FadeAnimation types={['fadeIn']} time='two'>
          <h1>Carousel Page</h1>
        </FadeAnimation>
        <CarouselContainer />
      </div>
    )
}

export default CarouselPage