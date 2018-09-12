import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DotLoader from './DotLoader'
import SpinLoader from './SpinLoader'

import './Loader.css'

const typeLoaders = {
  dot: DotLoader,
  spin: SpinLoader
}

class Loader extends Component {
  render() {
    const CurrentLoader = typeLoaders[this.props.type] || DotLoader
    return <CurrentLoader />
  }
}

Loader.defaultProps = {
  type: 'dot'
}

Loader.propTypes = {
  type: PropTypes.string
}

export default Loader

