import React, { Component } from 'react'

import './DotLoader.css'

class DotLoader extends Component {
  state = {
    active: 0,
    maxDots: 5
  }
  changeActive = () => {
    const currentActive = this.state.active + 1

    this.setState({
      active: currentActive > this.state.maxDots ? 0 : currentActive
    })
  }
  componentDidMount() {
    const interval = setInterval(this.changeActive, 500)
    this.setState({ interval })
  }
  componentWillUnmount() {
    clearInterval(this.state.interval)
  }
  render() {
    return <div className='dot-loader'>
      {
        Array(this.state.maxDots).fill(1).map((dot, i) =>
          <div key={i} className={`dot ${this.state.active === i ? 'active' : 'inactive'}`}></div>
        )
      }
    </div>
  }
}

export default DotLoader

