/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from './constants'
import Square from './Square'

const squareTarget = {
  canDrop (props) {
    const {canMovePiece, position: {x, y}} = props
    return canMovePiece(x, y)
  },

  drop (props) {
    const {movePiece, position: {x, y}} = props
    movePiece(x, y)
  }
}

function collect (connect, monitor) {
  const info = {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }

  return info
}

class BoardSquare extends Component {
  static propTypes = {
    position: PropTypes.objectOf(PropTypes.number),
    isOver: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func,
    movePiece: PropTypes.func
  }

  renderOverlay (color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    )
  }

  render () {
    const { position: {x, y}, connectDropTarget, isOver, canDrop } = this.props
    const black = (x + y) % 2 === 1
    const dropStyle = {
      position: 'relative',
      width: '100%',
      height: '100%'
    }

    return connectDropTarget(
      <div style={dropStyle}>
        <Square black={black}>
          {this.props.children}
        </Square>
        {isOver && !canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>
    )
  }
}

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare)
