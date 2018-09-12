import React, { Component, Fragment } from 'react'

import TopParallax from '../Components/TopParallax'
import LazyLoad from '../Components/LazyLoad'
import FadeAnimation from '../Components/FadeAnimation'
import Arrow from '../Components/Arrow'

import './HomePage.css';

class HomePage extends Component {
  scrollToBottom = () => {
    const totalPage = document.body.scrollHeight
    const totalScroll = (window.scrollY + window.innerHeight) === totalPage
      ? totalPage
      : window.innerHeight

    window.scroll({
      top: totalScroll,
      left: 0,
      behavior: 'smooth'
    })
  }

  render() {
    return (
      <Fragment>
        <div className="content">
          <div className="content-text">
            <FadeAnimation types={['fadeIn', 'fadeDown']} time={'one'}>
              <TopParallax>
                <p>Welcome to my first cover page</p>
              </TopParallax>
            </FadeAnimation>
          </div>
            <Arrow
              position='bottom'
              arrowColor='ffffff'
              handlerOnClick={this.scrollToBottom}
            />
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
                  key={index}
                  types={['fadeIn', 'fadeUp']}
                  time={'one'}
                >
                  <div className="section">
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