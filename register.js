const express = require("express")
const bcrypt = require("bcrypt")
const connection = require("./config")
const router = express.Router()

router.post("/client/register", (req,res) => {
    
    // first we need to hash the password
    let password = hashPassword(req.body.password)

    // insert user data to db
    const sql = "INSERT INTO clients (Nom,Prenom,Email,password,region,adresse) VALUES ?"
    const values = [[req.body.nom,req.body.prenom,req.body.email,password,req.body.region,req.body.adresse]]
    connection.query(sql,[values],(err, result) => {
        if(err) {
            return res.json(502, {
                "message": "error on inserting"
            })
        }

        res.json(201, {
            "message": "user created"
        })
    })
    
})

function hashPassword(password) {
    let passwordHashed = bcrypt.hashSync(password,10)
    return passwordHashed
}

module.exports = router;


