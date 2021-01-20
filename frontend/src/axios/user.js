import axios from 'axios'

import {BASE_URL, GET_NAME, GET_PERSONAL_INFO,SET_PERSONAL_INFO} from '../common/APIpath'

const instance = axios.create({ 
  baseURL: BASE_URL,
  headers: { 'Authorization':  'Token ' +   localStorage.getItem('token')}
})

export const getName = async (NTUID) => {
    console.log("getName");
    const {
      data: { findUser }
    } = await instance.get( GET_NAME,  { params: NTUID }).catch((err) => console.error(err));
    console.log("findUser", findUser);
    return findUser
  }

 export const getPersonalInfo = async (name) => {
    console.log("getName");
    const {
      data: { personalInfo }
    } = await instance.get( GET_PERSONAL_INFO,  { params: {name} }).catch((err) => console.error(err));
    console.log("personalInfo", personalInfo);
    return personalInfo
}
export const setPersonalInfo = async (info) => {
    console.log("setPersonalInfo getName");
    const {
      data: { personalInfoResult }
    } = await instance.post( SET_PERSONAL_INFO,   info ).catch((err) => console.error(err));
    console.log("setPersonalInfo personalInfoResult", personalInfoResult);
    return personalInfoResult
}