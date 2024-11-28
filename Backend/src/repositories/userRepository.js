import users from '../models/user.js';

let userData = [...users];

const findAll = () => {
  return userData;
};

const findByUsername = (username) => {
  return userData.find(user => user.username === username);
};

const create = (user) => {
  user.id = userData.length + 1;
  userData.push(user);
  return user;
};

export default { findAll, findByUsername, create };
