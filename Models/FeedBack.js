let connection = require('../Config/Db')
class FeedBack {

    constructor(row) {
		this.row = row
    }
    

    // Les Action sur les FeedBack effectuer par un client 
    static getTheClientFeedback(id,callback){
      connection.query('SELECT * FROM feedbacks join agences on feedbacks.agence_id = agences.id where client_id = ?',[id,callback],(err,rows)=>{
        if (err) throw err
        callback(rows)
      })
    }

    static AddFeedBack(description,nbStartRating,dateFeedback,client_id,societe_id,agence_id,callback){
      connection.query('INSERT INTO feedbacks set description = ?, nbStartRating = ? , dateFeedback = ? ,client_id = ? , societe_id = ? , agence_id = ?  ',[description,nbStartRating,dateFeedback,client_id,societe_id,agence_id,callback] , (err, rows) =>{
        if (err) throw err
        callback(rows)
      })
    }



    // Les Action sur les FeedBack effectuer par un admin

    static getAllFeedback(callback){
      connection.query('SELECT * FROM feedbacks join clients on feedbacks.client_id = clients.id',[callback],(err,rows)=>{
        if (err) throw err
        callback(rows)
      })
    }
    
    static getOneClientFeedbacks(name,callback){
      connection.query('SELECT * FROM feedbacks join clients on feedbacks.client_id = clients.id where clients.nom = ? ',[name,callback],(err,rows)=>{
        if (err) throw err
        callback(rows)
      })
    }

    static GetMostRatedFeedBack(callback){
      connection.query('SELECT * FROM feedbacks join clients on feedbacks.client_id = clients.id order By feedbacks.nbStartRating desc',[callback],(err,rows)=>{
        if (err) throw err
        callback(rows)
      })
    }
    static GetBadRatedFeedBack(callback){
      connection.query('SELECT * FROM feedbacks join clients on feedbacks.client_id = clients.id order By feedbacks.nbStartRating ASC',[callback],(err,rows)=>{
        if (err) throw err
        callback(rows)
      })
    }
    
} 
module.exports = FeedBack