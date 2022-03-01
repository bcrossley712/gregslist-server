import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden, UnAuthorized } from "../utils/Errors"

class HousesService {
  async getAll(query = {}) {
    const houses = await dbContext.House.find(query)
    return houses
  }
  async getById(id) {
    const house = await dbContext.House.findById(id)
    if (!house) {
      throw new BadRequest('Invalid House Id')
    }
    return house
  }
  async create(body) {
    const newHouse = await dbContext.House.create(body)
    return newHouse
  }
  async edit(body) {
    const original = await dbContext.House.findById(body.id)
    if (original.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('You cannot edit this house!')
    }
    original.bedrooms = body.bedrooms ? body.bedrooms : original.bedrooms
    original.bathrooms = body.bathrooms ? body.bathrooms : original.bathrooms
    original.levels = body.levels ? body.levels : original.levels
    original.year = body.year ? body.year : original.year
    original.price = body.price ? body.price : original.price
    original.imgUrl = body.imgUrl ? body.imgUrl : original.imgUrl
    original.description = body.description ? body.description : original.description

    await original.save({ runValidators: true })
    return original
  }
  async remove(id, userId) {
    const houseToDelete = await dbContext.House.findById(id)
    if (houseToDelete.creatorId.toString() !== userId) {
      throw new Forbidden('You cannot remove this house!')
    }
    await dbContext.House.findByIdAndDelete(id)
  }

}

export const housesService = new HousesService()