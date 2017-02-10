import React, { Component, PropTypes } from 'react'
import { ItemTypes } from './constants'
import { DragSource } from 'react-dnd'
import knightImage from './knight.png'

const knightSource = {
  beginDrag (props, dnd, element) {
    console.log('props of knight, since these aren\'t in the docs')
    console.log(props, dnd, element)
    return {}
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class Knight extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  }

  componentDidMount() {
    const img = new Image();
    img.src = knightImage
    this.props.connectDragPreview(img);
  }

  render () {
    const { connectDragSource, isDragging } = this.props

    return connectDragSource(
      <div action={this.action} style={{
        backgroundColor: isDragging ? 'transparent' : 'transparent',
        opacity: isDragging ? 0.25 : 1,
        fontSize: 40,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
        ♘
      </div>
    )
  }
}

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight)
