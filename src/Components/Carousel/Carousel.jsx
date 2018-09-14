import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Arrow from '../Arrow'
import FadeAnimation from '../FadeAnimation'

import './Carousel.css'

class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slides: [],
      animation: ''
    }
    this.display = props.totalToDisplay > props.feed.length
      ? props.feed.length
      : props.totalToDisplay

  }

  getCurrentIndex(currentPos, direction, length) {
    const move = direction % length

    return (currentPos + move + length) % length
  }

  setSlides = (i) => {
    if(i > 0) return
    console.log(i)
    const { slides, direction } = this.state
    const directionToMove = direction === 'left' ? -1 : 1
    const guideId = (direction === 'left' ? slides[0] : slides[slides.length -1]).id
    const realPosition = this.props.feed.reduce((acc, ele, index) => guideId === ele.id ? index : acc ,0)
    const newCurrentIndex = this.getCurrentIndex(realPosition, directionToMove, this.props.feed.length)
    const newEntrySlide = this.props.feed.find((_, index) => index === newCurrentIndex)

    const newSlides = direction === 'left'
      ? [newEntrySlide, ...slides.slice(0, slides.length -1)]
      : [...slides.slice(1), newEntrySlide]

    this.setState({
      currentIndex: newCurrentIndex,
      slides: newSlides,
      animation: ''
    })
  }

  moveCarousel = direction => {
    this.setState({
      animation: direction === 'left' ? 'moveLeft' : 'moveRight',
      direction
    })
  }

  setWrapperWidth() {
    const { imageSize } = this.props
    const viewPortWidth = window.innerWidth
    const sumMargin = 10 * this.display

    const wrapperWidth = this.display * imageSize.width + sumMargin

    this.setState({
      finalWrapperWidth: wrapperWidth > viewPortWidth ? viewPortWidth : wrapperWidth,
      carouselWidth: (this.display + 2) * imageSize.width + sumMargin // sum 2 to hidden them and add the animation
    })
  }

  componentDidMount() {
    const { feed } = this.props

    this.setWrapperWidth()
    this.setState({
      slides: feed.filter((_, index) => index < (this.display + 2)) // sum 2 to hidden them and add the animation
    })
  }


  render() {
    return (
      <div className='carousel-wrapper'
        style={{ width: this.state.finalWrapperWidth }}
      >
        <Arrow
          position='left'
          arrowColor='000000'
          handlerOnClick={() => this.moveCarousel('left')}
          arrowWidth={3}
          />
        <div className={`carousel-slides`}
          style={{ width: `${this.state.carouselWidth}px`,
          transform: 'translate3d(-310px, 0, 0)' }}
        >
          {
            this.state.slides.map((slide, i) => (
              <div
                key={slide.id}
                className={`slide ${this.state.animation}`}
                onAnimationEnd={() => this.setSlides(i)}
              >
                <img src={slide.image.src} />
              </div>
            ))
          }
        </div>
        <Arrow
          position='right'
          arrowColor='000000'
          handlerOnClick={() => this.moveCarousel('right')}
          arrowWidth={3}
        />
      </div>
    )
  }
}

Carousel.defaultProps = {
  feed: [],
  totalToDisplay: 3,
  imageSize: {
    height: 300,
    width: 300
  },
  currentIndex: 0
}

Carousel.propTypes = {
  feed: PropTypes.array,
  totalToDisplay: PropTypes.number,
  imageSize: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number
  }),
  currentIndex: PropTypes.number
}

export default Carousel
