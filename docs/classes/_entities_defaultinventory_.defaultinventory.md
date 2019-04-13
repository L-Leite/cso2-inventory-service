[cso2-users-service](../README.md) > ["entities/defaultinventory"](../modules/_entities_defaultinventory_.md) > [DefaultInventory](../classes/_entities_defaultinventory_.defaultinventory.md)

# Class: DefaultInventory

holds items to give to new users

## Hierarchy

 `Typegoose`

**↳ DefaultInventory**

## Index

### Properties

* [backItem](_entities_defaultinventory_.defaultinventory.md#backitem)
* [cardItem](_entities_defaultinventory_.defaultinventory.md#carditem)
* [ctItem](_entities_defaultinventory_.defaultinventory.md#ctitem)
* [equipment](_entities_defaultinventory_.defaultinventory.md#equipment)
* [flash](_entities_defaultinventory_.defaultinventory.md#flash)
* [gloveItem](_entities_defaultinventory_.defaultinventory.md#gloveitem)
* [headItem](_entities_defaultinventory_.defaultinventory.md#headitem)
* [hegrenade](_entities_defaultinventory_.defaultinventory.md#hegrenade)
* [items](_entities_defaultinventory_.defaultinventory.md#items)
* [machineguns](_entities_defaultinventory_.defaultinventory.md#machineguns)
* [melee](_entities_defaultinventory_.defaultinventory.md#melee)
* [melees](_entities_defaultinventory_.defaultinventory.md#melees)
* [pistols](_entities_defaultinventory_.defaultinventory.md#pistols)
* [primary](_entities_defaultinventory_.defaultinventory.md#primary)
* [rifles](_entities_defaultinventory_.defaultinventory.md#rifles)
* [secondary](_entities_defaultinventory_.defaultinventory.md#secondary)
* [shotguns](_entities_defaultinventory_.defaultinventory.md#shotguns)
* [smgs](_entities_defaultinventory_.defaultinventory.md#smgs)
* [smoke](_entities_defaultinventory_.defaultinventory.md#smoke)
* [snipers](_entities_defaultinventory_.defaultinventory.md#snipers)
* [sprayItem](_entities_defaultinventory_.defaultinventory.md#sprayitem)
* [stepsItem](_entities_defaultinventory_.defaultinventory.md#stepsitem)
* [terItem](_entities_defaultinventory_.defaultinventory.md#teritem)

### Methods

* [getModelForClass](_entities_defaultinventory_.defaultinventory.md#getmodelforclass)
* [setModelForClass](_entities_defaultinventory_.defaultinventory.md#setmodelforclass)
* [create](_entities_defaultinventory_.defaultinventory.md#create)
* [get](_entities_defaultinventory_.defaultinventory.md#get)

---

## Properties

<a id="backitem"></a>

###  backItem

**● backItem**: *`number`*

*Defined in entities/defaultinventory.ts:63*

___
<a id="carditem"></a>

###  cardItem

**● cardItem**: *`number`*

*Defined in entities/defaultinventory.ts:67*

___
<a id="ctitem"></a>

###  ctItem

**● ctItem**: *`number`*

*Defined in entities/defaultinventory.ts:55*

___
<a id="equipment"></a>

###  equipment

**● equipment**: *`number`[]*

*Defined in entities/defaultinventory.ts:101*

___
<a id="flash"></a>

###  flash

**● flash**: *`number`[]*

*Defined in entities/defaultinventory.ts:81*

___
<a id="gloveitem"></a>

###  gloveItem

**● gloveItem**: *`number`*

*Defined in entities/defaultinventory.ts:61*

___
<a id="headitem"></a>

###  headItem

**● headItem**: *`number`*

*Defined in entities/defaultinventory.ts:59*

___
<a id="hegrenade"></a>

###  hegrenade

**● hegrenade**: *`number`[]*

*Defined in entities/defaultinventory.ts:79*

___
<a id="items"></a>

###  items

**● items**: *[InventoryItem](_entities_item_.inventoryitem.md)[]*

*Defined in entities/defaultinventory.ts:51*

___
<a id="machineguns"></a>

###  machineguns

**● machineguns**: *`number`[]*

*Defined in entities/defaultinventory.ts:97*

___
<a id="melee"></a>

###  melee

**● melee**: *`number`[]*

*Defined in entities/defaultinventory.ts:77*

___
<a id="melees"></a>

###  melees

**● melees**: *`number`[]*

*Defined in entities/defaultinventory.ts:99*

___
<a id="pistols"></a>

###  pistols

**● pistols**: *`number`[]*

*Defined in entities/defaultinventory.ts:87*

___
<a id="primary"></a>

###  primary

**● primary**: *`number`[]*

*Defined in entities/defaultinventory.ts:73*

___
<a id="rifles"></a>

###  rifles

**● rifles**: *`number`[]*

*Defined in entities/defaultinventory.ts:93*

___
<a id="secondary"></a>

###  secondary

**● secondary**: *`number`[]*

*Defined in entities/defaultinventory.ts:75*

___
<a id="shotguns"></a>

###  shotguns

**● shotguns**: *`number`[]*

*Defined in entities/defaultinventory.ts:89*

___
<a id="smgs"></a>

###  smgs

**● smgs**: *`number`[]*

*Defined in entities/defaultinventory.ts:91*

___
<a id="smoke"></a>

###  smoke

**● smoke**: *`number`[]*

*Defined in entities/defaultinventory.ts:83*

___
<a id="snipers"></a>

###  snipers

**● snipers**: *`number`[]*

*Defined in entities/defaultinventory.ts:95*

___
<a id="sprayitem"></a>

###  sprayItem

**● sprayItem**: *`number`*

*Defined in entities/defaultinventory.ts:69*

___
<a id="stepsitem"></a>

###  stepsItem

**● stepsItem**: *`number`*

*Defined in entities/defaultinventory.ts:65*

___
<a id="teritem"></a>

###  terItem

**● terItem**: *`number`*

*Defined in entities/defaultinventory.ts:57*

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

▸ **create**(): `Promise`<[DefaultInventory](_entities_defaultinventory_.defaultinventory.md)>

*Defined in entities/defaultinventory.ts:20*

**Returns:** `Promise`<[DefaultInventory](_entities_defaultinventory_.defaultinventory.md)>

___
<a id="get"></a>

### `<Static>` get

▸ **get**(): `Promise`<[DefaultInventory](_entities_defaultinventory_.defaultinventory.md)>

*Defined in entities/defaultinventory.ts:15*

get an user's inventory items

**Returns:** `Promise`<[DefaultInventory](_entities_defaultinventory_.defaultinventory.md)>
a promise to the user's inventory items

___

