import axios from 'axios'
import {BASE_URL, REGISTER, LOGIN, RESET_PASSWORD} from '../common/APIpath'

const instance = axios.create({ baseURL: BASE_URL })

export const register = async (credential) => {//credential:{NTU_ID, password}
  console.log('frontend credential:',credential)
  const {
    data: { register }
  } = await instance.post(REGISTER, credential)
  console.log('post return data:',register)
  return register
}
//TODO
export const login = async (credential) => {
  const {
    data: { login }
  } = await instance.post(LOGIN, { params: { login }})

  return login
}

//TODO
export const resetPassword = async (credential) => {
    const {
      data: { msg }
    } = await instance.post(RESET_PASSWORD, { params: { credential }})
  
    return msg
  }
  
  