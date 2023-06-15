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

router.post("/register", async (req, res) => {
  console.log(req.body);
  const customer = await prisma.customer.create({
    data: {
      CustomerName: req.body.customerName,
      BillingAddress: req.body.billingAddress,
      PaymentMethod: req.body.paymentMethod,
      UserID: req.session.user,
    },
  }).then(async (customer) => {
    const user = await prisma.user.findUnique({
      where: {
        UserID: req.session.user,
      },
    }).then(async (user) => {
      const updatedUser = await prisma.user.update({
        where: {
          UserID: req.session.user,
        },
        data: {
          CustomerID: customer.CustomerID,
        },
      }).then
        (updatedUser => {
          console.log(updatedUser);
        }
        ).catch((error) => {
          console.log(error);
          res.status(500).json({ message: 'Error updating user.' + error });
        }
        );
    }).catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Error updating user.' + error });
    });


    console.log(customer);
    res.status(200).json(customer);
  }
  ).catch((error) => {
    console.log(error);
    res.status(500).json({ message: 'Error creating customer.' + error });
  }
  );
});

module.exports = router;