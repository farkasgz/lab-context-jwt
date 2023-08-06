const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const User = require('../models/User.model')

router.post('/signup', async (req, res, next) => {
  /* Get back the payload from your request, as it's a POST you can access req.body */
  const payload = req.body

  /* Hash the password using bcryptjs */
  const salt = bcrypt.genSaltSync(13)
  const passwordsHash = bcrypt.hashSync(payload.password, salt)

  /* Record your user to the DB */

  try {
    await User.create({username: payload.username, email: payload.email, password: passwordsHash})
    res.status(201).json({message: "User created"})
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.post('/login', async (req, res, next) => {
  /* Get back the payload from your request, as it's a POST you can access req.body */
  const payload = req.body

  /* Try to get your user from the DB */
  const potentialUser = await User.findOne({username: payload.username})
  console.log(potentialUser)

  /* If your user exists, check if the password is correct */
  if(potentialUser) {
    const passwordCheck = bcrypt.compareSync(payload.password, potentialUser.password)
    console.log('usercheck: ', passwordCheck)

    if(passwordCheck){
      /* If your password is correct, sign the JWT using jsonwebtoken */
      const authToken = jwt.sign(
        {userId: potentialUser._id},
        process.env.TOKEN_SECRET,
        {
          algorithm: 'HS256',
          expiresIn: '6h',
        }
      )
      res.status(202).json({token: authToken})
    } else {
      res.status(403).json({errorMessage: 'Password invalid'})
    }

  } else {
    res.status(403).json({errorMessage: 'Password invalid'})
  }
})

router.get('/verify', async (req, res, next) => {
  // You need to use the middleware there, if the request passes the middleware, it means your token is good
  

})

module.exports = router
