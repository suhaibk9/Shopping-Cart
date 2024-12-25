const InternalServerError = require('../exceptions/internal_server_error');
const NotFoundError = require('../exceptions/not_found_error');
const BadRequestError = require('../exceptions/bad_request_error');
const UnauthorizedError = require('../exceptions/unauthorized_error');
const { User } = require('../models/index');
class UserRepository {
  async getUserByEmail(email) {
    try {
      const response = await User.findOne({
        where: {
          email: email,
        },
      });
      return response;
    } catch (err) {
      console.log('Error in UserRepository.getUserByEmail', err);
      throw err;
    }
  }
  async createUser(email, password) {
    try {
      return await User.create({
        email,
        password,
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getUsers() {
    try {
      return await User.findAll();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getUser(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new NotFoundError('User', 'id', userId);
      }
      return user;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async destroyUser(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new NotFoundError('User', 'id', userId);
      }
      await user.destroy();
      return user;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
module.exports = UserRepository;
