
cso2-inventory-service
======================

Inventory service for a Nexon's Counter-Strike: Online 2 master server written in Typescript on top of NodeJS.

You can find the `docker-compose` scripts used to run this in [cso2-master-services](https://github.com/Ochii/cso2-master-services).

Building
--------

After downloading the source code, go to a terminal instance, inside the source code's directory and:

```sh
npm install # installs the required dependencies
gulp build # builds the service
```

Starting the service
--------------------

You can start the inventory service with:

```sh
# environment variables
export INVENTORY_PORT=30101 # tells the service to host on port 30101
export DB_HOST=127.0.0.1 # the host's database to connect
export DB_PORT=27017 # the host's database port to connect
export DB_NAME=cso2 # the database's name

# starts the service
node dist/service.js
```

You **must** set those environment variables, or the service will not start.

Testing the service
-------------------

You can test the inventory service by running:

```sh
# environment variables
export INVENTORY_PORT=30101 # tells the service to host on port 30101
export DB_HOST=127.0.0.1 # the host's database to connect
export DB_PORT=27017 # the host's database port to connect
export DB_NAME=cso2 # the database's name

# tests the service
gulp test
```

Pull requests
-------------

Pull requests are very much welcome.

Please read the [contributing guide](https://github.com/Ochii/cso2-inventory-service/blob/master/.github/PULL_REQUEST_TEMPLATE.md) before contributing.

License
-------

Read `LICENSE` for the project's license information.

This project is not affiliated with either Valve or Nexon. Counter-Strike: Online 2 is owned by these companies.

## Index

### External modules

* ["entities/buymenu"](modules/_entities_buymenu_.md)
* ["entities/cosmetics"](modules/_entities_cosmetics_.md)
* ["entities/defaultinventory"](modules/_entities_defaultinventory_.md)
* ["entities/defaultitems"](modules/_entities_defaultitems_.md)
* ["entities/inventory"](modules/_entities_inventory_.md)
* ["entities/item"](modules/_entities_item_.md)
* ["entities/loadout"](modules/_entities_loadout_.md)
* ["log/loginstance"](modules/_log_loginstance_.md)
* ["log/morgan2winston"](modules/_log_morgan2winston_.md)
* ["routes/inventory"](modules/_routes_inventory_.md)
* ["service"](modules/_service_.md)
* ["serviceinstance"](modules/_serviceinstance_.md)

---

