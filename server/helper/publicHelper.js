const db=require('../config/connection')
const collection=require('../config/collections')
const async = require('hbs/lib/async')
const { ObjectId } = require('mongodb')
const { reject } = require('bcrypt/promises')

module.exports={
    fetchTickets:(date)=>{
        return new Promise(async(resolve,reject)=>{
            console.log(date);
            let tickets=await db.get().collection(collection.TICKET_COLLECTION).find().toArray()
            console.log(tickets);
            let result= await tickets.filter((ticket)=>new Date(ticket.fromDate)<=new Date(date)&& new Date(date)<=new Date(ticket.toDate)&& ticket.publish)
            console.log(result);
            resolve(result)
  
        })
    },
    fetchTicketDetails:(id)=>{
        return new Promise(async(resolve,reject)=>{
            console.log(id);
            let ticket=await db.get().collection(collection.TICKET_COLLECTION).findOne({_id:ObjectId(id)})  
            if(ticket){
                resolve(ticket)
            }else{ 
                reject()
            }
        })
    }
} 