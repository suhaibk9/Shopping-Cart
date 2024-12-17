const router = require('express').Router();

const { PingController } = require('../../controllers');

router.get('/', PingController);
module.exports = router;
