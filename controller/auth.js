const { encryptPayload } = require('../utils')

class AuthController {
  google(req, res) {
    const io = req.app.get('io')
    const user = {
      name: req.user.profile.displayName,
      photo: req.user.profile.photos[0].value.replace(/sz=50/gi, 'sz=250'),
      id: req.user.profile.id,
      token: encryptPayload(req.user.accessToken)
    }

    io.in(req.session.socketId).emit('google', user)
  }
}

module.exports = new AuthController()
