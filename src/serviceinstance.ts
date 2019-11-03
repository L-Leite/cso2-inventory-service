import bodyParser from 'body-parser'
import express from 'express'
import helmet from 'helmet'
import http from 'http'
import mongoose from 'mongoose'
import morgan from 'morgan'

import { LogInstance } from 'log/loginstance'
import { MorganToWinstonStream } from 'log/morgan2winston'

import { DefaultInventory } from 'entities/defaultinventory'
import { InventoryRoute } from 'routes/inventory'

/**
 * the service's entrypoint
 */
export class ServiceInstance {

  /**
   * check if the required environment variables are set on start
   * throws an error if one is missing
   */
  private static checkEnvVars(): void {
    if (process.env.INVENTORY_PORT == null) {
      throw new Error('INVENTORY_PORT environment variable is not set.')
    }

    if (process.env.DB_HOST == null) {
      throw new Error('DB_HOST environment variable is not set.')
    }

    if (process.env.DB_PORT == null) {
      throw new Error('DB_PORT environment variable is not set.')
    }

    if (process.env.DB_NAME == null) {
      throw new Error('DB_NAME environment variable is not set.')
    }
  }

  public app: express.Express
  private server: http.Server

  constructor() {
    ServiceInstance.checkEnvVars()

    this.app = express()

    this.applyConfigs()
    this.setupRoutes()

    this.app.set('port', process.env.INVENTORY_PORT)
  }

  /**
   * start the service
   */
  public async listen(): Promise<void> {
    await this.setupDb()

    this.server = this.app.listen(this.app.get('port'))
    LogInstance.info('Started inventory service')
    LogInstance.info('Listening at ' + this.app.get('port'))
  }

  /**
   * stop the service instance
   */
  public async stop(): Promise<void> {
    this.server.close()
    await mongoose.disconnect()
  }

  /**
   * setup the database connection
   */
  private async setupDb(): Promise<void> {
    const dbUri: string = 'mongodb://' + process.env.DB_HOST
      + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME

    // create a mongo connection
    await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    LogInstance.info('Connected to ' + dbUri + ' db sucessfully')

    // create a document with the default inventory if needed
    await DefaultInventory.initialize()
  }

  /**
   * apply configurations to the service
   */
  private applyConfigs(): void {
    // set the log format according to the current environment
    const morganLogFormat: string = this.isDevEnv() ? 'dev' : 'common'

    // use morgan as middleware, and pass the logs to winston
    this.app.use(
      morgan(morganLogFormat, { stream: new MorganToWinstonStream() }),
    )

    // parse json
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))

    // setup helmet
    this.app.use(helmet({ frameguard: false }))
  }

  /**
   * setup the service's API routes
   */
  private setupRoutes(): void {
    const inventory: InventoryRoute = new InventoryRoute(this.app)
  }

  /**
   * are we in a development environment?
   * @returns true if so, false if not
   */
  private isDevEnv(): boolean {
    return process.env.NODE_ENV === 'development'
  }
}
