const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const router = require("express").Router()
const isAuthenticated = require('../../middlewares/isAuthenticated')

router.get("/vendors",isAuthenticated, async (req, res, next) => {
    const vendors = await prisma.vendor.findMany()
    if (!vendors) return res.status(400).json({ message: "No vendors found!" })
    return res.status(200).json(vendors)
})

router.post("/add", isAuthenticated, async (req, res, next) => {
    try {
      const vendor = await prisma.vendor.findFirst({
        where: {
          Name: req.body.name
        }
      });
  
      if (vendor) {
        return res.status(400).send("Vendor already exists!");
      }
  
      const addVendor = await prisma.vendor.create({
        data: {
          Name: req.body.name,
          Rates: parseFloat(req.body.rates),
          Location: req.body.location,
          Phone: req.body.phone,
          Email: req.body.email,
          Website: req.body.website,
          DeliveryAvailable: req.body.deliveryAvailablity,
          WorkingHours: req.body.workingHours,
          Availability: String(req.body.availability),
          Specialization: {
            create: req.body.specialization.map(specialization => ({
              Specialization: specialization
            }))
          },
          User: {
            connect: {
              UserID: parseInt(req.session.user)
          }
          }
        }
      });
  
      return res.status(200).json({
        message: "Vendor Added!",
        addedVendor: addVendor.Name
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message
      });
    }
  });


router.post("/update", isAuthenticated, async (req, res, next) => {
    try {
      const vendor = await prisma.vendor.findFirst({
        where: {
          Name: req.body.name
        }
      });
  
      if (!vendor) {
        return res.status(400).send("Vendor doesn't exist!");
      }
  
      const updateVendor = await prisma.vendor.update({
        where: {
          Name: req.body.name
        },
        data: {
          Rates: req.body.rates,
          Location: req.body.location,
          Phone: req.body.phone,
          Email: req.body.email,
          Website: req.body.website,
          DeliveryAvailable: req.body.deliveryAvailable,
          WorkingHours: req.body.workingHours,
          Availability: req.body.availability,
          Specialization: {
            set: req.body.specialization.map(specialization => ({
              Specialization: specialization
            }))
          }
        }
      });
  
      return res.status(200).json({
        message: "Vendor Updated!",
        updatedVendor: updateVendor.Name
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message
      });
    }
  } 
);


router.get("/delete", isAuthenticated, async (req, res, next) => {
    try {
      const vendor = await prisma.vendor.findFirst({
        where: {
          Name: req.body.name
        }
      });
  
      if (!vendor) {
        return res.status(400).send("Vendor doesn't exist!");
      }
  
      const deleteVendor = await prisma.vendor.delete({
        where: {
          Name: req.body.name
        }
      });
  
      return res.status(200).json({
        message: "Vendor Deleted!",
        deletedVendor: deleteVendor.Name
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message
      });
    }
  });
  
module.exports = router