import axios from '../Redux/axios'

export const setAuthInfo = token => {
  localStorage.setItem('token', token)
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const formattedNum = num => {
  return Number.parseFloat(num).toFixed(1)
}
