let express = require('express');
let connection = require('../Config/Db')
let router = express.Router();


router.get('/Reservationagences',(req,res)=>{
    connection.query('Select agences.nom,count(*) as count from reservations join agences on agences.id = reservations.agence_id GROUP BY agence_id ',[],(err,rows)=>{
        if (err) throw err
        res.send({R:rows})
      })
})
router.get('/Regionclient',(req,res)=>{
    connection.query('Select region,count(*) as c from clients GROUP BY region',[],(err,rows)=>{
        if (err) throw err
        res.send({R:rows})
      })
})
router.get('/NbrStar',(req,res)=>{
    connection.query('Select societett.nom,AVG(feedbacks.nbStartRating) as avg ,count(*) as count from feedbacks join societett on feedbacks.societe_id = societett.id GROUP BY societett.id',[],(err,rows)=>{
        if (err) throw err
        res.send({R:rows})
      })
})
module.exports = router