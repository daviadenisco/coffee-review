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
  // this returns an array of objects representing all the rows in that table (and all the columns in those rows)
  // SQL equivalent of (syntax might be wrong) SELECT * FROM coffees
  knex('coffees')
  .then( rows => response.json(rows));
});

app.get('/coffees/:id', (request, response) => {
  // access the request object, tack on params, then id
  const coffeeId = request.params.id;
  knex('coffees')
  .where('id', coffeeId) // SELECT * FROM coffees WHERE id=coffeeId;
  .then(rows => {
    // only one thing in the rows array, and we want the first thing in the array, which is the id, so rows[0] is what we want
    const foundCoffee = rows[0];
    // send the response as json
    response.json(foundCoffee);
  })
});

// http --form POST localhost:8000/coffees origin=Mexico roast=medium price=13.99 flavor=nutty
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

// echo '{"price": "15.99"}' | http PATCH localhost:8000/coffees/1
app.patch('/coffees/:id', (request, response) => {
  const coffeeId = request.params.id;
  const {origin, flavor, roast, price} = request.body;

  knex('coffees')
  .where('id', coffeeId)
  .returning('*')
  .update({origin, flavor, roast, price})
  .then (rows => {
    const coffee = rows[0];
    response.json(coffee);
  });
});

app.put('/coffees/:id', (request, response) => {

});

app.delete('/coffees/:id', (request, response) => {
  const coffeeId = request.params.id;
  knex('coffees')
  .where('id', coffeeId)
  .del()
  .then(response.send('Deleted'));
});

// Listening
// takes two arguments, the PORT variable and an anonymous function

app.listen( PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
})
