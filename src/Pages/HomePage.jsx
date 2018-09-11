import React, { Component, Fragment } from 'react'

import TopParallax from '../Components/TopParallax'
import LazyLoad from '../Components/LazyLoad'
import FadeAnimation from '../Components/FadeAnimation'

import './HomePage.css';

class HomePage extends Component {
  render() {
    return (
      <Fragment>
        <div className="content">
          <div className="content-text">
            <FadeAnimation types={['fadeIn', 'fadeUp']} time={'one'}>
              <TopParallax>
                <p>Welcome to my first cover page</p>
              </TopParallax>
            </FadeAnimation>
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
                <FadeAnimation
                  types={['fadeIn', 'fadeUp']}
                  time={'one'}
                >
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
                </FadeAnimation>
              )}
            )
          }
        </LazyLoad>
      </Fragment>
    )
  }
}

export default HomePage;