var db = require('../config/connection')
const bcrypt = require('bcrypt')
var collection = require('../config/collections')
const { ObjectId } = require('mongodb')
const async = require('hbs/lib/async')
module.exports={
    doLogin:(data)=>{
        return new Promise(async(resolve,reject)=>{
            let admin = await db.get().collection(collection.ADMIN_COLLECTION).findOne({ email: data.email })
            if(admin){
                bcrypt.compare(data.password, admin.password).then((status) => {
                   resolve(true)
                })
            }else{
                resolve(false)
            }
        })
    },
    addTicket:(data)=>{
        return new Promise(async(resolve,reject)=>{
            console.log(data);
            let product =await db.get().collection(collection.TICKET_COLLECTION).findOne({productName:data.productName})
            console.log(product);
            if(product){
                resolve(false)
            }else{
                data.publish=false
                db.get().collection(collection.TICKET_COLLECTION).insertOne(data).then(()=>{
                    resolve(true)
                })
            }
        })
    },
    getTickets:()=>{
        return new Promise(async(resolve,reject)=>{ 
            let tickets=await db.get().collection(collection.TICKET_COLLECTION).find().toArray()
            resolve(tickets)  
        })
    },
    changePublish:(id)=>{
        return new Promise(async(resolve,reject)=>{
            let ticket=await db.get().collection(collection.TICKET_COLLECTION).findOne({_id:ObjectId(id)})
            db.get().collection(collection.TICKET_COLLECTION).updateOne({_id:ObjectId(id)},{$set:{publish:!ticket.publish}}).then(()=>{
                resolve()
            })
        })
    }
}