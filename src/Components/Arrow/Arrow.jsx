import React from 'react'
import PropTypes from 'prop-types'

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
  wrapper
}) => {
  return (
    <div
      style={{
        background: `#${wrapper.color}`
      }}
      className={`arrow-wrapper ${arrowClasses[position]} ${wrapperSquare[wrapper.shape]}`}
    >
      <div
        className={`arrow ${direction[position]}`}
        style={{
          ...customDimesions, 
          borderColor: `#${arrowColor}`
        }}>
      </div>
    </div>
  )
}

Arrow.defaultProps = {
  position: 'bottom',
  customDimesions: {},
  borderColor: 'fff',
  wrapper: {
    color: 'transparent',
    shape: 'square'
  }
}

Arrow.propTypes = {
  position: PropTypes.string,
  customStyles: PropTypes.object,
  borderColor: PropTypes.string,
  wrapper: PropTypes.shape({
    color: PropTypes.string,
    shape: PropTypes.string
  })
}

export default Arrow