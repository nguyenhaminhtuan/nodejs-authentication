'use strict';
const db = require('../db');

/**
 * @param {string} id
 */
function getUserById(id) {
  return db('users').select('*').where('id', id).first();
}

/**
 * @param {string} email
 */
function getUserByEmail(email) {
  return db('users').select('*').where('email', email).first();
}

/**
 * @param {{ email: string, password: string, full_name: string}} param
 */
function create({ email, password, full_name }) {
  return db('users').insert({ email, password, full_name }).returning('*');
}

module.exports = { getUserById, getUserByEmail, create };
