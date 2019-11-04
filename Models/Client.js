let connection = require('../Config/Db')
var bcrypt = require('bcrypt')

class Client {

    constructor(row) {
		this.row = row
    }

    static GetAllClient(callback){
        connection.query('SELECT * from clients',[callback] , (err, rows) =>{
            if (err) throw err
            callback(rows)
        })
    }

    static GetClientByName(name,callback){
        connection.query('SELECT * from clients where Nom = ? ',[name,callback] , (err, rows) =>{
            if (err) throw err
            callback(rows)
        })
    }

    static GetClientsByRegion(region,callback){
        connection.query('SELECT * from clients where region = ? ',[region,callback] , (err, rows) =>{
            if (err) throw err
            callback(rows)
        })
    }

    static DeleteClient(id,callback){
        connection.query('DELETE from clients where id = ? ',[id,callback] , (err, rows) =>{
            if (err) throw err
            callback(rows)
        })
    }

    /*    
    static RegisterClient(nom,prenom,email,password,region,adresse,callback){
        
		bcyrpt.genSalt(10, function(err ,salt){
			bcyrpt.hash(password,salt, (err, hash) =>{
				if (err) throw err
				const NewPass = hash
				connection.query('INSERT INTO client set nom = ?, prenom = ?, email = ? , password = ? ,region = ? , adresse = ?',[nom,prenom,email,NewPass,region,adresse,callback] , (err, rows) =>{
					if (err) throw err
					callback(rows)
				})
			})
		});
    }

    static LoginClient(req, email, password, done){

            connection.query("SELECT * FROM users WHERE email = ?",[email], function(err, rows){
 				console.log('request done')
                if (!err){
         				console.log('No sql erreur ')
         			if (rows.length) {
         				console.log('Select return data ')
	                    bcrypt.compare(password, rows[0].password,function(err,res){
	                    	console.log("after compare pass")
	                    	console.log(password)
	                    	console.log(rows[0])
	                    	if(res == true){
                    			console.log('you are logged')
                                
                				return done(null, rows[0]);
	                    	}else{
	                    		return done(null,false)
	                    	}
	                    })

               	 		}else{
               	 			return done(null,false)
               	 		}
               		}else{	
               			return done(null,false);
            	}
            })

    }
*/

} 
module.exports = Client