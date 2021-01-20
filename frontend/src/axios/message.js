import axios from 'axios'
import {ADD_DEMAND_MESSAGE, GET_DEMAND_MESSAGE, BASE_URL} from '../common/APIpath'

const instance = axios.create({ 
  baseURL: BASE_URL,
  headers: { 'Authorization':  'Token ' +   localStorage.getItem('token')}
})


export const addNewMessage = async (newMessage) => {  //
    console.log('addNewMessageAxios',newMessage)

    const {
      data: { addNewMessageResult }//succeed or not
    } = await instance.post( ADD_DEMAND_MESSAGE, { newMessageForm:  newMessage } ).catch((err) => console.error(err));
    console.log('addNewMessageAxios return data:',addNewMessageResult)
    return addNewMessageResult
}

export const getMessage = async (demand_id) => {  
    console.log('getMessageAxios', demand_id)

    const {
      data: { getMessageResult }//succeed or not
    } = await instance.post( GET_DEMAND_MESSAGE, { demand_id:  demand_id } ).catch((err) => console.error(err));
    console.log('getMessageAxios return data:', getMessageResult)
    return getMessageResult
}