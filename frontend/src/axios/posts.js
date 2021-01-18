import axios from 'axios'
import {BASE_URL, ADD_NEW_POST, GET_ALL_POSTS,GET_USER_POSTS, GET_TAG_POSTS, UPDATE_YOUR_POST,SUPPLY_POST} from '../common/APIpath'

const instance = axios.create({ baseURL: BASE_URL })
const imageInstance = axios.create({ baseURL: BASE_URL,  headers: {'Content-Type': 'multipart/form-data' } })



export const addNewPost = async (newPost) => {  //content:{NTU_ID, password}
  console.log('addNewPostAxios',newPost)
  const {
    data: { addNewPostResult }//succeed or not
  } = await imageInstance.post( ADD_NEW_POST, newPost ).catch((err) => console.error(err));
  console.log('post return data:',addNewPostResult)
  return addNewPostResult
}
//TODO
export const getTag = async (tag,name) => {
  console.log("get Tag Posts");
  const {
    data: { tagPosts }
  } = await instance.get( GET_TAG_POSTS, {tag:tag,name:name}).catch((err) => console.error(err));
  console.log("tagPosts:", tagPosts);
  return tagPosts
}
//TODO
export const getUserPost = async (name) => {
  console.log("get user Posts");
  const {
    data: { userPosts }
  } = await instance.get( GET_USER_POSTS, name).catch((err) => console.error(err));
  console.log("userPosts:", userPosts);
  return userPosts
}

//TODO
export const getAll = async (name) => {
  console.log("getAllPosts");
  const {
    data: { allPosts }
  } = await instance.get( GET_ALL_POSTS, name).catch((err) => console.error(err));
  console.log("allPosts:", allPosts);
  return allPosts
}

//TODO
export const updatePost = async (content) => {
    console.log('updatePost content:',content)
    const {
      data: { postResult }

    } = await instance.post(UPDATE_YOUR_POST, content)

    return postResult
}
  
//TODO
export const supply = async (postID) => {
  console.log("supply!!");
  const {
    data: { feedback }
  } = await instance.get( SUPPLY_POST,postID).catch((err) => console.error(err));
  console.log("supply feedback:", feedback);
  return feedback
}
  