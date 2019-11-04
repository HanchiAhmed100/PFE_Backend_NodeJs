const express = require("express")
const connection = require("./config")
const moment = require("moment")
const router = express.Router()


router.get("/getReservation/:id",(req,res)=>{
    connection.query("select * from agences join reservations on reservations.agence_id = agences.id where reservations.client_id = ? order by reservations.id desc",[req.params.id],(err,row)=>{
        res.json(200 , {"reservation" : row })
    })
})
router.get("/getOneReservation/:id",(req,res)=>{
    connection.query("select * from agences join reservations on reservations.agence_id = agences.id where reservations.id = ?",[req.params.id],(err,row)=>{
        res.json(200 , {"reservation" : row })
    })
})

router.post('/res',(req,res)=>{

    const client_id = req.body.client_id
    const agence_id = req.body.agence_id
    const dateof = moment(new Date()).format('YYYY-MM-DD')
    let x = new Date()
    let verif = moment(x).format('HHmmss');

    connection.query('SELECT count(*) AS nbReservations FROM reservations where agence_id = ? ',[agence_id],(err1,rows1)=>{
        if (err1) {throw err1}
        else{
            if( rows1[0].nbReservations == 0 ){
                // Query insert if table empty 
                console.log('table vide')
                let code2 = 1

                connection.query('INSERT INTO reservations (codeReservation,dateReservation,client_id,agence_id,verif) VALUES (?,?,?,?,?)',[code2,dateof,client_id,agence_id,verif],(err2,rows2)=>{
                    if (err2) throw err2
                    res.send({res : {num : code2 , code : verif}})
                })
            }
            else{
                connection.query('SELECT * FROM reservations where agence_id = ?  ORDER BY id DESC',[agence_id],(err3,rows3)=>{
                    if (err3) {throw err3}
                    else{

                    	if(  moment(rows3[0].dateReservation).isSame(dateof) ){
    		                console.log('same day')
                            let code5 =  parseInt(rows3[0].codeReservation)+1

                            connection.query('INSERT INTO reservations (codeReservation,dateReservation,client_id,agence_id,verif) VALUES (?,?,?,?,?)',[code5,dateof,client_id,agence_id,verif],(err5,rows5)=>{
                                if (err5) {throw err5}
                                else{
                                    res.send({res : {num : code5 , code : verif}})
                                }
                            })

                    	}else{
                        	console.log('table not empty but not today')
	                    	let code4 = 1
	                        connection.query('INSERT INTO reservations (codeReservation,dateReservation,client_id,agence_id,verif) VALUES (?,?,?,?,?)',[code4,dateof,client_id,agence_id,verif],(err8,rows8)=>{
	                            if (err8) {throw err8}
	                            else{
	                                res.send({res : {num : code4 , code : verif}})
	                            }
	                        })
                    	}
                    }
                })   
            }
        }
    })
})

router.post('/verif',(req,res)=>{
    const verif = req.body.verif
    const dateof = moment(new Date()).format('YYYY-MM-DD')
    connection.query('SELECT count(*) as nb from reservations where verif = ? AND dateReservation = ? AND etat = 0',[verif,dateof],(err,row)=>{
        if (err) throw err
        else{
        	if (row[0].nb == 0){
        		res.send({code : "code incorrecte"})
        	}else{
        		connection.query('SELECT * from reservations where verif = ? AND dateReservation = ? AND etat = 0',[verif,dateof],(err1,row1)=>{
        			if (err) throw err
        			else{
		            	console.log('2')
		                let priorite = 1
		                let agence_id = row1[0].agence_id
		                let client_id = row1[0].client_id
		                let code = row1[0].codeReservation    
		                connection.query('update reservations set etat = 1 where verif = ? AND dateReservation = ?',[verif,dateof],(e,r)=>{
		                	if (err) {throw err}
	                		else{
				                connection.query('INSERT into reslocal (code,priorite,agence_id,client_id,datereservation) values (?,?,?,?,?)',[code , priorite , agence_id , client_id , dateof ],(err2,row2)=>{
				                    res.send({code : code })
				                })
	                		}
		                })
        			}
        		})		
        	}
        }
    })
})

module.exports = router
