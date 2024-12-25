const router=require('express').Router();
router.use('/ping',require('./pingRoutes'));
router.use('/product',require('./productRoute'));   
router.use('/category',require('./categoryRoute'));
router.use('/user',require('./userRoute'));
router.use('/cart',require('./cartRoute'));
module.exports=router;