// const errorResponse = require('../utils/error_response');
// const BadRequest = require('../exceptions/bad_request_error');
// const createProductValidator = (req, res, next) => {
//   if (!req.body.title) {
//     const x = new BadRequest('title is missing from the request body');
//     return res
//       .status(400)
//       .json(errorResponse('title is missing from the request body', x));
//   }
//   if (!req.body.price) {
//     return res
//       .status(400)
//       .json(
//         errorResponse(
//           'price is missing from the request body',
//           new BadRequest('price')
//         )
//       );
//   }
//   next();
// };
// module.exports = {
//   createProductValidator,
// };
// function errorResponse(reasonPhrase, error) {
//   return {
//     success: false,
//     data: {},
//     message: reasonPhrase,
//     error: error,
//   };
// // }
// class BadRequest extends Error {
//   constructor(property, invalidProperty = null, reason = null) {
//     const errorMessage = invalidProperty
//       ? `${property} is invalid in the request`
//       : `${property} is missing from the request body`;
//     super(errorMessage);
//     this.statusCode = StatusCodes.BAD_REQUEST;
//     this.reason = reason ? reason : ReasonPhrases.BAD_REQUEST;
//     this.errorMessage = errorMessage;
//     this.name = 'BadRequest';
//   }
// }

const errorResponse = require('../utils/error_response');
const BadRequest = require('../exceptions/bad_request_error');

const createProductValidator = (req, res, next) => {
  const { title, description, category, price, image } = req.body;

  if (!title || !description || !category || !price || !image) {
    const errorMessage =
      'The request body must include title, description, category, price, and image';
    const error = new BadRequest(errorMessage);
    return res.status(400).json(errorResponse(errorMessage, error));
  }

  next();
};

module.exports = {
  createProductValidator,
};
