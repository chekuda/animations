import React, { Component } from 'react'

import HomePage from '../../Pages/HomePage'

import { myFetch } from '../../helpers/fetchData'

class Home extends Component {
  constructor(props) {
    super(props)
    this.dataType = 'hikes'
  }
  state = {
    feed: [],
    currentIndex: 0
  }

  retrieveData = ({ amount = 2, func = () => {} } = {}) => {
    const { currentIndex } = this.state

    this.setState({
      fetchFinished: false
    })
    myFetch(this.dataType, currentIndex, amount)
      .then(({ fetchedFeeds, newIndex, feedAvailable }) => {
        const currentFeed = this.state.feed.concat(...fetchedFeeds)

        func()
        this.setState({
          feed: currentFeed,
          currentIndex: newIndex,
          feedAvailable,
          fetchFinished: true
        })
      })
  }
  componentDidMount() {
    this.retrieveData()
  }
  render() {
    return(
      <HomePage
        feed={this.state.feed}
        retrieveData={this.retrieveData}
        feedAvailable={this.state.feedAvailable}
        fetchFinished={this.state.fetchFinished}
      />
    )
  }
}

export default Home