import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { HouseSchema } from "../models/House";
import { ValueSchema } from '../models/Value'

class DbContext {
  House = mongoose.model('House', HouseSchema)
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
