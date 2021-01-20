export const BASE_URL = 'http://140.112.228.116:4000/'
const mongoose = require('mongoose');
export const Demand = mongoose.model('Demand');
export const Supply = mongoose.model('Supply');
export const User = mongoose.model('User');
export const Message = mongoose.model('Message');
export const SYSTEM_MSG = "====！系統留言！"