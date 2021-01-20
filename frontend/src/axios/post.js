import axios from 'axios'
import {BASE_URL, ADD_NEW_POST, GET_ALL_POSTS,GET_USER_POSTS,GET_ID_POST,GET_ID_POSTS, GET_TAG_POSTS} from '../common/APIpath'
import {UPDATE_YOUR_POST,SUPPLY_POST,UPLOAD_IMAGE_ACTION,DELETE_IMAGE_ACTION,GET_USER_SUPPLIES} from '../common/APIpath'
const instance = axios.create({ baseURL: BASE_URL })
// const imageInstance = axios.create({ baseURL: BASE_URL,  headers: {'Content-Type': 'multipart/form-data' } })
// uploadImage through action in UI

export const addNewPost = async (newPost) => {  //
  console.log('addNewPostAxios',newPost)
  if(!newPost.fileList){
    newPost.fileList=[]
  }
  const {
    data: { addNewPostResult }//succeed or not
  } = await instance.post( ADD_NEW_POST, { newPostForm:  newPost } ).catch((err) => console.error(err));
  console.log('post return data:',addNewPostResult)
  return addNewPostResult
}
//TODO
export const getTag = async (params) => {
  console.log("get Tag Posts");
  const {
    data: { tagPosts }
  } = await instance.post( GET_TAG_POSTS, {...params}).catch((err) => console.error(err));
  console.log("tagPosts:", tagPosts);
  return tagPosts
}

export const getUserPost = async (NTUID) => {
  console.log("axios: get user Posts by NTUID", NTUID);
  const {
    data: { userPosts }
  } = await instance.post( GET_USER_POSTS,  { NTUID: NTUID}).catch((err) => console.error(err));
  console.log("userPosts:", userPosts);
  return userPosts
}
//TODO
export const getIdPost = async (postID) => {
  console.log("axios: get user Posts by id", postID);
  const {
    data: { uniquePost }
  } = await instance.post( GET_ID_POST,  { postID: postID}).catch((err) => console.error(err));
  console.log("uniquePost:", uniquePost);
  return uniquePost
}
//TODO
export const getIdPosts = async (postIDs) => {
  console.log("axios: get user Posts by ids", postIDs);
  const {
    data: { idPosts }
  } = await instance.post( GET_ID_POSTS,  { postIDs: postIDs}).catch((err) => console.error(err));
  console.log("get idPosts:", idPosts);
  return idPosts
}

//TODO
export const getUserSupplies = async (NTUID) => {
  console.log("get user Supplies");
  const {
    data: { userSupplies }
  } = await instance.post( GET_USER_SUPPLIES,{ NTUID: NTUID}).catch((err) => console.error(err));
  console.log("userSupplies:", userSupplies);
  return userSupplies
}
//TODO
export const getAll = async (NTUID) => {
  console.log("getAllPosts");
  const {
    data: { allPosts }
  } = await instance.post( GET_ALL_POSTS, { NTUID: NTUID}).catch((err) => console.error(err));
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
export const supply = async (params) => {
  console.log("supply!!");
  const {
    data: { feedback }
  } = await instance.put( SUPPLY_POST,{...params}).catch((err) => console.error(err));
  console.log("supply feedback:", feedback);
  return feedback
}
/***************************************************** */

//TODO
// export const uploadImage = async (image) => {
//   console.log('uploadImage:',image)
//   await instance.post(UPLOAD_IMAGE_ACTION, image)
// }

//TODO
export const deleteImage = async (image) => {
  console.log('deleteImage:',image)
  await instance.delete(DELETE_IMAGE_ACTION, image)
}