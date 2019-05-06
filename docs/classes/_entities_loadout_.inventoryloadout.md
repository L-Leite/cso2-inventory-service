[cso2-inventory-service](../README.md) > ["entities/loadout"](../modules/_entities_loadout_.md) > [InventoryLoadout](../classes/_entities_loadout_.inventoryloadout.md)

# Class: InventoryLoadout

stores an user's loadout items at a slot

## Hierarchy

 `Typegoose`

**↳ InventoryLoadout**

## Index

### Properties

* [flash](_entities_loadout_.inventoryloadout.md#flash)
* [hegrenade](_entities_loadout_.inventoryloadout.md#hegrenade)
* [loadoutNum](_entities_loadout_.inventoryloadout.md#loadoutnum)
* [melee](_entities_loadout_.inventoryloadout.md#melee)
* [ownerId](_entities_loadout_.inventoryloadout.md#ownerid)
* [primary](_entities_loadout_.inventoryloadout.md#primary)
* [secondary](_entities_loadout_.inventoryloadout.md#secondary)
* [smoke](_entities_loadout_.inventoryloadout.md#smoke)

### Methods

* [getModelForClass](_entities_loadout_.inventoryloadout.md#getmodelforclass)
* [setModelForClass](_entities_loadout_.inventoryloadout.md#setmodelforclass)
* [create](_entities_loadout_.inventoryloadout.md#create)
* [get](_entities_loadout_.inventoryloadout.md#get)
* [remove](_entities_loadout_.inventoryloadout.md#remove)
* [set](_entities_loadout_.inventoryloadout.md#set)

---

## Properties

<a id="flash"></a>

### `<Optional>` flash

**● flash**: *`number`*

*Defined in [entities/loadout.ts:100](https://github.com/Ochii/cso2-inventory-service/blob/a4be48c/src/entities/loadout.ts#L100)*

___
<a id="hegrenade"></a>

### `<Optional>` hegrenade

**● hegrenade**: *`number`*

*Defined in [entities/loadout.ts:98](https://github.com/Ochii/cso2-inventory-service/blob/a4be48c/src/entities/loadout.ts#L98)*

___
<a id="loadoutnum"></a>

###  loadoutNum

**● loadoutNum**: *`number`*

*Defined in [entities/loadout.ts:90](https://github.com/Ochii/cso2-inventory-service/blob/a4be48c/src/entities/loadout.ts#L90)*

___
<a id="melee"></a>

### `<Optional>` melee

**● melee**: *`number`*

*Defined in [entities/loadout.ts:96](https://github.com/Ochii/cso2-inventory-service/blob/a4be48c/src/entities/loadout.ts#L96)*

___
<a id="ownerid"></a>

###  ownerId

**● ownerId**: *`number`*

*Defined in [entities/loadout.ts:88](https://github.com/Ochii/cso2-inventory-service/blob/a4be48c/src/entities/loadout.ts#L88)*

___
<a id="primary"></a>

### `<Optional>` primary

**● primary**: *`number`*

*Defined in [entities/loadout.ts:92](https://github.com/Ochii/cso2-inventory-service/blob/a4be48c/src/entities/loadout.ts#L92)*

___
<a id="secondary"></a>

### `<Optional>` secondary

**● secondary**: *`number`*

*Defined in [entities/loadout.ts:94](https://github.com/Ochii/cso2-inventory-service/blob/a4be48c/src/entities/loadout.ts#L94)*

___
<a id="smoke"></a>

### `<Optional>` smoke

**● smoke**: *`number`*

*Defined in [entities/loadout.ts:102](https://github.com/Ochii/cso2-inventory-service/blob/a4be48c/src/entities/loadout.ts#L102)*

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

▸ **create**(userId: *`number`*): `Promise`<[InventoryLoadout](_entities_loadout_.inventoryloadout.md)[]>

*Defined in [entities/loadout.ts:38](https://github.com/Ochii/cso2-inventory-service/blob/a4be48c/src/entities/loadout.ts#L38)*

create loadouts for an user

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userId | `number` |  the owner's user ID |

**Returns:** `Promise`<[InventoryLoadout](_entities_loadout_.inventoryloadout.md)[]>
a promise to the user's inventory items

___
<a id="get"></a>

### `<Static>` get

▸ **get**(loadoutNum: *`number`*, userId: *`number`*): `Promise`<[InventoryLoadout](_entities_loadout_.inventoryloadout.md)>

*Defined in [entities/loadout.ts:28](https://github.com/Ochii/cso2-inventory-service/blob/a4be48c/src/entities/loadout.ts#L28)*

get an user's loadout

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| loadoutNum | `number` |  the loadout's index number |
| userId | `number` |  the owning user's ID |

**Returns:** `Promise`<[InventoryLoadout](_entities_loadout_.inventoryloadout.md)>
a promise to the user's loadout

___
<a id="remove"></a>

### `<Static>` remove

▸ **remove**(userId: *`number`*): `Promise`<`boolean`>

*Defined in [entities/loadout.ts:81](https://github.com/Ochii/cso2-inventory-service/blob/a4be48c/src/entities/loadout.ts#L81)*

delete any loadouts by its owner user ID

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userId | `number` |  the owner's user ID |

**Returns:** `Promise`<`boolean`>
a promise returning true if deleted successfully, or false if not

___
<a id="set"></a>

### `<Static>` set

▸ **set**(updatedLoadout: *[ISetLoadoutBody](../interfaces/_entities_loadout_.isetloadoutbody.md)*, userId: *`number`*): `Promise`<`boolean`>

*Defined in [entities/loadout.ts:66](https://github.com/Ochii/cso2-inventory-service/blob/a4be48c/src/entities/loadout.ts#L66)*

set an user's loadout

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| updatedLoadout | [ISetLoadoutBody](../interfaces/_entities_loadout_.isetloadoutbody.md) |  the updated loadout |
| userId | `number` |  the owning user's ID |

**Returns:** `Promise`<`boolean`>
a promise that returns true if the loadout was updated sucessfully,
         false if it wasn't (the user doesn't exist)

___

