var geocode = require('./geocode')
var forcast = require('./forecast')
var path = require('path')
var express = require('express')
var hbs = require('hbs')

console.log(path.join(__dirname, '../public'))

// Define paths for Express config
var publicDirPath = path.join(__dirname, '../public')
var viewPath = path.join(__dirname, '../template/views')
var partialPath = path.join(__dirname,'../template/partials')

var app = express();

console.log(partialPath)

// Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)


// Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Dhaval Chudasama'
    })
})
app.get('/about',(req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Dhaval Chudasama'
    })
})
app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Dhaval Chuadasama',
        text: 'Please help me to getting out of this'
    })
})
app.get('/weather' , (req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide the address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude ,location} = {})=>{
         
        if(error){
            return res.send({ error })
        }
        forcast(latitude, longitude, (error, forcastData)=>{
            if(error){
                res.send({ error })
            }
            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
        })
    })            
})
app.get('/product', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide search team'
        })
    }
    res.send({
        product: []
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404',
        name : 'Dhaval chudasama',
        eroormessage: 'Help article is not found'
    })
})
app.get('*',(req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Dhaval Chudasama',
        eroormessage: 'My 404 Page'
    })
})
app.listen(3000, ()=> {
    console.log('Server is up on runing on port 3000')
})