export const BASE_URL = process.env.BASE_URL | 'http://localhost:3000/'
const mongoose = require('mongoose');
export const Demand = mongoose.model('Demand');
export const Supply = mongoose.model('Supply');
export const User = mongoose.model('User');
export const Message = mongoose.model('Message');
export const Personal = mongoose.model('Personal');
export const SYSTEM_MSG = "====！系統留言！"