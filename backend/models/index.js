export const BASE_URL = 'http://localhost:4000/'
const mongoose = require('mongoose');
export const Demand = mongoose.model('Demand');
export const Supply = mongoose.model('Supply');
export const User = mongoose.model('User');