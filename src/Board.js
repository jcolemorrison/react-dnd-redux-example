/* @flow */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Knight from './Knight'
import BoardSquare from './BoardSquare'
import {setKnightPosition} from './actions'

class Board extends Component {
  static propTypes = {
    position: PropTypes.objectOf(PropTypes.number),
    setKnightPosition: PropTypes.func
  }

  canMove = (x, y) => {
    const {kx, ky} = this.props.position

    const dx = x - kx
    const dy = y - ky

    return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
           (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  }

  movePiece = (x, y) => {
    if (!this.canMove(x, y)) return false
    this.props.setKnightPosition(x, y)
  }

  renderPiece (x, y) {
    const {kx, ky} = this.props.position
    if (x === kx && y === ky) {
      return <Knight />
    }
  }

  renderSquare (i) {
    const x = i % 8
    const y = Math.floor(i / 8)

    return (
      <div key={i}
           style={{ width: '100px', height: '100px' }}>
        <BoardSquare
          canMovePiece={this.canMove}
          movePiece={this.movePiece}
          position={{x, y}}>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    )
  }

  render () {
    const squares = []
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i))
    }

    return (
      <div
        style={{
        width: '800px',
        height: '800px',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
    )
  }
}

const mapStateToProps = state => state

Board = DragDropContext(HTML5Backend)(Board)
Board = connect(mapStateToProps, {setKnightPosition})(Board)

export default Board
