const router=require('express').Router();
router.use('/ping',require('./pingRoutes'));
router.use('/product',require('./productRoute'));   
module.exports=router;