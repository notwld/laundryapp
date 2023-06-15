const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = require('express').Router();
const isAuthenticated = require('../../middlewares/isAuthenticated');

router.get('/specializations', isAuthenticated, async (req, res, next) => {
  try {
    const specializations = await prisma.specialization.findMany();
    console.log(specializations)
    res.status(200).json(specializations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving specializations.' });
  }
});

router.get('/vendors', isAuthenticated, async (req, res, next) => {
  
    const vendors = await prisma.vendor.findMany({
      include:{
        Specializations:true
      }
    })
    .then(vendors=>{
      res.status(200).json(vendors)
    })
    .catch(e => {return res.status(500).json({error:e})})
});

router.post('/add', isAuthenticated, async (req, res, next) => {
  const vendorExists = await prisma.vendor.findFirst({
    where: {
      Name: req.body.name,
    },
  });
  if (vendorExists) {
    return res.status(400).json({ message: 'Vendor already exists!' });
  }

  const createdVendor = await prisma.vendor.create({
    data: {
      Name: req.body.name,
      Location: req.body.location,
      Phone: req.body.phone,
      Email: req.body.email,
      Website: req.body.website,
      DeliveryAvailable: req.body.deliveryAvailability,
      WorkingHours: req.body.workingHours,
      Availability: req.body.availability,
      Specializations: {
        connect: req.body.specializationID.map((id) => ({ SpecializationID: id })),
      },
      UserID: req.session.user,
    },
  })
    .then((addedVendor) => {
      res.status(200).json({
        message: 'Vendor Added',
        vendor: addedVendor.Name,
      });
    })
    .catch((e) => {
      return res.status(500).json({
        message: "Vendor Couldn't be added " + e,
      });
    });
});

router.post('/update', isAuthenticated, async (req, res, next) => {
  const vendor = await prisma.vendor.findFirst({
    where: {
      VendorID: req.body.vendorId,
    },
  });

  if (!vendor) {
    return res.status(400).json({ message: "Vendor doesn't exist!" });
  }

  const updatedVendor = await prisma.vendor.update({
    where: {
      VendorID: vendor.VendorID,
    },
    data: {
      Name: req.body.name,
      Location: req.body.location,
      Phone: req.body.phone,
      Email: req.body.email,
      Website: req.body.website,
      DeliveryAvailable: req.body.deliveryAvailable,
      WorkingHours: req.body.workingHours,
      Availability: req.body.availability,
      Specializations: {
        set: req.body.specializationID.map((id) => ({ SpecializationID: id })),
      },
    },
  })
    .then((updatedVendor) => {
      return res.status(200).json({
        message: 'Vendor Updated Successfully!',
      });
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).json({
        message: "Vendor couldn't be updated!",
      });
    });
});
router.post('/delete', isAuthenticated, async (req, res, next) => {
  try {
    const vendor = await prisma.vendor.findFirst({
      where: {
        VendorID: req.body.vendorId,
      },
    });

    if (!vendor) {
      return res.status(400).json({ message: "Vendor doesn't exist!" });
    }

    await prisma.vendor.delete({
      where: {
        VendorID: vendor.VendorID,
      },
    });

    res.status(200).json({ message: 'Vendor Deleted!' });
  } catch (error) {
    res.status(500).json({ message: "Vendor couldn't be deleted." });
  }
});

module.exports = router;
