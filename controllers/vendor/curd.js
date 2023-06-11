const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = require('express').Router();
const isAuthenticated = require('../../middlewares/isAuthenticated');


router.get("/specialization", isAuthenticated, async (req, res, next) => {
  const specialization = await prisma.specialization.findMany({})
    .then((specialization) => {
      return res.status(200).json(specialization);
    }
    )
    .catch((err) => {
      return res.status(500).json({ message: err });
    }
    );
});

router.get('/vendors', isAuthenticated, async (req, res, next) => {
  const vendors = await prisma.vendor.findMany({})
    .then(async (vendors) => {
      const vendorsWithSpecializations = await Promise.all(
        vendors.map(async (vendor) => {
          const specialization = await prisma.specialization.findUnique({
            where: { SpecializationID: vendor.SpecializationID }
          });
          return {
            ...vendor,
            specialization
          };
        })
      );
      
      return res.status(200).json(vendorsWithSpecializations);
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

router.post('/add', isAuthenticated, async (req, res, next) => {
  // if (req.session.user) {
    console.log(req.body);
    const vendor = await prisma.vendor.findFirst({
      where: {
        Name: req.body.name,
      },
    });
    if (vendor) return res.status(400).json({ message: 'Vendor already exists!' });


    const addVendor = await prisma.vendor.create({
      data: {
        Name: req.body.name,
        Location: req.body.location,
        Phone: req.body.phone,
        Email: req.body.email,
        Website: req.body.website,
        DeliveryAvailable: req.body.deliveryAvailability,
        WorkingHours: req.body.workingHours,
        Availability: req.body.availability,
        SpecializationID: parseInt(req.body.specializationID),
        UserID: parseInt(req.session.user),
      
      },
    }).then((vendor) => {
   

      return res.status(200).json({
        message: 'Vendor Added!',
        addedVendor: vendor.Name,
      });
    }
    ).catch((err) => {
      return res.status(500).json({ message: "Vendor can't be added for some reason "+err });
    }
    );
  // } else { return res.status(400).json({ message: 'User not logged in!' }); }
});

router.post('/update', isAuthenticated, async (req, res, next) => {
  if (req.session.user) {
    const vendor = await prisma.vendor.findFirst({
      where: {
        Name: req.body.name,
      },
    })
    .then((vendor) => {
      if (!vendor) {
        return res.status(400).json({
          message: "Vendor doesn't exist!",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });


    const updateVendor = await prisma.vendor.update({
      where: {
        Name: req.body.name,
      },
      data: {
        Location: req.body.location,
        Phone: req.body.phone,
        Email: req.body.email,
        Website: req.body.website,
        DeliveryAvailable: req.body.deliveryAvailable,
        WorkingHours: req.body.workingHours,
        Availability: req.body.availability,
        specialization: {
          set: req.body.specialization.map((specialization) => ({
            Name: specialization,
          })),
        },
      },
    }).then((vendor) => {
      return res.status(200).json({
        message: 'Vendor Updated!',
        updatedVendor: vendor.Name,
      });
    }
    ).catch((err) => {
      return res.status(500).json({ message: err.message });
    }
    );
  } else {
    return res.status(400).json({ message: 'User not logged in!' });
  }
});

router.post('/delete', isAuthenticated, async (req, res, next) => {
  if (req.session.user) {
    const vendor = await prisma.vendor.findFirst({
      where: {
        Name: req.body.name,
      },
    })
    .then((vendor) => {
      if (!vendor) {
        return res.status(400).json({
          message: "Vendor doesn't exist!",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
  } else {
    return res.status(400).json({ message: 'User not logged in!' });
  }
});

module.exports = router;
