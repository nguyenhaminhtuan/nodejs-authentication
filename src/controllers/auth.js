'use strict';
const { Router } = require('express');
const authRequired = require('../helpers/auth-required');
const catchAsync = require('../helpers/catch-async');
const validator = require('../helpers/validator');
const authService = require('../services/auth');
const userService = require('../services/user');

const router = Router();

router.post(
  '/login',
  validator('body', {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['email', 'password'],
  }),
  catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginWithEmailPasswrod(email, password);
    req.session.user = {
      id: user.id,
      email: user.email,
    };
    return res.status(200).json({ logged_in: true });
  })
);

router.post(
  '/register',
  validator('body', {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
      full_name: { type: 'string' },
    },
    required: ['email', 'password', 'full_name'],
  }),
  catchAsync(async (req, res) => {
    const { email, password, full_name } = req.body;
    const { psswd, ...user } = await authService.registerWithEmailPassword(
      email,
      password,
      full_name
    );
    return res.status(201).json(user);
  })
);

router.post(
  '/logout',
  authRequired,
  catchAsync(async (req, res) => {
    req.session.destroy();
    return res.status(200).json({ logged_in: false });
  })
);

router.get(
  '/me',
  authRequired,
  catchAsync(async (req, res) => {
    const { id } = req.session.user;
    const { password, ...user } = await userService.getUserById(id);
    return res.status(200).json(user);
  })
);

module.exports = router;
