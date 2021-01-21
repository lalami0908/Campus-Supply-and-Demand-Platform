import axios from 'axios'
import {BASE_URL, REGISTER, LOGIN, RESET_PASSWORD} from '../common/APIpath'

const instance = axios.create({ 
  baseURL: BASE_URL,
  headers: { 'Authorization':  'Token ' +   localStorage.getItem('token')}
})


export const register = async (credential) => {  //credential:{NTU_ID, password}
  // console.log('frontend credential:',credential)
  // console.log("registerAxios");
  
  const {
    data: { registerResult }
  } = await instance.post( REGISTER, credential ).catch((err) => console.error(err));
  // console.log('post return data:',registerResult)
  return registerResult
}

export const login = async (loginInfo) => {

  try {
    console.log("loginAxios");
    const {
      data: { loginResult }
    } = await instance.post( LOGIN,  { user: loginInfo} ).catch((err) => console.error(err));
    // console.log("loginResult", loginResult);
    return loginResult
  }
  catch (e) {
    alert("系統異常，請重新整理"); 
  }
}

//TODO
export const resetPassword = async (credential) => {
    try {
      const {
        data: { msg }
      } = await instance.post(RESET_PASSWORD, { params: { credential }})
      return msg
    }
    catch (e) {
      alert("系統異常，請重新整理"); 
    }
}
  
  