/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const generateAuthHeader = () => {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
};
