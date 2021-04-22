interface IUserSubmission {
  user: IUser;
  token: string;
  success: boolean;
}

interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  password?: string;
  submitted?: boolean | string;
}

// store user details and jwt token in local storage to keep user logged in between page refreshes
const setToken = (user: IUser) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const createUserService = (user: IUser): IUserSubmission => {
  const createdUser = {
    success: true,
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjI0ZGFkYTMxMGQyMTdmZjM5MDEyYzAiLCJpYXQiOjE1MjkxNDE5Nzh9.Tm6dylTEN0mbx4Rxo5zDcS9Jo2yQx4zB0AxyxHiOdlc',
    user: {
      first_name: 'Billy',
      last_name: 'Bob',
      email: 'billybob@example.com',
      id: '5b24dada310d217ff39012c0'
    }
  };

  if (createdUser.token) {
    setToken(user);
  }
  return createdUser;
};
