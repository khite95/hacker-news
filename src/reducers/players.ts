/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { playerConstants } from '../constants';

export const players = (
  state: any = {},
  action: { type: any; players: any; error: any; id: any }
) => {
  switch (action.type) {
    case playerConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case playerConstants.GETALL_SUCCESS:
      return {
        ...action.players
      };
    case playerConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case playerConstants.DELETE_REQUEST:
      // add 'deleting:true' property to players being deleted
      // Using the last name as a key to delete from table
      return {
        ...state,
        players: state.players.map((player: { last_name: any }) =>
          player.last_name === action.id
            ? { ...player, deleting: true }
            : player
        )
      };
    case playerConstants.DELETE_SUCCESS:
      return {
        ...state,
        players: state.players.filter(
          (player: { last_name: any }) => player.last_name !== action.id
        )
      };

    case playerConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to player
      return {
        ...state,
        players: state.players.map(
          (player: { [x: string]: any; id?: any; deleting?: any }) => {
            if (player.id === action.id) {
              // make copy of player without 'deleting:true' property
              const { deleting, ...playerCopy } = player;
              // return copy of player with 'deleteError:[error]' property
              return { ...playerCopy, deleteError: action.error };
            }

            return player;
          }
        )
      };

    case playerConstants.CREATE_REQUEST:
      return { addingPlayer: true };
    case playerConstants.CREATE_SUCCESS:
      return {};
    case playerConstants.CREATE_FAILURE:
      return {};
    default:
      return state;
  }
};
