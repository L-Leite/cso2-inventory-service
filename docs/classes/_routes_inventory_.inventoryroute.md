[cso2-users-service](../README.md) > ["routes/inventory"](../modules/_routes_inventory_.md) > [InventoryRoute](../classes/_routes_inventory_.inventoryroute.md)

# Class: InventoryRoute

handles requests to /inventory/:userId

## Hierarchy

**InventoryRoute**

## Index

### Constructors

* [constructor](_routes_inventory_.inventoryroute.md#constructor)

### Methods

* [onDeleteInventory](_routes_inventory_.inventoryroute.md#ondeleteinventory)
* [onDeleteInventoryBuyMenu](_routes_inventory_.inventoryroute.md#ondeleteinventorybuymenu)
* [onDeleteInventoryCosmetics](_routes_inventory_.inventoryroute.md#ondeleteinventorycosmetics)
* [onDeleteInventoryItem](_routes_inventory_.inventoryroute.md#ondeleteinventoryitem)
* [onDeleteInventoryLoadout](_routes_inventory_.inventoryroute.md#ondeleteinventoryloadout)
* [onGetInventory](_routes_inventory_.inventoryroute.md#ongetinventory)
* [onGetInventoryBuyMenu](_routes_inventory_.inventoryroute.md#ongetinventorybuymenu)
* [onGetInventoryCosmetics](_routes_inventory_.inventoryroute.md#ongetinventorycosmetics)
* [onGetInventoryLoadout](_routes_inventory_.inventoryroute.md#ongetinventoryloadout)
* [onPostInventory](_routes_inventory_.inventoryroute.md#onpostinventory)
* [onPostInventoryBuyMenu](_routes_inventory_.inventoryroute.md#onpostinventorybuymenu)
* [onPostInventoryCosmetics](_routes_inventory_.inventoryroute.md#onpostinventorycosmetics)
* [onPostInventoryLoadout](_routes_inventory_.inventoryroute.md#onpostinventoryloadout)
* [onPutInventoryBuyMenu](_routes_inventory_.inventoryroute.md#onputinventorybuymenu)
* [onPutInventoryCosmetics](_routes_inventory_.inventoryroute.md#onputinventorycosmetics)
* [onPutInventoryItem](_routes_inventory_.inventoryroute.md#onputinventoryitem)
* [onPutInventoryLoadout](_routes_inventory_.inventoryroute.md#onputinventoryloadout)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new InventoryRoute**(app: *`express.Express`*): [InventoryRoute](_routes_inventory_.inventoryroute.md)

*Defined in routes/inventory.ts:14*

**Parameters:**

| Name | Type |
| ------ | ------ |
| app | `express.Express` |

**Returns:** [InventoryRoute](_routes_inventory_.inventoryroute.md)

___

## Methods

<a id="ondeleteinventory"></a>

### `<Private>` onDeleteInventory

▸ **onDeleteInventory**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in routes/inventory.ts:121*

called when a DELETE request to /inventory/:userId is done deletes an user's invetory, cosmetics, loadouts and buy menu returns 200 if deleted successfully returns 400 if the request is malformed returns 404 if the user doesn't exist returns 500 if an internal unknown error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="ondeleteinventorybuymenu"></a>

### `<Private>` onDeleteInventoryBuyMenu

▸ **onDeleteInventoryBuyMenu**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in routes/inventory.ts:605*

called when a DELETE request to /inventory/:userId/buymenu is done deletes an user's buy menu returns 200 if deleted successfully returns 400 if the request is malformed returns 404 if the user doesn't exist returns 500 if an internal unknown error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="ondeleteinventorycosmetics"></a>

### `<Private>` onDeleteInventoryCosmetics

▸ **onDeleteInventoryCosmetics**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in routes/inventory.ts:331*

called when a DELETE request to /inventory/:userId/cosmetics is done deletes an user's cosmetics slots returns 200 if deleted successfully returns 400 if the request is malformed returns 404 if the user doesn't exist returns 500 if an internal unknown error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="ondeleteinventoryitem"></a>

### `<Private>` onDeleteInventoryItem

▸ **onDeleteInventoryItem**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in routes/inventory.ts:192*

called when a DELETE request to /inventory/:userId/item is done deletes an item from an user's invetory returns 200 if deleted successfully returns 400 if the request is malformed returns 404 if the user doesn't exist returns 500 if an internal unknown error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="ondeleteinventoryloadout"></a>

### `<Private>` onDeleteInventoryLoadout

▸ **onDeleteInventoryLoadout**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in routes/inventory.ts:468*

called when a DELETE request to /inventory/:userId/loadout is done deletes an user's loadouts returns 200 if deleted successfully returns 400 if the request is malformed returns 404 if the user doesn't exist returns 500 if an internal unknown error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="ongetinventory"></a>

### `<Private>` onGetInventory

▸ **onGetInventory**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in routes/inventory.ts:51*

called when a GET request to /inventory/:userId is done returns an user's inventory items returns 200 if successful returns 400 if the request is malformed returns 404 if the user doesn't exist returns 500 if an internal unknown error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="ongetinventorybuymenu"></a>

### `<Private>` onGetInventoryBuyMenu

▸ **onGetInventoryBuyMenu**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in routes/inventory.ts:501*

called when a GET request to /inventory/:userId/buymenu is done gets an user's buy menu returns 200 if successful returns 400 if the request is malformed returns 404 if the user doesn't exist returns 500 if an internal unknown error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="ongetinventorycosmetics"></a>

### `<Private>` onGetInventoryCosmetics

▸ **onGetInventoryCosmetics**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in routes/inventory.ts:228*

called when a GET request to /inventory/:userId/cosmetics is done gets the currently equipped user's cosmetics returns 200 if successful returns 400 if the request is malformed returns 404 if the user doesn't exist returns 500 if an internal unknown error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="ongetinventoryloadout"></a>

### `<Private>` onGetInventoryLoadout

▸ **onGetInventoryLoadout**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in routes/inventory.ts:364*

called when a GET request to /inventory/:userId/loadout is done gets an user's loadout returns 200 if successful returns 400 if the request is malformed returns 404 if the user doesn't exist returns 500 if an internal unknown error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="onpostinventory"></a>

### `<Private>` onPostInventory

▸ **onPostInventory**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in routes/inventory.ts:85*

called when a POST request to /inventory/:userId is done create an inventory for an user returns 200 if created successfully returns 400 if the request is malformed returns 409 if the user already has an inventory returns 500 if an internal unknown error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="onpostinventorybuymenu"></a>

### `<Private>` onPostInventoryBuyMenu

▸ **onPostInventoryBuyMenu**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in routes/inventory.ts:535*

called when a POST request to /inventory/:userId/buymenu is done creates a buy menu for an user returns 200 if created successfully returns 400 if the request is malformed returns 409 if the user already has a buy menu returns 500 if an internal unknown error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="onpostinventorycosmetics"></a>

### `<Private>` onPostInventoryCosmetics

▸ **onPostInventoryCosmetics**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in routes/inventory.ts:261*

called when a POST request to /inventory/:userId/cosmetics is done create cosmetic slots for an user returns 200 if created successfully returns 400 if the request is malformed returns 409 if the user already has cosmetic slots returns 500 if an internal unknown error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="onpostinventoryloadout"></a>

### `<Private>` onPostInventoryLoadout

▸ **onPostInventoryLoadout**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in routes/inventory.ts:398*

called when a POST request to /inventory/:userId/loadout is done create loadouts for an user returns 200 if created successfully returns 400 if the request is malformed returns 409 if the user already has loadouts returns 500 if an internal unknown error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="onputinventorybuymenu"></a>

### `<Private>` onPutInventoryBuyMenu

▸ **onPutInventoryBuyMenu**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in routes/inventory.ts:571*

called when a PUT request to /inventory/:userId/buymenu is done sets an user's sub buy menu returns 200 if set successfully returns 400 if the request is malformed returns 404 if the user doesn't exist returns 500 if an internal unknown error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="onputinventorycosmetics"></a>

### `<Private>` onPutInventoryCosmetics

▸ **onPutInventoryCosmetics**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in routes/inventory.ts:297*

called when a PUT request to /inventory/:userId/cosmetics is done sets an user's equipped cosmetics returns 200 if set successfully returns 400 if the request is malformed returns 404 if the user doesn't exist returns 500 if an internal unknown error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="onputinventoryitem"></a>

### `<Private>` onPutInventoryItem

▸ **onPutInventoryItem**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in routes/inventory.ts:154*

called when a PUT request to /inventory/:userId/item is done adds an item to an user's inventory returns 200 if added successfully returns 400 if the request is malformed returns 404 if the user doesn't exist returns 500 if an internal unknown error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___
<a id="onputinventoryloadout"></a>

### `<Private>` onPutInventoryLoadout

▸ **onPutInventoryLoadout**(req: *`express.Request`*, res: *`express.Response`*): `Promise`<`void`>

*Defined in routes/inventory.ts:434*

called when a PUT request to /inventory/:userId/cosmetics is done sets an user's equipped cosmetics returns 200 if set successfully returns 400 if the request is malformed returns 404 if the user doesn't exist returns 500 if an internal unknown error occured

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| req | `express.Request` |  the request data |
| res | `express.Response` |  the response data |

**Returns:** `Promise`<`void`>

___

