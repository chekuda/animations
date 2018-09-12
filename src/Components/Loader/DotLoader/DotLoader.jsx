import React, { Component } from 'react'

import './DotLoader.css'

class DotLoader extends Component {
  state = {
    active: 0,
    maxDots: 5
  }
  changeActive() {
    setInterval(() => {
      const currentActive = this.state.active + 1
      this.setState({
        active: currentActive > this.state.maxDots ? 0 : currentActive 
      })
    }, 500)
  }
  componentDidMount() {
    this.changeActive()
  }
  componentWillUnmount() {
    clearInterval(this.changeActive)
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

