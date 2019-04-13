[cso2-users-service](../README.md) > ["entities/cosmetics"](../modules/_entities_cosmetics_.md) > [InventoryCosmetics](../classes/_entities_cosmetics_.inventorycosmetics.md)

# Class: InventoryCosmetics

stores an user's equipped cosmetic items

## Hierarchy

 `Typegoose`

**↳ InventoryCosmetics**

## Index

### Properties

* [backItem](_entities_cosmetics_.inventorycosmetics.md#backitem)
* [cardItem](_entities_cosmetics_.inventorycosmetics.md#carditem)
* [ctItem](_entities_cosmetics_.inventorycosmetics.md#ctitem)
* [gloveItem](_entities_cosmetics_.inventorycosmetics.md#gloveitem)
* [headItem](_entities_cosmetics_.inventorycosmetics.md#headitem)
* [ownerId](_entities_cosmetics_.inventorycosmetics.md#ownerid)
* [sprayItem](_entities_cosmetics_.inventorycosmetics.md#sprayitem)
* [stepsItem](_entities_cosmetics_.inventorycosmetics.md#stepsitem)
* [terItem](_entities_cosmetics_.inventorycosmetics.md#teritem)

### Methods

* [getModelForClass](_entities_cosmetics_.inventorycosmetics.md#getmodelforclass)
* [setModelForClass](_entities_cosmetics_.inventorycosmetics.md#setmodelforclass)
* [create](_entities_cosmetics_.inventorycosmetics.md#create)
* [get](_entities_cosmetics_.inventorycosmetics.md#get)
* [remove](_entities_cosmetics_.inventorycosmetics.md#remove)
* [set](_entities_cosmetics_.inventorycosmetics.md#set)

---

## Properties

<a id="backitem"></a>

###  backItem

**● backItem**: *`number`*

*Defined in entities/cosmetics.ts:96*

___
<a id="carditem"></a>

###  cardItem

**● cardItem**: *`number`*

*Defined in entities/cosmetics.ts:100*

___
<a id="ctitem"></a>

###  ctItem

**● ctItem**: *`number`*

*Defined in entities/cosmetics.ts:88*

___
<a id="gloveitem"></a>

###  gloveItem

**● gloveItem**: *`number`*

*Defined in entities/cosmetics.ts:94*

___
<a id="headitem"></a>

###  headItem

**● headItem**: *`number`*

*Defined in entities/cosmetics.ts:92*

___
<a id="ownerid"></a>

###  ownerId

**● ownerId**: *`number`*

*Defined in entities/cosmetics.ts:86*

___
<a id="sprayitem"></a>

###  sprayItem

**● sprayItem**: *`number`*

*Defined in entities/cosmetics.ts:102*

___
<a id="stepsitem"></a>

###  stepsItem

**● stepsItem**: *`number`*

*Defined in entities/cosmetics.ts:98*

___
<a id="teritem"></a>

###  terItem

**● terItem**: *`number`*

*Defined in entities/cosmetics.ts:90*

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
<a id="create"></a>

### `<Static>` create

▸ **create**(userId: *`number`*): `Promise`<[InventoryCosmetics](_entities_cosmetics_.inventorycosmetics.md)>

*Defined in entities/cosmetics.ts:35*

create an user's inventory

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userId | `number` |  the owner's user ID |

**Returns:** `Promise`<[InventoryCosmetics](_entities_cosmetics_.inventorycosmetics.md)>
a promise to the user's inventory items

___
<a id="get"></a>

### `<Static>` get

▸ **get**(userId: *`number`*): `Promise`<[InventoryCosmetics](_entities_cosmetics_.inventorycosmetics.md)>

*Defined in entities/cosmetics.ts:25*

get an user's equipped cosmetics

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userId | `number` |  the owning user's ID |

**Returns:** `Promise`<[InventoryCosmetics](_entities_cosmetics_.inventorycosmetics.md)>
a promise to the user's cosmetics

___
<a id="remove"></a>

### `<Static>` remove

▸ **remove**(userId: *`number`*): `Promise`<`boolean`>

*Defined in entities/cosmetics.ts:72*

delete a buy menu by its owner user ID

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userId | `number` |  the owner's user ID |

**Returns:** `Promise`<`boolean`>
a promise returning true if deleted successfully, or false if not

___
<a id="set"></a>

### `<Static>` set

▸ **set**(updatedCosmetics: *[ISetCosmeticsBody](../interfaces/_entities_cosmetics_.isetcosmeticsbody.md)*, userId: *`number`*): `Promise`<`boolean`>

*Defined in entities/cosmetics.ts:58*

set an user's equipped cosmetics

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| updatedCosmetics | [ISetCosmeticsBody](../interfaces/_entities_cosmetics_.isetcosmeticsbody.md) |  the new cosmetics |
| userId | `number` |  the owning user's ID |

**Returns:** `Promise`<`boolean`>
a promise that returns true if the cosmetics were updated sucessfully,
         false if it weren't (the user doesn't exist)

___

