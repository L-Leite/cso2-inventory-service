[cso2-users-service](../README.md) > ["entities/inventory"](../modules/_entities_inventory_.md) > [Inventory](../classes/_entities_inventory_.inventory.md)

# Class: Inventory

represents an user's inventory

## Hierarchy

 `Typegoose`

**↳ Inventory**

## Index

### Properties

* [items](_entities_inventory_.inventory.md#items)
* [ownerId](_entities_inventory_.inventory.md#ownerid)

### Methods

* [getModelForClass](_entities_inventory_.inventory.md#getmodelforclass)
* [setModelForClass](_entities_inventory_.inventory.md#setmodelforclass)
* [addItem](_entities_inventory_.inventory.md#additem)
* [create](_entities_inventory_.inventory.md#create)
* [get](_entities_inventory_.inventory.md#get)
* [remove](_entities_inventory_.inventory.md#remove)
* [removeItem](_entities_inventory_.inventory.md#removeitem)
* [removeItemInternal](_entities_inventory_.inventory.md#removeiteminternal)
* [updateItemQuantity](_entities_inventory_.inventory.md#updateitemquantity)

---

## Properties

<a id="items"></a>

### `<Optional>` items

**● items**: *[InventoryItem](_entities_item_.inventoryitem.md)[]*

*Defined in entities/inventory.ts:132*

___
<a id="ownerid"></a>

###  ownerId

**● ownerId**: *`number`*

*Defined in entities/inventory.ts:130*

___

## Methods

<a id="getmodelforclass"></a>

###  getModelForClass

▸ **getModelForClass**<`T`>(t: *`T`*, __namedParameters?: *`object`*): `Model`<`InstanceType`<`this`>> & `this` & `T`

*Inherited from Typegoose.getModelForClass*

*Defined in /home/ochii/projects/cso2-inventory-service/node_modules/typegoose/lib/typegoose.d.ts:18*

**Type parameters:**

#### T 
**Parameters:**

**t: `T`**

**`Optional` __namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| existingConnection | `Connection` |
| existingMongoose | `"mongoose"` |
| schemaOptions | `SchemaOptions` |

**Returns:** `Model`<`InstanceType`<`this`>> & `this` & `T`

___
<a id="setmodelforclass"></a>

###  setModelForClass

▸ **setModelForClass**<`T`>(t: *`T`*, __namedParameters?: *`object`*): `Model`<`InstanceType`<`this`>> & `this` & `T`

*Inherited from Typegoose.setModelForClass*

*Defined in /home/ochii/projects/cso2-inventory-service/node_modules/typegoose/lib/typegoose.d.ts:19*

**Type parameters:**

#### T 
**Parameters:**

**t: `T`**

**`Optional` __namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| existingConnection | `Connection` |
| existingMongoose | `"mongoose"` |
| schemaOptions | `SchemaOptions` |

**Returns:** `Model`<`InstanceType`<`this`>> & `this` & `T`

___
<a id="additem"></a>

### `<Static>` addItem

▸ **addItem**(itemId: *`number`*, itemAmmount: *`number`*, userId: *`number`*): `Promise`<`boolean`>

*Defined in entities/inventory.ts:57*

add an item to an user's inventory

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| itemId | `number` |  the item's ID |
| itemAmmount | `number` |  the ammount of items |
| userId | `number` |  the owning user's ID |

**Returns:** `Promise`<`boolean`>
a promise that returns true if the item was added sucessfully,
         false if it wasn't (the user doesn't exist)

___
<a id="create"></a>

### `<Static>` create

▸ **create**(userId: *`number`*): `Promise`<[Inventory](_entities_inventory_.inventory.md)>

*Defined in entities/inventory.ts:25*

create an user's inventory

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userId | `number` |  the owner's user ID |

**Returns:** `Promise`<[Inventory](_entities_inventory_.inventory.md)>
a promise to the user's inventory items

___
<a id="get"></a>

### `<Static>` get

▸ **get**(userId: *`number`*): `Promise`<[Inventory](_entities_inventory_.inventory.md)>

*Defined in entities/inventory.ts:15*

get an user's inventory items

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userId | `number` |  the owning user's ID |

**Returns:** `Promise`<[Inventory](_entities_inventory_.inventory.md)>
a promise to the user's inventory items

___
<a id="remove"></a>

### `<Static>` remove

▸ **remove**(userId: *`number`*): `Promise`<`boolean`>

*Defined in entities/inventory.ts:36*

delete an inventory by its owner user ID

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userId | `number` |  the owner's user ID |

**Returns:** `Promise`<`boolean`>
a promise returning true if deleted successfully, or false if not

___
<a id="removeitem"></a>

### `<Static>` removeItem

▸ **removeItem**(itemId: *`number`*, userId: *`number`*, itemAmmount?: *`number`*): `Promise`<`boolean`>

*Defined in entities/inventory.ts:77*

remove an item from an user's inventory if itemAmmount IS provided, it will decrement the item's ammount by that value -- if the resulting ammount is zero or less than zero, the item will be deleted if itemAmmount is NOT provided, the item will be completely removed from the inventory

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| itemId | `number` |  the ID of the item to delete |
| userId | `number` |  the owning user's ID |
| `Optional` itemAmmount | `number` |  the ammount of items to delete (default: null) |

**Returns:** `Promise`<`boolean`>
a promise that returns true if anything was altered, false if not

___
<a id="removeiteminternal"></a>

### `<Static>``<Private>` removeItemInternal

▸ **removeItemInternal**(itemId: *`number`*, ownerId: *`number`*): `Promise`<`boolean`>

*Defined in entities/inventory.ts:107*

remove an item from an user's inventory

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| itemId | `number` |  the ID of the item to delete |
| ownerId | `number` |  the owning user's ID |

**Returns:** `Promise`<`boolean`>
a promise that returns true if deleted successfully, false if not

___
<a id="updateitemquantity"></a>

### `<Static>``<Private>` updateItemQuantity

▸ **updateItemQuantity**(itemId: *`number`*, newAmmount: *`number`*, ownerId: *`number`*): `Promise`<`boolean`>

*Defined in entities/inventory.ts:120*

update an item's quantity in an user's inventory

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| itemId | `number` |  the ID of the item to delete |
| newAmmount | `number` |  the new item's quantity |
| ownerId | `number` |  the owning user's ID |

**Returns:** `Promise`<`boolean`>
a promise that returns true if updated successfully, false if not

___

