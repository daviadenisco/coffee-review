// node_modules/.bin/knex seed:run
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('coffees').del()
    .then(function () {
      // Inserts seed entries
      return knex('coffees').insert([
        {id: 1, origin: 'Mexico', roast: 'medium', flavor: 'tart, citrus, floral', price: 15.99},
        {id: 2, origin: 'Sumatra', roast: 'light', flavor: 'berry', price: 14.99},
        {id: 3, origin: 'Guatemala', roast: 'dark', flavor: 'smokey, nutty', price: 15.99}
      ]);
    });
};
