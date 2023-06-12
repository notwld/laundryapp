const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = require('express').Router();
const isAuthenticated = require('../../middlewares/isAuthenticated');

router.get('/customers', isAuthenticated, async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving customers.' });
  }
});