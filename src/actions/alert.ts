import { alertConstants } from '../constants';

export const success = (message: string) => {
  return { type: alertConstants.SUCCESS, message };
};

export const error = (message: string) => {
  return { type: alertConstants.ERROR, message };
};

export const clear = () => {
  return { type: alertConstants.CLEAR };
};
