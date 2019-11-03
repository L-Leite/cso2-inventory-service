import express from 'express'

/**
 * handles requests to /ping
 */
export class PingRoute {
  constructor(app: express.Express) {
    app.route('/ping')
      .get(this.onGetPing)
  }

  /**
   * called when a GET request to /ping is done
   * tells the requester that we are alive
   * returns 200
   * @param req the request data
   * @param res the response data
   */
  private async onGetPing(req: express.Request, res: express.Response): Promise<void> {
    return res.status(200).end()
  }
}
