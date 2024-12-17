const errorResponse = require('../utils/error_response');
const BadRequest = require('../exceptions/bad_request_error');

const createCategoryValidator = (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description) {
    const errorMessage = 'The request body must include name and description';
    const error = new BadRequest(errorMessage);
    return res.status(400).json(errorResponse(errorMessage, error));
  }

  next();
};

module.exports = {
  createCategoryValidator,
};
