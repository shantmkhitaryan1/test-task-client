import axios from './Axios';

export const setAuthInfo = (token) => {
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const formattedNum = (num) => {
  return Number.parseFloat(num).toFixed(1);
}