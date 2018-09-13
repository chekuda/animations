import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import Home from './Container/Home'
import CarouselPage from './Pages/CarouselPage'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<CarouselPage />, document.getElementById('root'))
registerServiceWorker()
