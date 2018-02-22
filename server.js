const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const knex = require('./db');
const PORT = process.env.PORT || 8000;

// Middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (request, response) => {
  response.send('The slash route is working, so you better start working.');
});

app.get('/coffees', (request, response) => {
  knex('coffees')
  .then( rows => response.json(rows));
});

app.get('/coffees/:id', (request, response) => {});

app.post('/coffees', (request, response) => {
  // origin, flavor, roast, price
  console.log(`request.body: ${request.body}`); // debug
  const { origin, flavor, roast, price } = request.body;
  const newCoffee = { origin, flavor, roast, price };

  knex('coffees')
  .insert(newCoffee)
  .returning('*')
  .then(rows => {
    const coffee = rows[0];
    response.json(coffee);
  });
});

app.put('/coffees/:id', (request, response) => {});

app.delete('/coffees/:id', (request, response) => {});

// Listening
app.listen( PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
})
