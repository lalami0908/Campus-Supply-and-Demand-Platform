import axios from 'axios'
import {BASE_URL, ADD_NEW_POST, GET_ALL_POSTS,GET_USER_POSTS, GET_TAG_POSTS} from '../common/APIpath'
import {UPDATE_YOUR_POST,SUPPLY_POST,UPLOAD_IMAGE_ACTION,DELETE_IMAGE_ACTION,GET_USER_SUPPLIES} from '../common/APIpath'
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
export const getTag = async (tag,NTUID) => {
  console.log("get Tag Posts");
  const {
    data: { tagPosts }
  } = await instance.get( GET_TAG_POSTS, {tag:tag,NTUID:NTUID}).catch((err) => console.error(err));
  console.log("tagPosts:", tagPosts);
  return tagPosts
}
//TODO
export const getUserPost = async (NTUID) => {
  console.log("get user Posts");
  const {
    data: { userPosts }
  } = await instance.get( GET_USER_POSTS, NTUID).catch((err) => console.error(err));
  console.log("userPosts:", userPosts);
  return userPosts
}
//TODO
export const getUserSupplies = async (NTUID) => {
  console.log("get user Supplies");
  const {
    data: { userSupplies }
  } = await instance.get( GET_USER_SUPPLIES, NTUID).catch((err) => console.error(err));
  console.log("userSupplies:", userSupplies);
  return userSupplies
}
//TODO
export const getAll = async (NTUID) => {
  console.log("getAllPosts");
  const {
    data: { allPosts }
  } = await instance.get( GET_ALL_POSTS, NTUID).catch((err) => console.error(err));
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
  

//TODO
export const uploadImage = async (image) => {
  console.log('uploadImage:',image)
  await instance.post(UPLOAD_IMAGE_ACTION, image)
}

//TODO
export const deleteImage = async (image) => {
  console.log('deleteImage:',image)
  await instance.delete(DELETE_IMAGE_ACTION, image)
}