import { userConstants } from '../constants';
import { createUserService } from '../services';
import { success, error, loginAction } from '.';
import { history } from '../helpers';

const userCreateRequest = (user: {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };
  submitted: boolean;
}) => {
  return { type: userConstants.CREATE_REQUEST, user };
};

const userCreateSuccess = (user: {
  success: boolean;
  token: string;
  user: { first_name: string; last_name: string; email: string; id: string };
}) => {
  return { type: userConstants.CREATE_SUCCESS, user };
};

const userCreateFailure = (error: any) => {
  return { type: userConstants.CREATE_FAILURE, error };
};

export const createUser = (user: {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };
  submitted: boolean;
}) => {
  return async (
    dispatch: (arg0: {
      type: string;
      user?: any;
      message?: string;
      error?: any;
    }) => void
  ) => {
    dispatch(userCreateRequest(user));

    try {
      const newUser = await createUserService(user);
      dispatch(userCreateSuccess(newUser));
      history.push('/roster');
      dispatch(success('Registration successful'));
    } catch (error) {
      dispatch(userCreateFailure(error.toString()));
      dispatch(error(error.toString()));
    }
  };
};

export const submitLogin = (user: any) => {
  return async (
    dispatch: (
      arg0: (
        dispatch: (arg0: { type: string; user?: any; error?: any }) => void
      ) => Promise<void>
    ) => any
  ) => {
    try {
      const submitUser = await createUser(user);
      dispatch(loginAction(user.email, user.password));
    } catch (error) {
      console.log(error.toString());
    }
  };
};
