// Mise en place d'express et du routeur
let express = require('express');
let router = express.Router();
let connection = require('../Config/Db')
let bcryptjs = require('bcryptjs')


    router.get('/societe',(req,res)=>{
        connection.query('SELECT * from societett',[],(err,row)=>{
            if (err) throw err
            res.send({societe : row})
        })
    })
    router.post('/societe',(req,res)=>{
        let nom = req.body.nom
        let Adresse = req.body.Adresse
        let region = req.body.region
        let societe_id = req.body.societe_id
        connection.query('INSERT INTO agences (nom,Adresse,region,societe_id) VALUES (?,?,?,?)',[nom,Adresse,region,societe_id],(err,row)=>{
            if(err) throw err
            res.send({Inserted : nom})
        })  
    })




    // CRUD societe
    router.get('/service',(req,res)=>{
        connection.query('SELECT * from societett',[],(err,row)=>{
            if (err) throw err
            res.send({service : row})
        })
    })
    router.get('/service/:id',(req,res)=>{
        let id = req.params.id
        connection.query('SELECT * FROM societett where id = ? ',[id],(err,row)=>{
            if (err) throw err
            res.send({service : row})
        })
    })
    router.post('/service',(req,res)=>{
        let nom = req.body.nom
        let Adresse = req.body.Adresse
        let region = req.body.region
        let admin_id = req.body.admin_id
        connection.query('INSERT INTO societett (nom,Adresse,region,admin_id) VALUES (?,?,?,?)',[nom,Adresse,region,admin_id],(err,row)=>{
            if(err) throw err
            res.send({service : 'INSERTED'})
        })  
    })
    router.put('/service/:id',(req,res)=>{
        let id = req.params.id
        let nom = req.body.nom
        let Adresse = req.body.Adresse
        let region = req.body.region
        let admin_id = req.body.admin_id
        connection.query('UPDATE societett set nom = ? , Adresse = ? , region = ?, admin_id = ? WHERE id = ?',[nom,Adresse,region,admin_id,id],(err,row)=>{
            if(err) throw err
            res.send({service : 'UPDATED'})
        })  
    })
    router.delete('/service/:id',(req,res)=>{
        let id = req.params.id
        connection.query('DELETE FROM societett where id = ? ',[id],(err,row)=>{
            if(err) {
                res.send({'service' : err})
            }else{
                res.send({'service':'DELETED'})
            }
        })
    })




    //CRUD agence 
    router.get('/agence/:id',(req,res)=>{
        let id = req.params.id
        connection.query('SELECT * FROM agences where societe_id = ? ',[id],(err,row)=>{
            res.send({agence : row})
        })
    })
    router.get('/agences/:id',(req,res)=>{
        let id = req.params.id
        connection.query('SELECT * FROM agences where id = ? ',[id],(err,row)=>{
            res.send({agence : row})
        })
    })

    router.get('/agence',(req,res)=>{
        connection.query('SELECT * FROM agences ORDER BY region',[],(err,row)=>{
            res.send({agence : row})
        })
    })
    router.post('/agence/nom',(req,res)=>{
        let nom  = req.body.nom 
        connection.query('SELECT * FROM agences where nom = ? ',[nom],(err,row)=>{
            res.send({agence : row})
        })
    })
    router.post('/agence',(req,res)=>{
        let  nom = req.body.nom
        let  Adresse = req.body.Adresse
        let  region = req.body.region
        let  societe_id = req.body.societe_id
        connection.query('INSERT INTO agences (nom, Adresse,region,societe_id) VALUES (?,?,?,?)',[nom,Adresse,region,societe_id],(err,row)=>{
            if (err) throw err
            res.send({'agence':'INSERTED'})
        })
    })
    router.put('/agence/:id',(req,res)=>{

        let id = req.params.id
        let nom = req.body.nom
        let Adresse = req.body.Adresse
        let region = req.body.region
        let societe_id = req.body.societe_id
        connection.query('UPDATE agences set nom = ? , Adresse = ? , region = ? , societe_id = ? where id = ? ',[nom,Adresse,region,societe_id,id],(err,row)=>{
            if (err) throw err
            res.send({'agence':'UPDATED'})
        })
    })
    router.delete('/agence/:id',(req,res)=>{
        let id = req.params.id
        connection.query('DELETE FROM agences where id = ? ',[id],(err,row)=>{
            if(err) {
                res.send({'agence' : err})
            }else{
                res.send({'agence':'DELETED'})
            }

        })
    })

    //CRUD guichet
    router.post('/guichet',(req,res)=>{
        let username = req.body.username
        let fullname = req.body.fullname
        let agence_id = req.body.agence_id
        let password = req.body.password
        let num = req.body.num

        bcryptjs.genSalt(10, function(err1 ,salt){
            if (err1) throw err1
            bcryptjs.hash(password,salt, (err2, hash) =>{
                if (err2) throw err
                connection.query('INSERT INTO guichet (fullname , username , password , agence_id , num ) VALUES (?,?,?,?,?)',[fullname,username,hash,agence_id,num] , (err, rows) =>{
                    if (err) {throw err}
                    if(rows){
                        res.send({guichet : "INSERTED" })
                    }
                })
            })
        })
    })
    router.get('/Agents',(req,res)=>{
        connection.query('SELECT * FROM agences JOIN guichet on guichet.agence_id = agences.id ORDER BY agences.region ',[],(err,row)=>{
            if (err) throw err
            res.send({agents : row})
        })
    })
    router.get('/guichet',(req,res)=>{
        connection.query('SELECT * FROM guichet',[],(err, row) =>{
            if (err) throw err
            res.status(200).send({guichet : row })
        })
    })
    router.get('/guichet/:id',(req,res)=>{
        let agence_id = req.params.id
        connection.query('SELECT * FROM guichet where agence_id = ? ',[agence_id],(err, row) =>{
            if (err) throw err
            res.status(200).send({guichet : row })
        })
    })
    router.get('/guichetid/:id',(req,res)=>{
        let agence_id = req.params.id
        connection.query('SELECT * FROM guichet where id = ? ',[agence_id],(err, row) =>{
            if (err) throw err
            res.status(200).send({guichet : row })
        })
    })
    router.get('/guichet/nom',(req,res)=>{
        let username = req.body.username
        connection.query('SELECT * FROM guichet where username = ? ',[username],(err, row) =>{
            if (err) throw err
            res.status(200).send({guichet : row })
        })
    })
    router.delete('/guichet/:id',(req,res)=>{
        let id = req.params.id
        connection.query('DELETE FROM guichet WHERE id = ?  ',[id],(err, row) =>{
            if(err) {
                res.send({'guichet' : err})
            }else{
                res.send({'guichet':'DELETED'})
            }
        })
    })
    router.put('/guichet/:id',(req,res)=>{
        let id = req.params.id
        let username = req.body.username
        let fullname = req.body.fullname
        let agence_id = req.body.agence_id
        let password = req.body.password
        let num = req.body.num

        bcryptjs.genSalt(10, function(err1 ,salt){
            if (err1) throw err1
            bcryptjs.hash(password,salt, (err2, hash) =>{
                if (err2) throw err
                connection.query('Update guichet set fullname = ?  , username = ?  , password = ?  , agence_id = ? , num = ? WHERE id = ?',[fullname,username,hash,agence_id,num,id] , (err, rows) =>{
                    if (err) {throw err}
                    if(rows){
                        res.send({guichet : "UPDATED" })
                    }
                })
            })
        })
    })

    router.get('/LandingChart',(req,res)=>{
        connection.query('SELECT COUNT(*) as nbr, reslocal.agence_id , agences.nom FROM reslocal JOIN agences ON reslocal.agence_id = agences.id GROUP BY reslocal.agence_id ' , [] ,(err,row)=>{
            if (err) throw err
            res.send({stat : row})
        })
    })
    router.get('/ResEtat',(req,res)=>{
        connection.query('SELECT COUNT(*) AS nbr , etat FROM reslocal GROUP BY etat',[],(err,row)=>{
            if (err) throw err
            res.send({stat : row})
        })
    })
    router.get('/ResEff',(req,res)=>{
        connection.query('SELECT COUNT(*) AS nbr , reslocal.guichet_id , guichet.username FROM reslocal JOIN guichet ON reslocal.guichet_id = guichet.id WHERE reslocal.etat = 1 GROUP BY reslocal.guichet_id',[],(err,row)=>{
            if (err) throw err
            res.send({stat : row})
        })
    })
    router.get('/ResPri',(req,res)=>{
        connection.query('SELECT COUNT(*) AS nbr , priorite FROM reslocal GROUP BY priorite', [], (err,row)=>{
            if (err) throw err
            res.send({stat : row})
        })
    })
    router.get('/Repartion',(req,res)=>{
        connection.query('SELECT COUNT(*) AS nbr , agences.region FROM agences GROUP BY agences.region', [], (err,row)=>{
            if (err) throw err
            res.send({stat : row})
        })
    })
    router.get('/MobRep',(req,res)=>{
        connection.query('SELECT COUNT(*) AS nbr, reslocal.agence_id, agences.nom FROM reslocal JOIN agences ON agences.id = reslocal.agence_id WHERE reslocal.priorite = 1 GROUP BY reslocal.agence_id',[],(err,row)=>{
            if (err) throw err
            res.send({stat : row})
        })
    })
    router.get('/fullTab',(req,res)=>{
        connection.query('SELECT reslocal.datereservation,agences.nom AS aname,clients.Nom AS cname,clients.Prenom,guichet.username,agences.region AS rg, societett.nom AS sname,societett.region FROM reslocal JOIN agences ON agences.id = reslocal.agence_id JOIN clients ON clients.id = reslocal.client_id JOIN guichet ON guichet.id = reslocal.guichet_id JOIN societett ON agences.societe_id = societett.id WHERE reslocal.etat = 1',[],(err,row)=>{
            if (err) throw err 
            res.send({Tab : row})
        })
    })
    router.get('/suivie',(req,res)=>{
        connection.query('SELECT reslocal.datereservation,agences.nom AS aname,guichet.username,agences.region AS rg, societett.nom AS sname,societett.region FROM reslocal JOIN agences ON agences.id = reslocal.agence_id  JOIN guichet ON guichet.id = reslocal.guichet_id JOIN societett ON agences.societe_id = societett.id WHERE reslocal.etat = 1 AND priorite = 0',[],(err,row)=>{
            if (err) throw err 
            res.send({Tab : row})
        })
    })
    router.post('/fullFilterTab',(req,res)=>{
        let dateDebut = req.body.dateDebut
        let dateFin = req.body.dateFin
        connection.query('SELECT reslocal.datereservation,agences.nom AS aname,clients.Nom AS cname,clients.Prenom,guichet.username,agences.region AS rg, societett.nom AS sname,societett.region FROM reslocal JOIN agences ON agences.id = reslocal.agence_id JOIN clients ON clients.id = reslocal.client_id JOIN guichet ON guichet.id = reslocal.guichet_id JOIN societett ON agences.societe_id = societett.id WHERE reslocal.etat = 1 AND reslocal.datereservation >= ? AND reslocal.datereservation <= ?',[dateDebut,dateFin],(err,row)=>{
            if (err) throw err 
            res.send({Tab : row})
        })
    })

    router.get('/feeds',(req,res)=>{
        connection.query('SELECT feedbacks.nbStartRating , feedbacks.description ,feedbacks.dateFeedback ,agences.region AS rg, agences.nom AS aname, societett.nom AS sname , societett.region , clients.Nom AS cname,clients.Prenom FROM feedbacks JOIN agences ON feedbacks.agence_id = agences.id JOIN societett ON feedbacks.societe_id = societett.id JOIN clients ON feedbacks.client_id = clients.id',[],(err,row)=>{
            if (err) throw err
            res.send({Feed : row})
        })
    })


    router.get('/reslocal',(req,res)=>{
        connection.query('SELECT * from reslocal',[],(err,row)=>{
            res.send({Tab : row})
        })
    })
module.exports = router