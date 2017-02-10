import {MOVE_KNIGHT} from './constants'

function boardReducer (state = {position: {kx: 7, ky: 7}}, action) {
  const {position} = action
  switch (action.type) {
    case MOVE_KNIGHT:
      return {
        ...state,
        position
      }
    default:
      return state
  }
}

export default boardReducer
