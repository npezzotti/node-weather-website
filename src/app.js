const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Nathan Pezzotti"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is some helpful text.",
        title: "Help", 
        name: "Nathan Pezzotti"
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    };
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    };
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: "404",
        name: "Nathan Pezzotti",
        message: "Page not found."
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Nathan Pezzotti"
    });
});

app.get('*', (req, res) => {
    res.render('not-found', {
        title: "404",
        name: "Nathan Pezzotti",
        message: "Page not found."
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000")
});