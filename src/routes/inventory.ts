import express from 'express'

import { LogInstance } from 'log/loginstance'

import { InventoryBuyMenu } from 'entities/buymenu'
import { InventoryCosmetics, ISetCosmeticsBody } from 'entities/cosmetics'
import { Inventory } from 'entities/inventory'
import { InventoryLoadout } from 'entities/loadout'
import { MongoError } from 'mongodb';

/**
 * handles requests to /inventory/:userId
 */
export class InventoryRoute {
  constructor(app: express.Express) {
    app.route('/inventory/:userId')
      .get(this.onGetInventory)
      .post(this.onPostInventory)
      .delete(this.onDeleteInventory)
    app.route('/inventory/:userId/item')
      .put(this.onPutInventoryItem)
      .delete(this.onDeleteInventoryItem)
    app.route('/inventory/:userId/cosmetics')
      .get(this.onGetInventoryCosmetics)
      .post(this.onPostInventoryCosmetics)
      .put(this.onPutInventoryCosmetics)
      .delete(this.onDeleteInventoryCosmetics)
    app.route('/inventory/:userId/loadout')
      .get(this.onGetInventoryLoadout)
      .post(this.onPostInventoryLoadout)
      .put(this.onPutInventoryLoadout)
      .delete(this.onDeleteInventoryLoadout)
    app.route('/inventory/:userId/buymenu')
      .get(this.onGetInventoryBuyMenu)
      .post(this.onPostInventoryBuyMenu)
      .put(this.onPutInventoryBuyMenu)
      .delete(this.onDeleteInventoryBuyMenu)
  }

