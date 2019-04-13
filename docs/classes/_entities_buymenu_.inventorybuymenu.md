[cso2-users-service](../README.md) > ["entities/buymenu"](../modules/_entities_buymenu_.md) > [InventoryBuyMenu](../classes/_entities_buymenu_.inventorybuymenu.md)

# Class: InventoryBuyMenu

an user's ingame buy menu

## Hierarchy

 `Typegoose`

**↳ InventoryBuyMenu**

## Index

### Properties

* [equipment](_entities_buymenu_.inventorybuymenu.md#equipment)
* [machineguns](_entities_buymenu_.inventorybuymenu.md#machineguns)
* [melees](_entities_buymenu_.inventorybuymenu.md#melees)
* [ownerId](_entities_buymenu_.inventorybuymenu.md#ownerid)
* [pistols](_entities_buymenu_.inventorybuymenu.md#pistols)
* [rifles](_entities_buymenu_.inventorybuymenu.md#rifles)
* [shotguns](_entities_buymenu_.inventorybuymenu.md#shotguns)
* [smgs](_entities_buymenu_.inventorybuymenu.md#smgs)
* [snipers](_entities_buymenu_.inventorybuymenu.md#snipers)

### Methods

* [getModelForClass](_entities_buymenu_.inventorybuymenu.md#getmodelforclass)
* [setModelForClass](_entities_buymenu_.inventorybuymenu.md#setmodelforclass)
* [create](_entities_buymenu_.inventorybuymenu.md#create)
* [get](_entities_buymenu_.inventorybuymenu.md#get)
* [remove](_entities_buymenu_.inventorybuymenu.md#remove)
* [set](_entities_buymenu_.inventorybuymenu.md#set)

---

## Properties

<a id="equipment"></a>

###  equipment

**● equipment**: *`number`[]*

*Defined in entities/buymenu.ts:103*

___
<a id="machineguns"></a>

###  machineguns

**● machineguns**: *`number`[]*

*Defined in entities/buymenu.ts:99*

___
<a id="melees"></a>

###  melees

**● melees**: *`number`[]*

*Defined in entities/buymenu.ts:101*

___
<a id="ownerid"></a>

###  ownerId

**● ownerId**: *`number`*

*Defined in entities/buymenu.ts:87*

___
<a id="pistols"></a>

###  pistols

**● pistols**: *`number`[]*

*Defined in entities/buymenu.ts:89*

___
<a id="rifles"></a>

###  rifles

**● rifles**: *`number`[]*

*Defined in entities/buymenu.ts:95*

___
<a id="shotguns"></a>

###  shotguns

**● shotguns**: *`number`[]*

*Defined in entities/buymenu.ts:91*

___
<a id="smgs"></a>

###  smgs

**● smgs**: *`number`[]*

*Defined in entities/buymenu.ts:93*

___
<a id="snipers"></a>

###  snipers

**● snipers**: *`number`[]*

*Defined in entities/buymenu.ts:97*

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

▸ **create**(userId: *`number`*): `Promise`<[InventoryBuyMenu](_entities_buymenu_.inventorybuymenu.md)>

*Defined in entities/buymenu.ts:35*

create a buy menu for an user

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| userId | `number` |  the owner's user ID |

**Returns:** `Promise`<[InventoryBuyMenu](_entities_buymenu_.inventorybuymenu.md)>
a promise to the user's new buy menu

___
<a id="get"></a>

### `<Static>` get

▸ **get**(loadoutNum: *`number`*, userId: *`number`*): `Promise`<[InventoryBuyMenu](_entities_buymenu_.inventorybuymenu.md)>

*Defined in entities/buymenu.ts:25*

get an user's buy menu

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| loadoutNum | `number` |
| userId | `number` |  the owning user's ID |

**Returns:** `Promise`<[InventoryBuyMenu](_entities_buymenu_.inventorybuymenu.md)>
a promise to the user's buy menu

___
<a id="remove"></a>

### `<Static>` remove

▸ **remove**(userId: *`number`*): `Promise`<`boolean`>

*Defined in entities/buymenu.ts:73*

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

▸ **set**(updatedBuyMenu: *[ISetBuyMenuBody](../interfaces/_entities_buymenu_.isetbuymenubody.md)*, userId: *`number`*): `Promise`<`boolean`>

*Defined in entities/buymenu.ts:58*

set an user's buy menu

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| updatedBuyMenu | [ISetBuyMenuBody](../interfaces/_entities_buymenu_.isetbuymenubody.md) |  the updated buy menu |
| userId | `number` |  the owning user's ID |

**Returns:** `Promise`<`boolean`>
a promise that returns true if the buy menu was updated sucessfully,
         false if it wasn't (the user doesn't exist)

___

