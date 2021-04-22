/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { authConstants } from '../constants';

const user = JSON.parse(localStorage.getItem('user') || '{}');
const initialState = user ? { loggedIn: false, user } : {};

export const authentication = (
  state = initialState,
  action: { type: never; user: never }
) => {
  switch (action.type) {
    case authConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case authConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case authConstants.LOGIN_FAILURE:
      return {};
    default:
      return state;
  }
};
