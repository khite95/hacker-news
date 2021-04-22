import { logoutAction } from '../actions';

export const handleResponse = async (response: {
  text: () => Promise<any>;
  ok: any;
  status: number;
  statusText: string;
}) => {
  const text = await response.text();
  const data = text && JSON.parse(text);
  if (!response.ok) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      logoutAction();
      window.location.reload(true);
    }
    let error = (data && data.message) || response.statusText;
    if (data && data.error.message && response.statusText) {
      error = response.statusText + ' - ' + data.error.message;
    }
    return Promise.reject(error);
  }
  return data;
};
