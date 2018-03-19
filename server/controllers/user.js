import UserProxy from '../proxy/user'

export default {
  getUser(req, res, next) {
    const { userId } = req.query
    UserProxy.getUserById(userId, (err, user) => {
      if (err) {
        return next(err);
      }
      res.setHeader('Cache-Control', 'no-cache')
      res.json(user)
    })
  }
}
