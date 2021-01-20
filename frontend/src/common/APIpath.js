//把API PATH統一列在這裡方便查詢
//server base URL
export const BASE_URL = 'http://localhost:4000/';
// 註冊
export const REGISTER = '/login/register';
// 登入
export const LOGIN = '/login/login';
// 重設密碼
export const RESET_PASSWORD = '/login/resetPassword';
// 用學號抓用戶暱稱
export const GET_NAME = '/user/getName'
// 抓用戶的個人資訊
export const GET_PERSONAL_INFO = '/user/getPersonalInfo'
// 更改用戶的個人資訊
export const SET_PERSONAL_INFO = '/user/modifyPersonalInfo'
// 拿取所有需求單(除了自己刊登的)
export const GET_ALL_POSTS = '/post/getAllPosts';
// 拿取特定標籤的需求單(除了自己刊登的)
export const GET_TAG_POSTS = '/post/getTagPosts';
// 拿取特定需求單
export const GET_ID_POST = '/post/getIdPost';
// 拿取特定幾張需求單
export const GET_ID_POSTS = '/post/getIdPosts';
// 拿取特定用戶(NTUID)刊登的需求單
export const GET_USER_POSTS = '/post/getUserPosts';
// 拿取特定用戶(NTUID)接單的資訊
export const GET_USER_SUPPLIES = '/post/getUserSupplies';
// 新增一張需求單
export const ADD_NEW_POST = '/post/addNewPost';
// 更改一張需求單
export const UPDATE_YOUR_POST = '/post/updateYourPost';
// 刪除一張需求單
export const DELETE_YOUR_POST = '/post/deleteYourPost';
// 刪除一張供給
export const DELETE_YOUR_SUPPLY = '/post/deleteYourSupply';
// 需求單接單
export const SUPPLY_POST = '/post/supplyPost';
// 對需求單送出留言
export const ADD_DEMAND_MESSAGE = '/message/addMessage';
// 取得需求單留言
export const GET_DEMAND_MESSAGE = '/message/getMessage';

/*===================================================================*/
// 上傳照片 這裡是用
export const UPLOAD_IMAGE_ACTION = 'http://localhost:4000/post/uploadImage';

export const DELETE_IMAGE_ACTION = '/post/deleteImage';

