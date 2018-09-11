import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Loader from '../Loader'

class LazyLoad extends Component {
  state = {
    loading: false
  }

  bindEvents = () => {
    document.addEventListener('scroll', this.lazyLoad)
  }
  unBindEvents = () => {
    document.removeEventListener('scroll', this.lazyLoad)
  }

  displayLoader = (loading) => {
    this.setState({
      loading
    })
  }

  lazyLoad = () => {
    const { disableLazyLoad, retrieveData, enableLoader } = this.props

    if(disableLazyLoad) {
      this.displayLoader(false)
      this.unBindEvents()
    } else if ((window.innerHeight + window.scrollY === document.body.scrollHeight) && enableLoader) {
      this.displayLoader(true)
      retrieveData({ func: () => this.displayLoader(false) })
    }
  }

  componentWillUnmount() {
    this.unBindEvents()
  }

  componentDidMount() {
    this.bindEvents()
  }

  render() {
    return (
      <Fragment>
        { this.props.children }
        { this.state.loading && <Loader /> }
      </Fragment>
    )
  }
}

LazyLoad.propTypes = {
  enable: PropTypes.bool,
  enableLoader: PropTypes.bool,
  retrieveData: PropTypes.func
}

export default LazyLoad
