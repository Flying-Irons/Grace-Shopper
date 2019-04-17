import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="app-page">
      <div className="header-title">
        <h1>FLYING IRON BAZAAR</h1>
      </div>
      <Navbar className="navbar" />
      <Routes />
    </div>
  )
}

export default App
