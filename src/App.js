import React, { Component } from 'react'
import logo from './logo.svg'
import Board from './Board'
import './App.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import boardReducer from './reducer'

const store = createStore(
  boardReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class App extends Component {
  render () {
    return (
      <Provider store={store} >
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>React DnD and Redux Example</h2>
          </div>
          <div className="content">
            <Board />
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
