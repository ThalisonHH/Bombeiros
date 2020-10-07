const { randomCode } = require("./gmail")
const {gen_token} = require('./token')
const User=require('../models/user')
const { Op } = require("sequelize");
const {io} = require('../connection')
const path = require('path');

module.exports = app=>{
    app.get('/verify',async(req,res)=>{
        console.log('/verify --get',req.query)
        const {email,code,id}=req.query;
        if(!!email && code&& id){
            User.findOne({where:{email:{[Op.eq]: email}}}).then(e=>{
                if(!!e){
                    if(parseInt(code,10)==e.getDataValue('code')&&e.getDataValue('exp')>=Date.now()/1000){
                        const token=gen_token({email:email,exp:Date.now()/1000+60*5})
                        io.to(id).emit('token', {token:token});
                        res.sendFile(path.join(path.resolve(__dirname , '../page.html')));
                    }else{
                        res.sendFile(path.join(path.resolve(__dirname , '../page_exp.html')));
                    }
                }else{                    
                    res.status(404).send()
                }
            })
        }else{
            res.status(400).send()
        }
    })
    app.get('/run',async(req,res)=>{
        res.json('{"running":true}')
    })
    app.get('/',async(req,res)=>{
        res.sendFile(path.join(path.resolve(__dirname , '../index.html')));
    })
}