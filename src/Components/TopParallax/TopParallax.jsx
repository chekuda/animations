import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TopParallax extends Component {
  constructor(props) {
    super(props)
    this.state = {
      enable: this.props.enable,
      currentSettings: {
        ...this.props.settings
      }
    }
  }
  topParallax = event => {
    const currentSpeed = this.state.currentSettings.speed

    this.setState({
      currentSettings: {
        ...this.state.currentSettings,
        transform: `translate3d(0px,${(window.pageYOffset * currentSpeed)}px, 0px)`
      }
    })
  }
  componentDidMount() {
    if(!this.state.enable) return

    window.addEventListener('scroll', this.topParallax, { passive: false })
  }
  componentWillUnmount() {
    if(!this.state.enable) return

    document.removeEventListener('scroll', this.topParallax, { passive: false })
  }

  setRef = ref => {
    this.animationWrapper = ref
  }

  render() {
    return (
      <div ref={this.setRef}
        className='top-parallax'
        style={{
          ...this.state.currentSettings
        }}
      >
        { this.props.children }
      </div>
    )
  }
}

TopParallax.defaultProps = {
  enable: true,
  settings: {
    speed: 0.2
  }
}

TopParallax.propTypes = {
  enable: PropTypes.bool,
  settings: PropTypes.shape({
    speed: PropTypes.double
  })
}

export default TopParallax