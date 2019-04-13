import * as typegoose from 'typegoose'

import { DefaultInventory } from 'entities/defaultinventory'

export interface ISetCosmeticsBody {
    ctItem?: number
    terItem?: number
    headItem?: number
    gloveItem?: number
    backItem?: number
    stepsItem?: number
    cardItem?: number
    sprayItem?: number
}

/**
 * stores an user's equipped cosmetic items
 */
export class InventoryCosmetics extends typegoose.Typegoose {
    /**
     * get an user's equipped cosmetics
     * @param userId the owning user's ID
     * @returns a promise to the user's cosmetics
     */
    public static async get(userId: number): Promise<InventoryCosmetics> {
        return await InventoryCosmeticsModel.findOne({ ownerId: userId })
            .exec()
    }

    /**
     * create an user's inventory
     * @param userId the owner's user ID
     * @returns a promise to the user's inventory items
     */
    public static async create(userId: number): Promise<InventoryCosmetics> {
        const defaultItems: DefaultInventory = await DefaultInventory.get()
        const newCosmetics = new InventoryCosmeticsModel({
            ownerId: userId,
            ctItem: defaultItems.ctItem,
            terItem: defaultItems.terItem,
            headItem: defaultItems.headItem,
            gloveItem: defaultItems.gloveItem,
            backItem: defaultItems.backItem,
            stepsItem: defaultItems.stepsItem,
            cardItem: defaultItems.cardItem,
            sprayItem: defaultItems.sprayItem,
        })
        return newCosmetics.save()
    }

    /**
     * set an user's equipped cosmetics
     * @param updatedCosmetics the new cosmetics
     * @param userId the owning user's ID
     * @returns a promise that returns true if the cosmetics were updated sucessfully,
     *          false if it weren't (the user doesn't exist)
     */
    public static async set(updatedCosmetics: ISetCosmeticsBody,
                            userId: number): Promise<boolean> {
        const res =
            await InventoryCosmeticsModel.updateOne(
                { ownerId: userId }, { $set: updatedCosmetics })
                .exec()
        return res.n === 1 && res.nModified === 1
    }

    /**
     * delete a buy menu by its owner user ID
     * @param userId the owner's user ID
     * @returns a promise returning true if deleted successfully, or false if not
     */
    public static async remove(userId: number): Promise<boolean> {
        return new Promise<boolean>((resolve: (val: boolean) => void,
                                     reject: (reason?: any) => void) => {
            InventoryCosmeticsModel.deleteOne({ ownerId: userId })
                .exec()
                .then((val: { ok: number; n: number; }) => {
                    // return true if deleted only one document (val.n) with success (val.ok)
                    return resolve(val.ok === 1 && val.n === 1)
                })
                .catch(reject)
        })
    }

    @typegoose.prop({ index: true, required: true, unique: true })
    public ownerId: number
    @typegoose.prop({ required: true })
    public ctItem: number
    @typegoose.prop({ required: true })
    public terItem: number
    @typegoose.prop({ required: true })
    public headItem: number
    @typegoose.prop({ required: true })
    public gloveItem: number
    @typegoose.prop({ required: true })
    public backItem: number
    @typegoose.prop({ required: true })
    public stepsItem: number
    @typegoose.prop({ required: true })
    public cardItem: number
    @typegoose.prop({ required: true })
    public sprayItem: number
}

export const InventoryCosmeticsModel = new InventoryCosmetics().getModelForClass(InventoryCosmetics)
