const { UserController } = require('../../controllers/index');
const router = require('express').Router();
router.post('/signup', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getUser);
router.delete('/:userId', UserController.deleteUser);
router.post('/signin', UserController.signInUser);
module.exports = router;

//   createUser,
//   getAllUsers,
//   getUser,
//   deleteUser,
