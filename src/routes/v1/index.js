const router=require('express').Router();
router.use('/ping',require('./pingRoutes'));
router.use('/product',require('./productRoute'));   
router.use('/category',require('./categoryRoute'));
module.exports=router;