  /**
   * called when a GET request to /inventory/:userId is done
   * returns an user's inventory items
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onGetInventory(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`GET request to /inventory/${reqUserId}`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const userInv: Inventory = await Inventory.get(reqUserId)

      if (userInv != null) {
        return res.status(200).json(userInv).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a POST request to /inventory/:userId is done
   * create an inventory for an user
   * returns 200 if created successfully
   * returns 400 if the request is malformed
   * returns 409 if the user already has an inventory
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onPostInventory(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`POST request to /inventory/${reqUserId}`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const newInventory: Inventory = await Inventory.create(reqUserId)
      return res.status(200).json(newInventory).end()
    } catch (error) {
      if (error instanceof MongoError) {
        // 11000 is the duplicate key error code
        if (error.code === 11000) {
          LogInstance.warn(`Tried to create inventory for an existing user (userId: ${reqUserId}`)
          return res.status(409).end()
        }
      }
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a DELETE request to /inventory/:userId is done
   * deletes an user's invetory, cosmetics, loadouts and buy menu
   * returns 200 if deleted successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onDeleteInventory(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`DELETE request to /inventory/${reqUserId}`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const wasDeleted: boolean = await Inventory.remove(reqUserId)
      if (wasDeleted === true) {
        return res.status(200).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a PUT request to /inventory/:userId/item is done
   * adds an item to an user's inventory
   * returns 200 if added successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onPutInventoryItem(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)
    const reqItemId: number = req.body.itemId
    const reqItemAmmount: number = req.body.ammount

    LogInstance.debug(`PUT request to /inventory/${reqUserId}/item`)

    if (isNaN(reqUserId)
      || isNaN(reqItemId)
      || isNaN(reqItemAmmount)) {
      return res.status(400).end()
    }

    try {
      const wasAdded: boolean = await Inventory.addItem(reqItemId, reqItemAmmount, reqUserId)

      if (wasAdded === true) {
        return res.status(200).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a DELETE request to /inventory/:userId/item is done
   * deletes an item from an user's invetory
   * returns 200 if deleted successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onDeleteInventoryItem(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)
    const reqItemId: number = req.body.itemId
    const reqItemAmmount: number = req.body.ammount

    LogInstance.debug(`DELETE request to /inventory/${reqUserId}/item`)

    if (isNaN(reqUserId)
      || reqItemId == null) {
      return res.status(400).end()
    }

    try {
      const wasDeleted: boolean = await Inventory.removeItem(reqItemId, reqUserId, reqItemAmmount)
      if (wasDeleted === true) {
        return res.status(200).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a GET request to /inventory/:userId/cosmetics is done
   * gets the currently equipped user's cosmetics
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onGetInventoryCosmetics(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`GET request to /inventory/${reqUserId}/cosmetics`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const cosmetics: InventoryCosmetics = await InventoryCosmetics.get(reqUserId)
      if (cosmetics != null) {
        return res.status(200).json(cosmetics).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a POST request to /inventory/:userId/cosmetics is done
   * create cosmetic slots for an user
   * returns 200 if created successfully
   * returns 400 if the request is malformed
   * returns 409 if the user already has cosmetic slots
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onPostInventoryCosmetics(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`POST request to /inventory/${reqUserId}/cosmetics`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const newCosmetics: InventoryCosmetics = await InventoryCosmetics.create(reqUserId)
      return res.status(200).json(newCosmetics).end()
    } catch (error) {
      if (error instanceof MongoError) {
        // 11000 is the duplicate key error code
        if (error.code === 11000) {
          LogInstance.warn(`Tried to create cosmetic slots for an existing user (userId: ${reqUserId}`)
          return res.status(409).end()
        }
      }
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a PUT request to /inventory/:userId/cosmetics is done
   * sets an user's equipped cosmetics
   * returns 200 if set successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onPutInventoryCosmetics(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)
    const reqCosmetics: ISetCosmeticsBody = req.body

    LogInstance.debug(`PUT request to /inventory/${reqUserId}/cosmetics`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const wasUpdated: boolean = await InventoryCosmetics.set(reqCosmetics, reqUserId)
      if (wasUpdated === true) {
        return res.status(200).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a DELETE request to /inventory/:userId/cosmetics is done
   * deletes an user's cosmetics slots
   * returns 200 if deleted successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onDeleteInventoryCosmetics(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`DELETE request to /inventory/${reqUserId}/cosmetics`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const wasDeleted: boolean = await InventoryCosmetics.remove(reqUserId)
      if (wasDeleted === true) {
        return res.status(200).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a GET request to /inventory/:userId/loadout is done
   * gets an user's loadout
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onGetInventoryLoadout(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)
    const reqLoadoutNum: number = Number(req.body.loadoutNum)

    LogInstance.debug(`GET request to /inventory/${reqUserId}/loadout`)

    if (isNaN(reqUserId) || isNaN(reqLoadoutNum)) {
      return res.status(400).end()
    }

    try {
      const loadout: InventoryLoadout = await InventoryLoadout.get(reqLoadoutNum, reqUserId)
      if (loadout != null) {
        return res.status(200).json(loadout).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a POST request to /inventory/:userId/loadout is done
   * create loadouts for an user
   * returns 200 if created successfully
   * returns 400 if the request is malformed
   * returns 409 if the user already has loadouts
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onPostInventoryLoadout(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`POST request to /inventory/${reqUserId}/loadout`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const newLoadouts: InventoryLoadout[] = await InventoryLoadout.create(reqUserId)
      return res.status(200).json(newLoadouts).end()
    } catch (error) {
      if (error instanceof MongoError) {
        // 11000 is the duplicate key error code
        if (error.code === 11000) {
          LogInstance.warn(`Tried to create loadouts for an existing user (userId: ${reqUserId}`)
          return res.status(409).end()
        }
      }
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a PUT request to /inventory/:userId/cosmetics is done
   * sets an user's equipped cosmetics
   * returns 200 if set successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onPutInventoryLoadout(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)
    const reqLoadout: InventoryLoadout = req.body

    LogInstance.debug(`PUT request to /inventory/${reqUserId}/loadout`)

    if (isNaN(reqUserId) || isNaN(reqLoadout.loadoutNum) == null) {
      return res.status(400).end()
    }

    try {
      const wasUpdated: boolean = await InventoryLoadout.set(req.body, reqUserId)
      if (wasUpdated === true) {
        return res.status(200).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a DELETE request to /inventory/:userId/loadout is done
   * deletes an user's loadouts
   * returns 200 if deleted successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onDeleteInventoryLoadout(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`DELETE request to /inventory/${reqUserId}/loadout`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const wasDeleted: boolean = await InventoryLoadout.remove(reqUserId)
      if (wasDeleted === true) {
        return res.status(200).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a GET request to /inventory/:userId/buymenu is done
   * gets an user's buy menu
   * returns 200 if successful
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onGetInventoryBuyMenu(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`GET request to /inventory/${reqUserId}/buymenu`)

    // return bad request if the userid is invalid
    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const buyMenu: InventoryBuyMenu = await InventoryBuyMenu.get(req.body, reqUserId)
      if (buyMenu !== null) {
        return res.status(200).json(buyMenu).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a POST request to /inventory/:userId/buymenu is done
   * creates a buy menu for an user
   * returns 200 if created successfully
   * returns 400 if the request is malformed
   * returns 409 if the user already has a buy menu
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onPostInventoryBuyMenu(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`POST request to /inventory/${reqUserId}/buymenu`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const newBuyMenu: InventoryBuyMenu = await InventoryBuyMenu.create(reqUserId)
      return res.status(200).json(newBuyMenu).end()
    } catch (error) {
      if (error instanceof MongoError) {
        // 11000 is the duplicate key error code
        if (error.code === 11000) {
          LogInstance.warn(`Tried to create a buy menu for an existing user (userId: ${reqUserId}`)
          return res.status(409).end()
        }
      }
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a PUT request to /inventory/:userId/buymenu is done
   * sets an user's sub buy menu
   * returns 200 if set successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onPutInventoryBuyMenu(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`PUT request to /inventory/${reqUserId}/buymenu`)

    // return bad request if the userid or the body are invalid
    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const wasUpdated: boolean = await InventoryBuyMenu.set(req.body, reqUserId)
      if (wasUpdated === true) {
        return res.status(200).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }

  /**
   * called when a DELETE request to /inventory/:userId/buymenu is done
   * deletes an user's buy menu
   * returns 200 if deleted successfully
   * returns 400 if the request is malformed
   * returns 404 if the user doesn't exist
   * returns 500 if an internal unknown error occured
   * @param req the request data
   * @param res the response data
   * @param next the next request handler
   */
  private async onDeleteInventoryBuyMenu(req: express.Request, res: express.Response): Promise<void> {
    const reqUserId: number = Number(req.params.userId)

    LogInstance.debug(`DELETE request to /inventory/${reqUserId}/buymenu`)

    if (isNaN(reqUserId)) {
      return res.status(400).end()
    }

    try {
      const wasDeleted: boolean = await InventoryBuyMenu.remove(reqUserId)
      if (wasDeleted === true) {
        return res.status(200).end()
      } else {
        return res.status(404).end()
      }
    } catch (error) {
      LogInstance.error(error)
      return res.status(500).end()
    }
  }
}
