let express = require('express');
let connection = require('../Config/Db')
const moment = require("moment")
let router = express.Router();


router.get('/:id',(req,res)=>{
    let agence_id = req.params.id
    connection.query('Select codeReservation from reservations where agence_id = ?',[agence_id],(err,rows)=>{
        res.send({res : rows})
    })
})

router.post('/add',(req,res)=>{
    
    let dateof = moment(new Date()).format('YYYY-MM-DD')
    let priorite = 0
    let client_id = req.body.client_id
    let agence_id = req.body.agence_id
    let code =  req.body.code
    connection.query('INSERT INTO reslocal (code , priorite,agence_id,client_id,datereservation) values (?,?,?,?,?)',[code,priorite,agence_id,client_id,datereservation],(err,row)=>{
        if (err) throw err
        res.send(200,{"Added ... " : row})
    })
})


router.post('/next',(req,res)=>{
    let guichet_id = req.body.guichet_id
    let id = req.body.id
    let etat = req.body.etat
    connection.query('UPDATE reslocal set etat = ? , guichet_id = ? where id = ?',[etat,guichet_id,id],(err,row)=>{
        if (err) throw err
        res.send(200,{'update' : row })
    })
})

router.post('/new',(req,res)=>{

    let agence_id = req.body.agence_id
    //let num = req.body.num
    let dateof = moment(new Date()).format('YYYY-MM-DD')


    connection.query('Select count(*) AS nbReservations from reslocal where agence_id = ?',[agence_id],(err1,rows1)=>{
        if(err1) { throw err1 }
        else{
            if( rows1[0].nbReservations == 0 ){
                //response if table vide
                res.send({passage : 'il ya personne'})   
            }else{
                connection.query('Select count(*) AS nbReservations from reslocal where agence_id = ? AND priorite = 1 AND etat = 0 AND datereservation = ?',[agence_id,dateof],(err2,rows2)=>{
                    if(err2) { throw err2 }
                    else{
                        if( rows2[0].nbReservations == 0){
                            connection.query('SELECT count(*) AS nbReservations from reslocal where agence_id = ? AND priorite = 0 AND etat = 0 AND datereservation = ? ORDER BY id DESC',[agence_id,dateof],(err4,rows4)=>{
                                if (err4) {throw err4}
                                else{
                                    if(rows4[0].nbReservations == 0){
                                       res.send({passage : 'personne'})
                                    }else{
                                        connection.query('SELECT *  from reslocal where agence_id = ? AND priorite = 0 AND etat = 0 AND datereservation = ? ORDER BY id ASC',[agence_id,dateof],(err5,rows5)=>{
                                            if (err5) {throw err5} 
                                            else{
                                                res.send({passage :{ locale: rows5}}) 
                                            }
                                        })
                                    }
                                }
                            })
                        }else{
                            connection.query('Select * from reslocal where agence_id = ? AND priorite = 1 AND etat = 0 AND datereservation = ? ORDER BY id ASC',[agence_id,dateof],(err3,rows3)=>{
                                if(err3) { throw err3 }
                                else{
                                    connection.query('SELECT count(*) AS nbReservations from reslocal where agence_id = ? AND priorite = 0 AND etat = 0 AND datereservation = ? ORDER BY id DESC',[agence_id,dateof],(err6,rows6)=>{
                                        if (err6) {throw err6}
                                        else{
                                            if(rows6[0].nbReservations == 0){
                                               res.send({passage : { locale : 'personne' , mobile : rows3 }})
                                            }else{
                                                connection.query('SELECT *  from reslocal where agence_id = ? AND priorite = 0 AND etat = 0 AND datereservation = ? ORDER BY id ASC',[agence_id,dateof],(err7,rows7)=>{
                                                    if (err7) {throw err7} 
                                                    else{
                                                        res.send({passage :{ local : rows7 , mobile : rows3}}) 
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }
        }
    })
})




router.post('/local',(req,res)=>{

    let agence_id = req.body.agence_id;
    let dateof = moment(new Date()).format('YYYY-MM-DD')

    // Query check table empty
    connection.query('SELECT count(*) AS nbReservations FROM reslocal where agence_id = ? ',[agence_id],(err1,rows1)=>{
        if (err1) {throw err2}
        else{
            if( rows1[0].nbReservations == 0 ){
                // Query insert if table empty 
                let code2 = 1
                console.log('row2')
                connection.query('INSERT INTO reslocal (code,agence_id,datereservation) VALUES (?,?,?)',[code2,agence_id,dateof],(err2,rows2)=>{
                    if (err2) throw err2
                    res.send({res : code2})
                })
            }else{
                // Query if table not empty
                connection.query('SELECT * FROM reslocal where agence_id = ?  ORDER BY id DESC',[agence_id],(err3,rows3)=>{
                    if (err3) {throw err3}
                    else{
                        // Check for today 
                        if(  moment(rows3[0].datereservation).isSame(dateof) ){
                            let code4 = rows3[0].code + 1
                            connection.query('INSERT INTO reslocal (code,agence_id,datereservation) VALUES (?,?,?)',[code4,agence_id,dateof],(err4,rows4)=>{
                                if (err4) {throw err4}
                                else{
                                    res.send({res : code4})
                                }
                            })
                        }else{
                            let code5 =  1
                            connection.query('INSERT INTO reslocal (code,agence_id,datereservation) VALUES (?,?,?)',[code5,agence_id,dateof],(err5,rows5)=>{
                                if (err5) {throw err5}
                                else{
                                    res.send({res : code5})
                                }
                            })
                        }
                    }
                })
                
            }
        }
    })


})

module.exports = router