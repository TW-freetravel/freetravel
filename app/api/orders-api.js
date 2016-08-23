import express from 'express';
const router = express.Router();


router.post('/',(req,res,next) => {
  const orderData = req.body;
  console.log('======='+orderData);


});


export default router;
