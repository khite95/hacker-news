/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { userConstants } from '../constants';

const user = JSON.parse(localStorage.getItem('user') || '{}');
const initialState = user ? { loggedIn: false, user } : {};

export const registration = (
  state = initialState,
  action: { type: any; user: any }
) => {
  switch (action.type) {
    case userConstants.CREATE_REQUEST:
      return {
        loggedIn: false,
        user: action.user
      };
    case userConstants.CREATE_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.CREATE_FAILURE:
      return {};
    default:
      return state;
  }
};
