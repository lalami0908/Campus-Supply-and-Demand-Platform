//把API PATH統一列在這裡方便查詢
//server base URL
export const BASE_URL = 'http://localhost:4000/';
// 註冊
export const REGISTER = '/login/register';
// 登入
export const LOGIN = '/login/login';
// 重設密碼
export const RESET_PASSWORD = '/login/resetPassword';
// 拿取所有需求單
export const GET_ALL_POSTS = '/post/getAllPosts';
// 拿取特定標籤的需求單
export const GET_TAG_POSTS = '/post/getTagPosts';
// 新增一張需求單
export const ADD_NEW_POST = '/post/addNewPost';
// 更改一張需求單
export const UPDATE_YOUR_POST = '/post/updateYourPost';
// 需求單接單
export const SUPPLY_POST = '/post/supplyPost';