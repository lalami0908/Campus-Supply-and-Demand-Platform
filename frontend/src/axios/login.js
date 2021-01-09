import axios from 'axios'
import {BASE_URL, REGISTER, LOGIN, RESET_PASSWORD} from '../common/APIpath'

const instance = axios.create({ baseURL: BASE_URL })

export const register = async (credential) => {//credential:{NTU_ID, password}
  const {
    data: { msg }
  } = await instance.post(REGISTER, { params: { credential }})

  return msg
}
//TODO
export const login = async (credential) => {
  const {
    data: { msg }
  } = await instance.post(LOGIN, { params: { credential }})

  return msg
}

//TODO
export const resetPassword = async (credential) => {
    const {
      data: { msg }
    } = await instance.post(RESET_PASSWORD, { params: { credential }})
  
    return msg
  }
  
  