var express = require('express');
var router = express.Router();
const jwt=require('jsonwebtoken')

const adminHelper=require('../helper/adminHelper')

/* GET home page. */
const checkToken=(req,res,next)=>{
  let token=req.headers.authorization
  if(token){
    let auth=jwt.verify(token, process.env.JWT_SECRET)
   if(auth){
     next()
   }
  }else{
    res.status(400).json({errorMessage:"Authentication error"})
  }     
}   



router.post('/login', function(req, res) {
 adminHelper.doLogin(req.body).then((response)=>{
   if(response){
    const token=jwt.sign({email:req.body.email,password:req.body.password},process.env.JWT_SECRET);
    res.status(200).json({token:token})
   }else{
     res.status(400).json({message:"admin not existing in this email"})
   }
 })
  
});

router.post('/addTicket',checkToken,(req,res)=>{
  adminHelper.addTicket(req.body.data).then((response)=>{
    if(response){
      res.status(200).json({message:"item added"})
    }else{
      res.status(400).json({message:"product exist"})
    }
  })
})
router.get('/getTickets',checkToken,(req,res)=>{
  adminHelper.getTickets().then((response)=>{
    res.status(200).json(response)
  })
})
router.post('/changePublish',checkToken,(req,res)=>{
  adminHelper.changePublish(req.body.id).then(()=>{
    res.status(200).json({message:"change done"})
  })
})
module.exports = router;
 