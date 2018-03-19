import UserProxy from '../proxy/user'

class User extends UserProxy {
  constructor() {
    super();
  }
  
  async getUser(req, res, next) {
    const { userId } = req.query
    try {
      const user = await User.getUserById(userId)

      res.setHeader('Cache-Control', 'no-cache')
      res.json(user)
    } catch (error) {
      return next(error)
    }
  }
}
export default User
