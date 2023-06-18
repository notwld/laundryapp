const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const router = require("express").Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get("/user",isAuthenticated, async (req, res, next) => {
    const user = await prisma.user.findFirst({
        where: {
            UserID: parseInt(req.session.user)
        }
    })
    if (!user) return res.status(400).json({ message: "User doesn't exists!" })
    return res.status(200).json(user)
}
)

router.post("/update",isAuthenticated, async (req, res, next) => {
    const user = await prisma.user.findFirst({
        where: {
            UserID: parseInt(req.session.user)
        }
    })
    const validPass = await bcrypt.compare(req.body.password, user.Password)
    if (!validPass) return res.status(400).send("Invalid Password")
    const hashPass = await bcrypt.hash(req.body.newPassword, bcrypt.genSaltSync(10))
    const updateUser = await prisma.user.update({
        where: {
            UserID: parseInt(req.session.user)
        },
        data: {
            FirstName: req.body.fname,
            LastName: req.body.lname,
            Email: req.body.email,
            Address:req.body.address,
            Phone:req.body.phone,
            Username: req.body.username,
            Password: hashPass,
            Role: req.body.role
        }
    })
        .then((user) => { return res.status(200).json({ message: "User Updated!", updatedUser: user.Username }) })
        .catch((err) => { return res.status(400).json(
            {message:err.message}
        ) })
}
)
 

module.exports = router;