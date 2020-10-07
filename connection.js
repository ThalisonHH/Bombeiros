const api = require('express')()
const server = require('http').createServer(api)
const io =require('socket.io')(server)
const {randomCode} = require('./config/gmail')
const User=require('./models/user')
const { Op } = require("sequelize");
io.on("connection",socket=>{
    console.log('connected as: ',socket.id);
    socket.on('verify', email=>{
        User.findOne({where:{email:{[Op.eq]: email}}}).then(e=>{
            const code=Math.floor(Math.random(0,1)*999999)
            if(!!e){
                User.update({code:code,exp:Math.floor(Date.now()/1000+60*5)},{where:{email:{[Op.eq]:email}}}).then(()=>{randomCode({email:email,code:code,socketid:socket.id})}).catch(i=>console.log(i))

            }else{
                User.create({email:email,code:code,exp:Math.floor(Date.now()/1000+60*5)}).then(()=>{randomCode({email:email,code:code,socketid:socket.id})}).catch(i=>console.log(i))}
            }).catch(e=>console.log(e))
    })
})
module.exports= {api,server,io}