import React, { Component, Fragment } from 'react'

import TopParallax from '../Components/TopParallax'
import LazyLoad from '../Components/LazyLoad'

import './HomePage.css';

class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <div className="content">
          <div className="content-text">
            <TopParallax>
              <p>Welcome to my first cover page</p>
            </TopParallax>
          </div>
        </div>
        <LazyLoad
          retrieveData={this.props.retrieveData}
          disableLazyLoad={!this.props.feedAvailable}
          enableLoader={this.props.fetchFinished}
        >
          {
            this.props.feed.map((hike, index) => {
              return (
                <div key={index} className="section">
                  <div className={`${index % 2 !== 0 ? 'first' : 'second'} section-description`}>
                    <div className="section-description-content">
                      <h2>{hike.title}</h2>
                      <p>{hike.description}</p>
                    </div>
                  </div>
                  <div
                    className={`${index % 2 === 0 ? 'first' : 'second'} section-image`}
                    style={{
                      background: `url('${hike.image.src}')`
                    }}
                  >
                  </div>
                </div>
              )}
            )
          }
        </LazyLoad>
      </Fragment>
    )
  }
}

export default HomePage;