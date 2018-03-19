import { User } from '../models'

class UserProxy {
  async getUserById(_id) {
    return await User.findById(_id).exec()
  }
}

export default UserProxy
