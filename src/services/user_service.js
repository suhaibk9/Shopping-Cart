const InternalServerError = require('../exceptions/internal_server_error');
const NotFoundError = require('../exceptions/not_found_error');
const BadRequestError = require('../exceptions/bad_request_error');
const UnauthorizedError = require('../exceptions/unauthorized_error');
const { Cart } = require('../models/index');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../utils/auth');
class UserService {
  constructor(userRepository, cartRepository) {
    this.userRepository = userRepository;
    this.cartRepository = cartRepository;
  }
  async createUser(user) {
    try {
      const newUser = await this.userRepository.createUser(
        user.email,
        user.password
      );
      await this.cartRepository.createCart(newUser.id);
      return newUser;
    } catch (e) {
      console.log(e);
      if (e.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestError('User', 'email', 'Email already exists');
      }
      throw new InternalServerError();
    }
  }
  async getUsers() {
    try {
      const users = await this.userRepository.getUsers();
      return users;
    } catch (e) {
      console.log(e);
      if (e instanceof NotFoundError) {
        throw e;
      }
      throw new InternalServerError();
    }
  }
  async getUser(userId) {
    try {
      const user = await this.userRepository.getUser(userId);
      return user;
    } catch (e) {
      console.log(e);
      if (e instanceof NotFoundError) {
        throw e;
      }
      throw new InternalServerError();
    }
  }
  async deleteUser(userId) {
    try {
      const user = await this.userRepository.destroyUser(userId);
      return user;
    } catch (e) {
      console.log(e);
      if (e instanceof NotFoundError) {
        throw e;
      }
      throw new InternalServerError();
    }
  }
  async signInUser(email, password) {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      if (!user) {
        throw new NotFoundError('User', 'email', email);
      }
      const isPasswordValid = await bcrypt.compareSync(password, user.password);
      console.log('isPasswordValid', isPasswordValid);
      if (!isPasswordValid) {
        throw new UnauthorizedError();
      }
      return generateJWT({
        id: user.id,
        email: user.email,
      });
    } catch (e) {
      console.log('User Controller', e);
      if (e instanceof UnauthorizedError) {
        throw e;
      }
      throw new InternalServerError();
    }
  }
}

module.exports = UserService;
