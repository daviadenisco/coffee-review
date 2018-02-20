
exports.up = function(knex, Promise) {
  return knex.schema.createTable('coffees', (table) => {
    table.increments();
    table.string('origin', 64).notNull();
    table.string('roast', 64);
    table.string('flavor', 128);
    table.float('price');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('coffees');
};
