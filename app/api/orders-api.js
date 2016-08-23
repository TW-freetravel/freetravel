import express from 'express';
const router = express.Router();


router.post('/',(req,res,next) => {
  const orderData = req.body;
  console.log('======='+orderData.name);
  console.log('======='+orderData.phone);
  console.log('======='+orderData.address);
  console.log('======='+orderData.otherMessage);

});


export default router;
