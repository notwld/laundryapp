const { PrismaClient } = require('@prisma/client')

const { registerValidation, loginValidation } = require('../middlewares/validate')

const prisma = new PrismaClient()
const router = require("express").Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res, next) => {
    if (!req.session.user) {
        const user = await prisma.user.findFirst({
            where: {
                Email: req.body.email
            }
        })

        if (user) return res.status(400).send("User Already Exists!")

        const hashPass = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(10))
        const validate = registerValidation(req.body)
            .then(async (response) => {
                const saveUser = await prisma.user.create({
                    data: {
                        FirstName: req.body.fname,
                        LastName: req.body.lname,
                        Email: req.body.email,
                        Address:req.body.address,
                        Phone:req.body.phone,
                        Username: req.body.username,
                        Role: req.body.role,
                        Password: hashPass,
                        
                    }
                })
                    .then((user) => { return res.status(200).send({ message: "User Registered!", registeredUser: user.Username }) })
                    .catch((err) => { return res.status(400).send(err) })
            })
            .catch((err) => { return res.status(400).send(err) })
    }
    else {
        res.redirect(`http://${req.hostname}:${process.env.PORT}/api/user/login`)
    }
})


router.post('/login', async (req, res, next) => {
    if (!req.session.user) {
        const user = await prisma.user.findFirst({
            where: {
                Email: req.body.email,
                Role:req.body.role
            }
        })

        if (!user) return res.status(400).send("User doesn't exists!")

        const validate = loginValidation(req.body)
            .then(async (response) => {
                const compare = bcrypt.compareSync(req.body.password, user.Password)
                if (!compare) return res.status(400).send("Invalid Password")

                const token = jwt.sign(user.UserID, process.env.SECRET_TOKEN)
                const session = req.session
                session.token = token
                session.user = user.UserID
                session.role = user.Role
                session.userName = user.Username
                return res.status(200).send({ message: "Logged In!", token: token, user: user })
            })
            .catch((err) => { return res.status(400).send(err) })
    }
    else {
        res.json({
            message:"Already Logged In!"
        })
    }
})

router.get('/logout', async (req, res, next) => {
    if (req.session.user) {
        req.session.destroy()
        res.json({
            message: "Logged Out!"
        })
    }
    else {
        res.json({
            message: "Already Logged Out!"
        })
    }
})


module.exports = router