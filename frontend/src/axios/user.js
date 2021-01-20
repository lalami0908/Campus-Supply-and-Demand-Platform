import axios from 'axios'

import {BASE_URL, GET_NAME } from '../common/APIpath'

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