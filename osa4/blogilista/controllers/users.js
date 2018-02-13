const User = require('../models/user')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(User.format))
})

userRouter.post('/', async (request, response) => {
    const body=request.body

    try {
        const saltRounds=10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const newUser = new User ({
            username: body.username,
            name: body.name,
            passwordHash,
            adult: body.adult
        })

        const savedUser = await newUser.save()
        response.json(User.format(savedUser))
    } catch(exception) {
        console.log(exception)
        response.status(500).json({ error: 'unrecognized error occurred'})
    }
})

module.exports = userRouter