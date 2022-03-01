import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService";
import BaseController from '../utils/BaseController';

export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }


  async getAll(req, res, next) {
    try {
      const allHouses = await housesService.getAll(req.query)
      return res.send(allHouses)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const houseById = await housesService.getById(req.params.id)
      return res.send(houseById)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newHouse = await housesService.create(req.body)
      return res.send(newHouse)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const modifiedHouse = await housesService.edit(req.body)
      return res.send(modifiedHouse)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const removedHouse = await housesService.remove(req.params.id, userId)
      return res.send('House Removed')
    } catch (error) {
      next(error)
    }
  }
}
