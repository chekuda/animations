import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './FadeAnimation.css'

const fadeAnimations = {
  fadeIn: 'in',
  fadeUp: 'up',
  fadeRight: 'right',
  fadeLeft: 'left'
}

class FadeAnimation extends Component {
  render() {
    const { types, children, time } = this.props
    const currentAnimation = types.reduce((acc, type) =>
      fadeAnimations[type]
        ? acc.concat(`fade-${fadeAnimations[type]}`)
        : acc
    , [])

    if(currentAnimation.length === 0) return children

    return (
      <div className={`fade ${currentAnimation.join(' ')} ${time}`}>
        { children }
      </div>
    )
  }
}

FadeAnimation.defaultProps = {
  type: []
}

FadeAnimation.propTypes = {
  type: PropTypes.array,
  time: PropTypes.string
}


export default FadeAnimation
