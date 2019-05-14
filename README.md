# cso2-inventory-service

[![Build Status](https://travis-ci.org/Ochii/cso2-inventory-service.svg?branch=master)](https://travis-ci.org/Ochii/cso2-inventory-service)

Inventory service for a Nexon's Counter-Strike: Online 2 master server written in Typescript on top of Node.js.

You can find download and build scripts in [cso2-master-services](https://github.com/Ochii/cso2-master-services#running-the-services).

## Building

After downloading the source code, go to a terminal instance, inside the source code's directory and:

```sh
npm install # installs the required dependencies
gulp build # builds the service
```

## Starting the service

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

## Testing the service

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

## Contributing

Bug reports and pull requests are very much welcome.

See the [current project's progress](https://github.com/Ochii/cso2-master-services/projects/1) for more information.

## License

Read ```LICENSE``` for the project's license information.

This project is not affiliated with either Valve or Nexon. Counter-Strike: Online 2 is owned by these companies.
