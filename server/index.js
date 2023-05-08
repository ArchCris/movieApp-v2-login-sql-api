const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const PORT = 3001
const bcrypt = require('bcrypt')

//Session settings
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

//App creation
const app = express()
//App config, with session settings
app.use(express.json())
app.use(cors({
    origin:['http://localhost:3000'],
    methods: ['GET','POST'],
    credentials: true,
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
    key:'userId',
    secret:'subscribe',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge: 24 * 60 * 60 * 1000,
    }
}))

//DDBB conecction
const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'password',
    database:'movieAppDDBB'
})
//Check
app.listen(PORT,()=>{
    console.log(`Server runnin on port ${PORT}`)
})
//Requests
//Encrypt settings
const saltRounds = 10;
//signup request
app.post('/signup',(req,res)=>{
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        db.query(
            'INSERT INTO users (name,password) VALUES (?,?)',
            [req.body.name,hash],
            (err,result)=>{
                if(err){
                    res.send(err)
                }else{
                    res.send(result)
                }
            }
        )
    });
    
})
//login request
app.post('/login',(req,res)=>{
    db.query(
        'SELECT * FROM users WHERE name = ?',
        [req.body.name],
        (err,result)=>{
            if(err){
                res.send(err)
            }
            if(result.length > 0){
                bcrypt.compare(req.body.password,result[0].password,(err,response)=>{
                    if(response){
                        req.session.user = result
                        res.send(result)
                    }else{
                        res.send({message:"Wrong username/password combination"})
                    }
                })
            }else{
                res.send({message:'User doesn`t exist'})
            }
        }
    ) 
})

//Session check
app.get('/login',(req,res)=>{
    if(req.session.user){
        res.send({loggedIn:true,user:req.session.user})
    }else{
        res.send({loggedIn:false})
    }
})

//Close session 
app.get('/endSession',(req,res)=>{
    if(req.session){
        req.session.destroy(function(err){
            if(err){
                console.log(err)
            }else{
                res.send({message:"Session closed"})
            }
        })
    }
})


