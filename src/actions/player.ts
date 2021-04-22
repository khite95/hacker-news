import { playerConstants } from '../constants';
import { getAllService, createService, delService } from '../services';
import { history } from '../helpers';
import { success } from '.';

const playerCreateRequest = (player: any) => {
  return { type: playerConstants.CREATE_REQUEST, player };
};

const playerCreateSuccess = (player?: any) => {
  return { type: playerConstants.CREATE_SUCCESS, player };
};

const playerCreateFailure = (error: any) => {
  return { type: playerConstants.CREATE_FAILURE, error };
};

const playerGetAllRequest = () => {
  return { type: playerConstants.GETALL_REQUEST };
};

const playerGetAllSuccess = (players: any) => {
  return { type: playerConstants.GETALL_SUCCESS, players };
};

const playerGetAllFailure = (error: any) => {
  return { type: playerConstants.GETALL_FAILURE, error };
};

const playerDeleteRequest = (id: number) => {
  return { type: playerConstants.DELETE_REQUEST, id };
};

const playerDeleteSuccess = (id: number) => {
  return { type: playerConstants.DELETE_SUCCESS, id };
};

const playerDeleteFailure = (id: number, error: any) => {
  return { type: playerConstants.DELETE_FAILURE, id, error };
};

//Make async call to api, handle promise, dispatch action when promise is resolved
export const getAll = () => {
  return async (
    dispatch: (arg0: { type: any; players?: any; error?: any }) => void
  ) => {
    dispatch(playerGetAllRequest());
    try {
      const players = await getAllService();
      //const players = getAllService();
      dispatch(playerGetAllSuccess(players));
    } catch (error) {
      dispatch(playerGetAllFailure(error.toString()));
    }
  };
};

export const del = (id: number) => {
  return async (
    dispatch: (arg0: {
      type: any;
      id?: any;
      message?: string;
      error?: any;
    }) => void
  ) => {
    dispatch(playerDeleteRequest(id));
    try {
      const deletedPlayer = await delService(id);
      dispatch(playerDeleteSuccess(id));
      dispatch(success('Deleted Player'));
    } catch (error) {
      dispatch(playerDeleteFailure(id, error.toString()));
    }
  };
};

//Make async call to api, handle promise, dispatch action when promise is resolved
export const create = (player: any) => {
  return async (
    dispatch: (arg0: {
      type: any;
      player?: any;
      message?: string;
      error?: any;
    }) => void
  ) => {
    dispatch(playerCreateRequest(player));

    try {
      const createdPlayer = await createService(player);
      dispatch(playerCreateSuccess());
      history.push('/roster');
      dispatch(success('Added New Player'));
    } catch (error) {
      dispatch(playerCreateFailure(error.toString()));
    }
  };
};
