// Mise en place d'express et du routeur
let express = require('express');
let router = express.Router();
let connection = require('../Config/Db')

//Mise en plase des models 

let bcryptjs = require('bcryptjs')
// Methods



//Client Mobile 
router.post("/cliRegister",(req,res)=>{
       
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let email = req.body.email;
    let password = req.body.password
    let region = req.body.region


    bcryptjs.genSalt(10, function(err ,salt){
        bcryptjs.hash(password,salt, (err, hash) =>{
            if (err) throw err
            const NewPass = hash
            connection.query('INSERT INTO clients set Nom = ?, Prenom = ?, Email = ? , password = ? , region = ?',[nom,prenom,email,NewPass,region] , (err, rows) =>{
                if (err) {throw err}
                if(rows){
                    res.status(200).send({register : rows[0] })
                }
            })
        })
    });
})
router.post("/cliLogin",(req,response)=>{
    
    let email = req.body.email;
    let password = req.body.password

    connection.query("SELECT * FROM clients WHERE Email = ?",[email], function(err, rows){

       if (!err){
                console.log('No sql erreur ')
            if (rows.length) {
                console.log('Select return data ')
                bcryptjs.compare(password, rows[0].password,function(err,res){
                   console.log("after compare pass")
                   console.log(password)
                   console.log(rows[0])
                   if(res == true){
                       console.log('you are logged')

                       response.status(200).send({'Client' : rows[0]})
                   }else{
                    response.status(200).send({'failed' : 'Mot de passe inccorecte'})
                   }
               })

                   }else{
                    response.status(200).send({'failed' : 'Adresse mail inccorecte'})
                   }
              }else{	
                response.status(200).send({failed : 'Erreur'})
       }
   })
})

///////////////////////////////////
// Guichet
router.post("/guichetRegister",(req,res)=>{
       
    let username = req.body.username;
    let password = req.body.password
    let agence_id = req.body.agence_id

    bcryptjs.genSalt(10, function(err ,salt){
        bcryptjs.hash(password,salt, (err, hash) =>{
            if (err) throw err
            const NewPass = hash
            connection.query('INSERT INTO guichet set username = ?, password = ?, agence_id = ?  ',[username,NewPass,agence_id] , (err, rows) =>{
                if (err) {throw err}
                if(rows){
                    res.status(200).send({register : rows[0] })
                }
            })
        })
    });
})
router.post("/guichetLogin",(req,response)=>{
    
    let username = req.body.username;
    let password = req.body.password

    connection.query("SELECT * FROM guichet WHERE username = ?",[username], function(err, rows){

       if (!err){
                console.log('No sql erreur ')
            if (rows.length) {
                console.log('Select return data ')
                bcryptjs.compare(password, rows[0].password,function(err,res){
                   console.log("after compare pass")
                   console.log(password)
                   console.log(rows[0])
                   if(res == true){
                       console.log('you are logged')

                       response.status(200).send({'guichet' : rows[0]})
                   }else{
                    response.status(200).send({'failed' : 'Mot de passe inccorecte'})
                   }
               })

                   }else{
                    response.status(200).send({'failed' : 'Adresse mail inccorecte'})
                   }
              }else{	
                response.status(200).send({failed : 'Erreur'})
       }
   })
})







// Admin
router.post("/Login",(req,response)=>{
    
    let email = req.body.email;
    let password = req.body.password

    connection.query("SELECT * FROM admins WHERE email = ?",[email], function(err, rows){
        console.log('request done')
       if (!err){
                console.log('No sql erreur ')
            if (rows.length) {
                console.log('Select return data ')
                bcryptjs.compare(password, rows[0].password,function(err,res){
                   console.log("after compare pass")
                   console.log(password)
                   console.log(rows[0])
                   if(res == true){
                       console.log('you are logged')

                       response.send({Admin : rows[0]})
                   }else{
                    response.send({failed : 'Mot de passe inccorecte'})
                   }
               })

                   }else{
                    response.send({failed : 'Adreese mail inccorecte'})
                   }
              }else{	
                response.send({failed : 'Erreur'})
       }
   })
})

router.post("/Register",(req,res)=>{
       
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let email = req.body.email;
    let password = req.body.password

    bcryptjs.genSalt(10, function(err ,salt){
        bcryptjs.hash(password,salt, (err, hash) =>{
            if (err) throw err
            const NewPass = hash
            connection.query('INSERT INTO admins set nom = ?, prenom = ?, email = ? , password = ? ',[nom,prenom,email,NewPass] , (err, rows) =>{
                if (err) {throw err}
                if(rows){
                    res.send({Admin : rows[0] })
                }
            })
        })
    });
})
router.get("/AdminInfo",(req,res)=>{
	connection.query('SELECT id,nom,prenom,email From admins',(err,row)=>{
		if(err) throw err
		res.send({AdminInfo : row})
	})
})
router.delete("/AdminInfo/:id",(req,res)=>{
	console.log("sss"+req.params.id)
	connection.query('delete from admins WHERE id = ?',[req.params.id],(err,row)=>{
		if(err) throw err
		res.send({AdminInfo : "DELETED"})
	})
})

module.exports = router