const error_response = require('../utils/error_response');
const UnauthorizedError = require('../exceptions/unauthorized_error');

const { verifyToken } = require('../utils/auth');
const isLoggedIn = async (req, res, next) => {
  console.log('Cookies: ', req.cookies);
  try {
    if (!req.cookies || !req.cookies.token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          errorResponse(ReasonPhrases.UNAUTHORIZED, new UnauthorizedError())
        );
    }
    const token = req.cookies.token;
    const user = await verifyToken(token);
    req.user = {
      id: user.id,
      email: user.email,
    };
    console.log('Middleware finished. Moving to next...');
    next();
  } catch (e) {
    // return res
    //   .status(401)
    //   .json(error_response('Unauthorized', new UnauthorizedError()));
    return res.status(e.statusCode).json(errorResponse(e.reason, e));
  }
};
module.exports = {
  isLoggedIn,
};
