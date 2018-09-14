import React, { Component } from 'react'

import Carousel from '../../Components/Carousel'

import { myFetch } from '../../helpers/fetchData'

class CarouselContainer extends Component {
  constructor(props) {
    super(props)
    this.dataType = 'slides'
    this.state = {
      feed: []
    }
  }
  componentDidMount() {
    myFetch(this.dataType, 0)
      .then(({ fetchedFeeds }) => {
        this.setState({
          feed: this.state.feed.concat(...fetchedFeeds)
        })
      })
  }
  render() {
    return this.state.feed.length
      ? <Carousel feed={this.state.feed} margin='10' imageSize={{ width: 300, height: 300 }}/>
      : null
  }
}


export default CarouselContainer