'use strict';
const knex = require('knex');
const config = require('../knexfile');

/**
 * @type {knex.Knex}
 */
module.exports = knex(config);
