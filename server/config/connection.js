const MongoClient=require('mongodb').MongoClient
const state={
    db:null
}
module.exports.connect=function(done){
    const url='mongodb+srv://ioticstest:ioticstest@iotocs-test.vpaaa.mongodb.net/?retryWrites=true&w=majority'
    const dbname='iotics'

    MongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db=data.db(dbname)
        
        done()
    })
}
module.exports.get=function(){
    return state.db
}