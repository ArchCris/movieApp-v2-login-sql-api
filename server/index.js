const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const PORT = 3001
const bcrypt = require('bcrypt')
require("dotenv").config()

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

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

//Check
app.listen(process.env.PORT || PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
//Requests
//Encrypt settings
const saltRounds = 10;
//signup request
app.post('/signup',(req,res)=>{
    console.log('signing')
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

//Get popular movies
app.get('/movies', async (req,res)=>{
    
    try{
        let query = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
        const data = await fetch(query)
        const response = await data.json()
        res.send(response)
      }catch(err){
        console.log(err)
      }
})

//Get specific movie
app.post('/movie/id', async (req,res)=>{
    let id = req.body.id.id
    try{
        let query = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        const data = await fetch(query)
        const response = await data.json()
        res.send(response)
      }catch(err){
        console.log(err)
      }
})

//Live search

app.post('/movieSearch', async (req,res)=>{
    let string = req.body.string
    try{
        let query = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${string}`
        const data = await fetch(query)
        const response = await data.json()
        res.send(response)
      }catch(err){
        console.log(err)
      }
})




