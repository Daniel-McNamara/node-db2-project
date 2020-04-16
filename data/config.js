const knex = require("knex");
const knexfile = require("../knexfile.js").development;

module.exports = knex(knexfile);