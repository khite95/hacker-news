import { handleResponse } from '.';

// remove user from local storage to log user out
export const logout = (): void => {
  localStorage.removeItem('user');
};

// checks if their is a user item in local storage
const isLoggedIn = () => {
  return localStorage.getItem('user');
};

// store user details and jwt token in local storage to keep user logged in between page refreshes
const setToken = (user: any) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const login = async (email: string, password: string) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  const mockUser = {
    success: true,
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjI0ZGFkYTMxMGQyMTdmZjM5MDEyYzAiLCJpYXQiOjE1MjkxNDIxMTd9.GI4lu7HFB0j3mnsJwX2LjGmGOblUq-X0NnGqD2YRMt0',
    user: {
      first_name: 'Billy',
      last_name: 'Bob',
      email: 'billybob@example.com',
      id: '5b24dada310d217ff39012c0'
    }
  };
  if (mockUser.token) {
    setToken(mockUser);
  }
  return mockUser;
  //Used a promise to mock user login and then handle authentication
  // return (
  //   mockUser
  //     // return fetch(
  //     //   `login api here`,
  //     //   requestOptions
  //     // )
  //     //.then(handleResponse)
  //     .then(user => {
  //       // login successful if there's a jwt token in the response
  //       if (user.token) {
  //         setToken(user);
  //       }
  //       return user;
  //     })
  // );
};
