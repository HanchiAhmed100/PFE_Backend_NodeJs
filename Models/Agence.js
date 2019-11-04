let connection = require('../Config/Db')
class Agence {

  constructor(row) {
  this.row = row
  }

  static getAgence(id,callback){
    connection.query('SELECT agences.nom ,agences.id FROM agences join societett on agences.societe_id = societett.id WHERE societett.id = ?',[id,callback],(err,rows)=>{
      if (err) throw err
      callback(rows)
    })
  }
  static getAgences(callback){
    connection.query('SELECT * FROM agences',[callback],(err,rows)=>{
      if (err) throw err
      callback(rows)
    })
  }

  static getsociete(callback){
    connection.query('Select * from societett',[callback],(err,row)=>{
      if (err) throw err 
      callback(row)
    })
  }
} 
module.exports = Agence
