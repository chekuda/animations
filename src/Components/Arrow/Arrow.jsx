import React from 'react'
import PropTypes from 'prop-types'
import FadeAnimation from '../FadeAnimation'

import './Arrow.css'

const arrowClasses = {
  bottom: 'bottom-center',
  top: 'top-center',
  left: 'left-center',
  right: 'right-center'
}

const direction = {
  bottom: 'bottom-direction',
  top: 'top-direction',
  left: 'left-direction',
  right: 'right-direction'
}

const wrapperSquare = {
  square: 'square',
  circle: 'circle'
}

const Arrow = ({
  position,
  customDimesions,
  arrowColor,
  wrapper,
  handlerOnClick,
  animation,
  arrowWidth
}) => {
  return (
    <div
      style={{
        background: `#${wrapper.color}`
      }}
      className={`arrow-wrapper ${arrowClasses[position || 'bottom']} ${wrapperSquare[wrapper.shape]}`}
    >
      <FadeAnimation types={animation} time={'one'}>
        <div
          className={`arrow ${direction[position]} width-${arrowWidth}`}
          style={{
            ...customDimesions,
            borderColor: `#${arrowColor}`
          }}
          onClick={handlerOnClick}
        >
        </div>
      </FadeAnimation>
    </div>
  )
}

Arrow.defaultProps = {
  position: 'bottom',
  customDimesions: {},
  arrowColor: 'fff',
  animation: [],
  wrapper: {
    color: 'transparent',
    shape: 'square'
  },
  arrowWidth: 2,
  handlerOnClick: () => {}
}

Arrow.propTypes = {
  position: PropTypes.string,
  customStyles: PropTypes.object,
  arrowColor: PropTypes.string,
  wrapper: PropTypes.shape({
    color: PropTypes.string,
    shape: PropTypes.string
  }),
  handlerOnClick: PropTypes.func,
  animation: PropTypes.array,
  arrowWidth: PropTypes.string
}

export default Arrow