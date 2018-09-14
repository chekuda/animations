import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Arrow from '../Arrow'

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
    this.hiddenSlides = 2 // sum 2 to hidden them and add the animation
  }

  getCurrentIndex(currentPos, direction, length) {
    const move = direction % length

    return (currentPos + move + length) % length
  }

  setSlides = () => {
    const { slides, direction, slidesUpdated } = this.state
    const { feed } = this.props
    if(slidesUpdated) return
    const directionToMove = direction === 'left' ? -1 : 1
    const guideId = (direction === 'left' ? slides[0] : slides[slides.length -1]).id
    const realPosition = feed.reduce((acc, ele, index) => guideId === ele.id ? index : acc ,0)
    const newCurrentIndex = this.getCurrentIndex(realPosition, directionToMove, feed.length)
    const newEntrySlide = feed.find((_, index) => index === newCurrentIndex)

    const newSlides = direction === 'left'
      ? [newEntrySlide, ...slides.slice(0, slides.length -1)]
      : [...slides.slice(1), newEntrySlide]

    this.setState({
      currentIndex: newCurrentIndex,
      slides: newSlides,
      animation: '',
      slidesUpdated: true
    })
  }

  moveCarousel = direction => {
    this.setState({
      animation: direction === 'left' ? 'moveLeft' : 'moveRight',
      direction,
      slidesUpdated: false
    })
  }

  setWrapperWidth() {
    const { imageSize, margin } = this.props
    const viewPortWidth = window.innerWidth
    const sumMargin = margin * this.display

    const wrapperWidth = this.display * imageSize.width + sumMargin

    this.setState({
      wrapperWidth: wrapperWidth > viewPortWidth ? viewPortWidth : wrapperWidth,
      carouselWidth: (this.display + this.hiddenSlides) * imageSize.width + sumMargin
    })
  }

  componentDidMount() {
    const { feed } = this.props

    this.setWrapperWidth()
    this.setState({
      slides: feed.filter((_, index) => index < (this.display + this.hiddenSlides))
    })
  }


  render() {
    const { imageSize, margin } = this.props

    return (
      <div className='carousel-wrapper'
        style={{ width: this.state.wrapperWidth }}
      >
        <Arrow
          position='left'
          arrowColor='000000'
          handlerOnClick={() => this.moveCarousel('left')}
          arrowWidth={3}
          />
        <div className={`carousel-slides`}
          style={{
            width: `${this.state.carouselWidth}px`,
            transform: `translate3d(-${imageSize.width}px, 0, 0)`
          }}
        >
          {
            this.state.slides.map((slide, i) => (
              <div
                key={slide.id}
                className={`slide ${this.state.animation}`}
                onAnimationEnd={this.setSlides}
                style={{
                  margin: `0 ${margin}px`,
                  width: `${imageSize.width}px`
                }}
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
  margin: 5,
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
  currentIndex: PropTypes.number,
  marginBetweenSlides: PropTypes.number
}

export default Carousel
