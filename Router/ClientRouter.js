// Mise en place d'express et du routeur
let express = require('express');
let router = express.Router();
let connection = require('../Config/Db')

//Mise en plase des models 
let Agence = require('../Models/Agence')
let Client = require('../Models/Client')
let FeedBack = require('../Models/FeedBack')


// les Route

    // Les Methode sur les Clients  
    router.get('/All',(req,res)=>{
        Client.GetAllClient(function(client){
            res.send({client : client})
        })
    })
    router.get('/name/:name',(req,res)=>{
        Client.GetClientByName(req.params.name,function(client){
            res.send({client : client})
        })
    })
    router.get('/region/:region',(req,res)=>{
        Client.GetClientsByRegion(req.params.region,function(client){
            res.send({client : client})
        })
    })

    router.delete("/Delete/:id",(req,res)=>{
        Client.DeleteClient(req.params.id,function(client){
            res.send("Client Deleted")
        })
    })


    // Les Methode sur les Feedback
    router.get("/Feedback/All",(req,res)=>{
        FeedBack.getAllFeedback(function(FeedBack){
            res.send({Feedback : FeedBack})
        })
    })

    router.get("/Feedback/Best/all",(req,res)=>{
        FeedBack.GetMostRatedFeedBack(function(FeedBack){
            res.send({Feedback : FeedBack})
        })
    })
    router.get("/Feedback/Bad/all",(req,res)=>{
        FeedBack.GetBadRatedFeedBack(function(FeedBack){
            res.send({Feedback : FeedBack})
        })
    })

    router.get("/Feedback/name/:name",(req,res)=>{
        FeedBack.getOneClientFeedbacks(req.params.name,function(FeedBack){
            res.send({Feedback : FeedBack})
        })
    })
    router.get("/:id/FeedBack",(req,res)=>{
        FeedBack.getTheClientFeedback(req.params.id,function(FeedBack){
            res.send({Feedback : FeedBack})
        })
    })

    router.post("/Feedback",(req,res)=>{
        let description = req.body.description
        let nbStartRating = req.body.nbStartRating
        let client_id = req.body.client_id
        let societe_id = req.body.societe_id
        let agence_id = req.body.agence_id
        let dateFeedback = new Date()

        FeedBack.AddFeedBack(description,nbStartRating,dateFeedback,client_id,societe_id,agence_id,function(Feedback){
            res.json(200,{FeedBack})      
        })
    })



    router.get("/agences/:id",(req,res)=>{
        Agence.getAgence(req.params.id, function(Agences){
            res.send({Agences : Agences})
        })
    })

    router.get("/agences",(req,res)=>{
        Agence.getAgences(function(Agences){
            res.send({Agences : Agences})
        })
    })

    router.get('/societe',(req,res)=>{
        Agence.getsociete((societe) => res.send({societe : societe}))
    })


    
module.exports = router