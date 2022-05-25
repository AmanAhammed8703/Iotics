var express = require('express');
var router = express.Router();
const publicHelper=require('../helper/publicHelper')

/* GET users listing. */
router.post('/searchTickets', function(req, res) {
  publicHelper.fetchTickets(req.body.date).then((response)=>{
    if(response.length>0){
      res.status(200).json({result:response})
    }else{
      res.status(400).json({message:"no matching results"})
    }
  })

  
});

router.post('/getTicketDetails',(req,res)=>{
  console.log(req.body.id);
  publicHelper.fetchTicketDetails(req.body.id).then((response)=>{
    res.status(200).json({details:response})
  }).catch((error)=>{
    res.status(400).json({message:"ticket not found"})
  })
  
})

module.exports = router;
