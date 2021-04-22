import { authConstants } from '../constants';
import { history, login, logout } from '../helpers';

const authRequest = (user: { email: string }) => {
  return { type: authConstants.LOGIN_REQUEST, user };
};

const authSuccess = (user: {
  success: boolean;
  token: string;
  user: { first_name: string; last_name: string; email: string; id: string };
}) => {
  return { type: authConstants.LOGIN_SUCCESS, user };
};

const authFailure = (error: string) => {
  return { type: authConstants.LOGIN_FAILURE, error };
};

export const loginAction = (email: string, password: string) => {
  return async (
    dispatch: (arg0: { type: string; user?: any; error?: any }) => void
  ) => {
    dispatch(authRequest({ email }));

    try {
      const user = await login(email, password);
      dispatch(authSuccess(user));
      history.push('/roster');
    } catch (error) {
      dispatch(authFailure(error.toString()));
      dispatch(error(error.toString()));
    }
  };
};

export const logoutAction = () => {
  logout();
  return { type: authConstants.LOGOUT_REQUEST };
};
