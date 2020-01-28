// ----------------------   Core Modules   ----------------------
const path = require('path');

// ----------------------    NPM Modules   ----------------------
const express = require('express');
const hbs = require('hbs');

// ----------------------  Custom Modules  ----------------------
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// ----------------------     Constants    ----------------------
const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../public');
const VIEWS_PATH = path.join(__dirname, '../templates/views');
const PARTIALS_PATH = path.join(__dirname, '../templates/partials');

// ----------------------   App Logic   ----------------------
const app = express();

// Setup handlebars
app.set('view engine', 'hbs');
app.set('views', VIEWS_PATH);
hbs.registerPartials(PARTIALS_PATH);

// Setup static directory to serve
app.use(express.static(PUBLIC_PATH));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'SHStorm'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'SHStorm'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'SHStorm',
        helpMessage: 'This is some helpful message.'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({ error: 'You must provide an address' });
        return;
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({ error });
            return;
        }

        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                res.send({ error: err });
                return;
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        })
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        });

        return;
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        name: 'SHStorm',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'SHStorm',
        errorMessage: 'Page not found'
    });
});

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}.`);
});