const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    try {
        const user = await User.findOne({ username: body.username })
        const passwordCorrect = user === null ?
            false :
            await bcrypt.compare(body.password, user.passwordHash)

        if (!(user && passwordCorrect)) {
            return response.status(401).json({ error: 'invalid username or password' })
        }

        const userForToken = {
            username: body.username,
            id: user._id
        }

        const token = jwt.sign(userForToken, process.env.SECRET)
        response.status(200).send({ token, username: user.username, name: user.name, id:user._id })
    } catch (exception) {
        console.log(exception)
        response.status(500).send({ error: 'unrecognized error has occurred' })
    }
})

module.exports = loginRouter