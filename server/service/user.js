import { User } from '../models'

export default {
  getUserById(_id, callback) {
    User.findById(_id).exec(callback)
  }
}
