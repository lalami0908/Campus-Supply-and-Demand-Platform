const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if(authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: 'WebProgrammingFinal',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    algorithms: ['SHA512'],
  }),
  optional: jwt({
    secret: 'WebProgrammingFinal',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
    algorithms: ['SHA512'],
  }),
};

module.exports = auth;