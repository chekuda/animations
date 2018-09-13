import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Arrow from '../Arrow'

import './Carousel.css'

class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slides: []
    }
    this.display = props.totalToDisplay > props.feed.length
      ? props.feed.length
      : props.totalToDisplay

  }

  getCurrentIndex(currentPos, direction, length) {
    const move = direction % length

    return (currentPos + move + length) % length
  }

  setSlides = direction => {
    const { slides } = this.state
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
      slides: newSlides
    })
  }

  setWrapperWidth() {
    const { imageSize } = this.props
    const viewPortWidth = window.innerWidth
    const sumMargin = 10 * (this.display + 1)

    const wrapperWidth = this.display * imageSize.width + sumMargin

    this.setState({
      finalWrapperWidth: wrapperWidth > viewPortWidth ? viewPortWidth : wrapperWidth
    })
  }

  componentDidMount() {
    const { feed } = this.props

    this.setWrapperWidth()
    this.setState({
      slides: feed.filter((_, index) => index < this.display)
    })
  }

  render() {
    return (
      <div className='carousel-wrapper'
        style={{ width: this.state.finalWrapperWidth }}
      >
        <Arrow
          position='left'
          arrowColor='ff0000'
          handlerOnClick={() => this.setSlides('left')}
        />
        <div className='carousel-slides'>
          {
            this.state.slides.map(slide => (
              <div
                key={slide.id}
                className='slide'
              >
                <img src={slide.image.src} />
              </div>
            ))
          }
        </div>
        <Arrow
          position='right'
          arrowColor='ff0000'
          handlerOnClick={() => this.setSlides('right')}
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
