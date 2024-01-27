const router = require('express').Router();



const playersRouter = require('./api/players.route')
const tournamentsRouter = require('./api/tournaments.route')
const usersRouter = require('./api/users.route')

const authRouter = require('./api/auth.route')

//API
router.use('/api/auth', authRouter)




router.use('/api/players', playersRouter)
router.use('/api/tournaments', tournamentsRouter)
router.use('/api/users', usersRouter)






module.exports = router;
