import { User } from '../models'


export const getUserById = (_id, callback) => {
  User.findById(_id).exec(callback)
}
