import {MOVE_KNIGHT} from './constants'
export const setKnightPosition = (kx, ky) => {
  return {
    type: MOVE_KNIGHT,
    position: {kx, ky}
  }
}
