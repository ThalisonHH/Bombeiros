const jwt = require('jwt-simple')

const gen_token=(json)=>{
    json={...json,exp:Date.now()/1000+60*5}
    const token = jwt.encode(json,process.env.SECRET,'HS256')
    return token
}
const dec_token=(token)=>{
    try{valid=jwt.decode(token, secret, true);return {valid:true}}catch (e){
        return {valid:false}
    }
}
module.exports={gen_token,dec_token}