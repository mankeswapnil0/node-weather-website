const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// setup to serve static files
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title:'Handle bars',
        name:'Swapnil'
    })
})
app.get('/about', (req,res) => {
    res.render('about', {
        title:'About',
        name:'Swapnil'
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        title:'Help',
        name:'Swapnil'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide a address term"
        })
    }

    geocode(req.query.address,(error,{longitude,latitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
    
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecastData
            })
        })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query);
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title:"404",
        name:"Swapnil",
        errorMessage:"Help article not found"

    })
})
app.get('*', (req,res) => {
    res.render('404',{
        title:"404",
        name:"Swapnil",
        errorMessage:"Page not found"
    })
})

app.listen(port, () => {
    console.log('Running on port ' + port);
})