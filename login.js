const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const connection = require("./config")
const router = express.Router()
const secret = require("./secret")


router.post("/client/login", (req,res) => {
    const email = req.body.email
    const password = req.body.password

    // select nom fro exemple to make sure that user is exist
    const sqlSelectEmail = "SELECT * FROM clients WHERE email=?"
    const values = [
        [email]
    ]

    connection.query(sqlSelectEmail, [values], (err,result) => {
        if(err) {
            return res.json(502, {
                "message": "error on selecting"
            })
        }

        if(result.length == 0) {
            return res.json(401, {
                "message": "Wrong credentials"
            })
        }else {
            // check  the password if correct or not
            if(bcrypt.compareSync(password, result[0].password)) {
                // generate a token
                // payload contain user id
                const token = generateToken(result[0].id+"")
                return res.json(200, {
                    "message": "success...",
                    "token": token
                })

            }else {
                return res.json(401,{
                    "message": "Wrong credentials"
                })
            }
        }
        
    })
})


function generateToken(userId) {
    let token = jwt.sign({payload : userId},secret, { expiresIn: 60 * 60 })
    return token
}
module.exports = router;
