const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;

// Middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (request, response) => {
  response.send('The slash route is working, so you better start working.');
});

// Listening
app.listen( PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
})
