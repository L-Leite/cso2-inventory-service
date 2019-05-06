import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiJson from 'chai-json-schema'
import mocha from 'mocha'
import superagent from 'superagent'

// add the src directory to the module search path
import { addPath } from 'app-module-path'
addPath(__dirname + '/../../src')

import { ServiceInstance } from 'serviceinstance'

// setup chai
chai.should()
chai.use(chaiHttp)
chai.use(chaiJson)

mocha.describe('User\'s inventory', (): void => {
    let serviceInstance: ServiceInstance

    mocha.before((): void => {
        // start service instance
        serviceInstance = new ServiceInstance()
        serviceInstance.listen()
    })

    mocha.describe('POST /inventory/:userId', (): void => {
        mocha.it('Should create a new inventory',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/123456')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(201)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'items',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                items: {
                                    type: 'array',
                                    properties: {
                                        itemId: {
                                            type: 'number',
                                            minimum: 1,
                                        },
                                        ammount: {
                                            type: 'number',
                                            minimum: 1,
                                        },
                                    },
                                },
                            },
                        })
                        return done()
                    })
            })
        mocha.it('Should 400 when creating an item in the user inventory with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/fake')
                    .send({
                        itemId: 10092,
                        ammount: 1,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 409 when creating a new inventory with an existing userId',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/123456')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(409)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('GET /inventory/:userId', (): void => {
        const firstOwner: number = 123456
        const secondOwner: number = 654321

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/' + firstOwner)
                .then(() => {
                    chai.request(serviceInstance.app)
                        .post('/inventory/' + secondOwner)
                        .then(() => {
                            return done()
                        })
                })

        })

        mocha.it('Should get an user inventory',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/' + firstOwner)
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'items',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                items: {
                                    type: 'array',
                                    properties: {
                                        itemId: {
                                            type: 'number',
                                            minimum: 1,
                                        },
                                        ammount: {
                                            type: 'number',
                                            minimum: 1,
                                        },
                                    },
                                },
                            },
                        })
                        return done()
                    })
            })
        mocha.it('Should 400 when getting an inventory with a string as owner ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/bad')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when getting a non existing inventory',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/404')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/' + firstOwner)
                .then(() => {
                    chai.request(serviceInstance.app)
                        .delete('/inventory/' + secondOwner)
                        .then(() => {
                            return done()
                        })
                })

        })
    })

    mocha.describe('DELETE /inventory/:userId', (): void => {
        const firstOwner: number = 123456
        const secondOwner: number = 654321

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/' + firstOwner)
                .then(() => {
                    chai.request(serviceInstance.app)
                        .post('/inventory/' + secondOwner)
                        .then(() => {
                            return done()
                        })
                })

        })

        mocha.it('Should delete an user inventory',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/' + firstOwner)
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Should 404 when getting the deleted inventory',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/404')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })
        mocha.it('Should 400 when deleting an inventory with a string as owner ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/bad')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when deleting a non existing inventory',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/404')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/' + secondOwner)
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('PUT /inventory/:userId/item', (): void => {
        const invOwner: number = 123456

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/' + invOwner)
                .then(() => {
                    return done()
                })

        })

        mocha.it('Should add an item to the user inventory',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/' + invOwner + '/item')
                    .send({
                        itemId: 12345,
                        ammount: 1,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Should 400 when adding an inventory with a string as owner ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/bad/item')
                    .send({
                        itemId: 12345,
                        ammount: 1,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 400 when adding an inventory with a bad parameters',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/' + invOwner + '/item')
                    .send({
                        ugly: 12345,
                        invalid: 'yes',
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 400 when adding an inventory with a string as owner ID and bad parameters',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/bad/item')
                    .send({
                        ugly: 12345,
                        invalid: 'yes',
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when adding an item to a non existing inventory',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/404/item')
                    .send({
                        itemId: 12345,
                        ammount: 1,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/' + invOwner)
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('DELETE /inventory/:userId/item', (): void => {
        const firstOwner: number = 123456
        const secondOwner: number = 654321

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/' + firstOwner)
                .then(() => {
                    chai.request(serviceInstance.app)
                        .post('/inventory/' + secondOwner)
                        .then(() => {
                            chai.request(serviceInstance.app)
                                .put('/inventory/' + firstOwner + '/item')
                                .send({
                                    itemId: 12345,
                                    ammount: 1,
                                })
                                .then(() => {
                                    chai.request(serviceInstance.app)
                                        .put('/inventory/' + firstOwner + '/item')
                                        .send({
                                            itemId: 234567,
                                            ammount: 5,
                                        })
                                        .then(() => {
                                            return done()
                                        })
                                })
                        })
                })
        })

        mocha.it('Should delete an item to the user inventory',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/' + firstOwner + '/item')
                    .send({
                        itemId: 12345,
                        ammount: 1,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Should decrement an item\'s ammount from an user inventory',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/' + firstOwner + '/item')
                    .send({
                        itemId: 234567,
                        ammount: 2,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Should 400 when adding an inventory with a string as owner ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/bad/item')
                    .send({
                        itemId: 12345,
                        ammount: 1,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 400 when adding an inventory with a bad parameters',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/' + firstOwner + '/item')
                    .send({
                        ugly: 12345,
                        invalid: 'yes',
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 400 when adding an inventory with a string as owner ID and bad parameters',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/bad/item')
                    .send({
                        ugly: 12345,
                        invalid: 'yes',
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when adding an item to a non existing inventory',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/404/item')
                    .send({
                        itemId: 12345,
                        ammount: 1,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/' + firstOwner)
                .then(() => {
                    chai.request(serviceInstance.app)
                        .delete('/inventory/' + secondOwner)
                        .then(() => {
                            return done()
                        })
                })
        })
    })

    mocha.describe('POST /inventory/:userId/cosmetics', (): void => {
        mocha.it('Should create new user\'s cosmetics slots',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/123456/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(201)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'ctItem',
                                'terItem',
                                'headItem',
                                'gloveItem',
                                'backItem',
                                'stepsItem',
                                'cardItem',
                                'sprayItem',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                ctItem: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                terItem: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                headItem: {
                                    type: 'number',
                                },
                                gloveItem: {
                                    type: 'number',
                                },
                                backItem: {
                                    type: 'number',
                                },
                                stepsItem: {
                                    type: 'number',
                                },
                                cardItem: {
                                    type: 'number',
                                },
                                sprayItem: {
                                    type: 'number',
                                },
                            },
                        })
                        return done()
                    })
            })
        mocha.it('Should 400 when creating new user\'s cosmetics slots with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/bad/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 409 when creating a new inventory with an existing userId',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/123456/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(409)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/cosmetics')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('GET /inventory/:userId/cosmetics', (): void => {
        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/123456/cosmetics')
                .then(() => {
                    return done()
                })

        })

        mocha.it('Should get an user\'s currently equipped cosmetics',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/123456/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'ctItem',
                                'terItem',
                                'headItem',
                                'gloveItem',
                                'backItem',
                                'stepsItem',
                                'cardItem',
                                'sprayItem',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                ctItem: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                terItem: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                headItem: {
                                    type: 'number',
                                },
                                gloveItem: {
                                    type: 'number',
                                },
                                backItem: {
                                    type: 'number',
                                },
                                stepsItem: {
                                    type: 'number',
                                },
                                cardItem: {
                                    type: 'number',
                                },
                                sprayItem: {
                                    type: 'number',
                                },
                            },
                        })
                        return done()
                    })
            })
        mocha.it('Should 400 when getting an user\'s currently equipped cosmetics with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/bad/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when getting an user\'s currently equipped cosmetics with a non existing user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/404/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/cosmetics')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('PUT /inventory/:userId/cosmetics', (): void => {
        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/123456/cosmetics')
                .then(() => {
                    return done()
                })
        })

        mocha.it('Should change an user\'s cosmetics slots',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/123456/cosmetics')
                    .send({
                        headItem: 10046,
                        gloveItem: 30009,
                        sprayItem: 42009,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Check if the cosmetic slots were changed successfully',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/123456/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'ctItem',
                                'terItem',
                                'headItem',
                                'gloveItem',
                                'backItem',
                                'stepsItem',
                                'cardItem',
                                'sprayItem',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                ctItem: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                terItem: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                headItem: {
                                    type: 'number',
                                },
                                gloveItem: {
                                    type: 'number',
                                },
                                backItem: {
                                    type: 'number',
                                },
                                stepsItem: {
                                    type: 'number',
                                },
                                cardItem: {
                                    type: 'number',
                                },
                                sprayItem: {
                                    type: 'number',
                                },
                            },
                        })
                        chai.expect(res.body.headItem).equal(10046)
                        chai.expect(res.body.gloveItem).equal(30009)
                        chai.expect(res.body.sprayItem).equal(42009)
                        return done()
                    })
            })
        mocha.it('Should 400 when creating new user\'s cosmetics slots with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/bad/cosmetics')
                    .send({
                        headItem: 10046,
                        gloveItem: 30009,
                        sprayItem: 42009,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when changing an unexisting user\'s cosmetic slots',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/123456/cosmetics')
                    .send({
                        headItem: 10046,
                        gloveItem: 30009,
                        sprayItem: 42009,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/cosmetics')
                .then(() => {
                    return done()
                })
        })
    })

    mocha.describe('DELETE /inventory/:userId/cosmetics', (): void => {
        const firstOwner: number = 123456
        const secondOwner: number = 654321

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/' + firstOwner + '/cosmetics')
                .then(() => {
                    chai.request(serviceInstance.app)
                        .post('/inventory/' + secondOwner + '/cosmetics')
                        .then(() => {
                            return done()
                        })
                })

        })

        mocha.it('Should delete an user inventory',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/' + firstOwner + '/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Should 404 when getting the deleted inventory',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/404/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })
        mocha.it('Should 400 when deleting an inventory with a string as owner ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/bad/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when deleting a non existing inventory',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/404/cosmetics')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/' + secondOwner + '/cosmetics')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('POST /inventory/:userId/loadout', (): void => {
        mocha.it('Should create new loadouts for an user',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/123456/loadout')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(201)
                        res.body.should.be.jsonSchema({
                            type: 'array',
                            minItems: 3,
                            maxItems: 3,
                            uniqueItems: true,
                            items: {
                                type: 'object',
                                required: [
                                    'ownerId',
                                    'loadoutNum',
                                    'primary',
                                    'secondary',
                                    'melee',
                                    'hegrenade',
                                    'flash',
                                    'smoke',
                                ],
                                properties: {
                                    ownerId: {
                                        type: 'number',
                                        minimum: 1,
                                    },
                                    loadoutNum: {
                                        type: 'number',
                                        minimum: 0,
                                        maximum: 2,
                                    },
                                    primary: {
                                        type: 'number',
                                    },
                                    secondary: {
                                        type: 'number',
                                    },
                                    melee: {
                                        type: 'number',
                                    },
                                    hegrenade: {
                                        type: 'number',
                                    },
                                    flash: {
                                        type: 'number',
                                    },
                                    smoke: {
                                        type: 'number',
                                    },
                                },
                            },
                        })
                        return done()
                    })
            })
        mocha.it('Should 400 when creating new loadouts for an user with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/bad/loadout')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 409 when creating a loadouts while they already exist',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/123456/loadout')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(409)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/loadout')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('GET /inventory/:userId/loadout', (): void => {
        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/123456/loadout')
                .then(() => {
                    return done()
                })

        })

        mocha.it('Should get an user\'s loadout',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/123456/loadout')
                    .send({
                        loadoutNum: 0,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'loadoutNum',
                                'primary',
                                'secondary',
                                'melee',
                                'hegrenade',
                                'flash',
                                'smoke',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                loadoutNum: {
                                    type: 'number',
                                    minimum: 0,
                                    maximum: 2,
                                },
                                primary: {
                                    type: 'number',
                                },
                                secondary: {
                                    type: 'number',
                                },
                                melee: {
                                    type: 'number',
                                },
                                hegrenade: {
                                    type: 'number',
                                },
                                flash: {
                                    type: 'number',
                                },
                                smoke: {
                                    type: 'number',
                                },
                            },
                        })
                        return done()
                    })
            })
        mocha.it('Should 400 when getting an user\'s loadout with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/bad/loadout')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when getting an user\'s loadout with a non existing user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/404/loadout')
                    .send({
                        loadoutNum: 0,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/loadout')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('PUT /inventory/:userId/loadout', (): void => {
        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/123456/loadout')
                .then(() => {
                    return done()
                })
        })

        mocha.it('Should change an user\'s loadout',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/123456/loadout')
                    .send({
                        loadoutNum: 0,
                        primary: 52180,
                        hegrenade: 532468,
                        flash: 33214,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Check if the loadout was changed successfully',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/123456/loadout')
                    .send({
                        loadoutNum: 0,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'loadoutNum',
                                'primary',
                                'secondary',
                                'melee',
                                'hegrenade',
                                'flash',
                                'smoke',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'number',
                                    minimum: 1,
                                },
                                loadoutNum: {
                                    type: 'number',
                                    minimum: 0,
                                    maximum: 2,
                                },
                                primary: {
                                    type: 'number',
                                },
                                secondary: {
                                    type: 'number',
                                },
                                melee: {
                                    type: 'number',
                                },
                                hegrenade: {
                                    type: 'number',
                                },
                                flash: {
                                    type: 'number',
                                },
                                smoke: {
                                    type: 'number',
                                },
                            },
                        })
                        chai.expect(res.body.primary).equal(52180)
                        chai.expect(res.body.hegrenade).equal(532468)
                        chai.expect(res.body.flash).equal(33214)
                        return done()
                    })
            })
        mocha.it('Should 400 when changing a loadout with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/bad/loadout')
                    .send({
                        primary: 52180,
                        hegrenade: 532468,
                        flash: 33214,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 400 when changing a loadout with an invalid loadout slot',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/bad/loadout')
                    .send({
                        loadoutNum: 3,
                        primary: 52180,
                        hegrenade: 532468,
                        flash: 33214,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when changing an unexisting loadout cosmetic slots',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/456789/loadout')
                    .send({
                        loadoutNum: 0,
                        primary: 52180,
                        hegrenade: 532468,
                        flash: 33214,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/loadout')
                .then(() => {
                    return done()
                })
        })
    })

    mocha.describe('DELETE /inventory/:userId/loadout', (): void => {
        const firstOwner: number = 123456
        const secondOwner: number = 654321

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/' + firstOwner + '/loadout')
                .then(() => {
                    chai.request(serviceInstance.app)
                        .post('/inventory/' + secondOwner + '/loadout')
                        .then(() => {
                            return done()
                        })
                })

        })

        mocha.it('Should delete an user\'s loadouts',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/' + firstOwner + '/loadout')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Should 404 when getting a deleted loadout',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/404/loadout')
                    .send({
                        loadoutNum: 0,
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })
        mocha.it('Should 400 when deleting a loadouts with a string as owner ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/bad/loadout')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when deleting loadouts with a non existing owner ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/404/loadout')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/' + secondOwner + '/loadout')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('POST /inventory/:userId/buymenu', (): void => {
        mocha.it('Should create a new buymenu for an user',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/123456/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(201)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'pistols',
                                'shotguns',
                                'smgs',
                                'rifles',
                                'snipers',
                                'machineguns',
                                'melees',
                                'equipment',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'integer',
                                    minimum: 1,
                                },
                                pistols: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                shotguns: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                smgs: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                rifles: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                snipers: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                machineguns: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                melees: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                equipment: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                            },
                        })
                        return done()
                    })
            })
        mocha.it('Should 400 when creating a new buymenu for an user with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/bad/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 409 when creating a buymenu while it already exists',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .post('/inventory/123456/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(409)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/buymenu')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('GET /inventory/:userId/buymenu', (): void => {
        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/123456/buymenu')
                .then(() => {
                    return done()
                })

        })

        mocha.it('Should get an user\'s buy menu',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/123456/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'pistols',
                                'shotguns',
                                'smgs',
                                'rifles',
                                'snipers',
                                'machineguns',
                                'melees',
                                'equipment',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'integer',
                                    minimum: 1,
                                },
                                pistols: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                shotguns: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                smgs: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                rifles: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                snipers: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                machineguns: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                melees: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                equipment: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                            },
                        })
                        return done()
                    })
            })
        mocha.it('Should 400 when getting an user\'s buy menu with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/bad/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when getting an user\'s buy menu with a non existing user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/404/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/buymenu')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.describe('PUT /inventory/:userId/buymenu', (): void => {
        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/123456/buymenu')
                .then(() => {
                    return done()
                })
        })

        mocha.it('Should change an user\'s buy menu',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/123456/buymenu')
                    .send({
                        smgs: [
                            5251,
                            5295,
                            162,
                            5132,
                            5346,
                            5320,
                            5287,
                            5321,
                            5310,
                        ],
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Check if the buy menu was changed successfully',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/123456/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        res.body.should.be.jsonSchema({
                            type: 'object',
                            required: [
                                'ownerId',
                                'pistols',
                                'shotguns',
                                'smgs',
                                'rifles',
                                'snipers',
                                'machineguns',
                                'melees',
                                'equipment',
                            ],
                            properties: {
                                ownerId: {
                                    type: 'integer',
                                    minimum: 1,
                                },
                                pistols: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                shotguns: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                smgs: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                rifles: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                snipers: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                machineguns: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                melees: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                                equipment: {
                                    type: 'array',
                                    minItems: 9,
                                    maxItems: 9,
                                    items: {
                                        type: 'number',
                                    },
                                },
                            },
                        })
                        chai.expect(res.body.smgs).to.deep.equal([
                            5251,
                            5295,
                            162,
                            5132,
                            5346,
                            5320,
                            5287,
                            5321,
                            5310,
                        ])
                        return done()
                    })
            })
        mocha.it('Should 400 when changing a buy menu with an invalid user ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/bad/buymenu')
                    .send({
                        smgs: [
                            5251,
                            5295,
                            162,
                            5132,
                            5346,
                            5320,
                            5287,
                            5321,
                            5310,
                        ],
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when changing an non existing buy menu',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .put('/inventory/456789/buymenu')
                    .send({
                        smgs: [
                            5251,
                            5295,
                            162,
                            5132,
                            5346,
                            5320,
                            5287,
                            5321,
                            5310,
                        ],
                    })
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/123456/buymenu')
                .then(() => {
                    return done()
                })
        })
    })

    mocha.describe('DELETE /inventory/:userId/buymenu', (): void => {
        const firstOwner: number = 123456
        const secondOwner: number = 654321

        mocha.before((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .post('/inventory/' + firstOwner + '/buymenu')
                .then(() => {
                    chai.request(serviceInstance.app)
                        .post('/inventory/' + secondOwner + '/buymenu')
                        .then(() => {
                            return done()
                        })
                })

        })

        mocha.it('Should delete an user\'s buy menu',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/' + firstOwner + '/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(200)
                        return done()
                    })
            })
        mocha.it('Should 404 when getting a deleted buy menu',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .get('/inventory/404/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })
        mocha.it('Should 400 when deleting a buy menu with a string as the owner\'s ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/bad/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(400)
                        return done()
                    })
            })
        mocha.it('Should 404 when deleting a buy menu with a non existing owner ID',
            (done: mocha.Done): void => {
                chai.request(serviceInstance.app)
                    .delete('/inventory/404/buymenu')
                    .end((err: Error, res: superagent.Response): void => {
                        res.should.be.status(404)
                        return done()
                    })
            })

        mocha.after((done: mocha.Done): void => {
            chai.request(serviceInstance.app)
                .delete('/inventory/' + secondOwner + '/buymenu')
                .then(() => {
                    return done()
                })

        })
    })

    mocha.after((): void => {
        serviceInstance.stop()
    })
})
