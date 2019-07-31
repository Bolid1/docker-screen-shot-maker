const url = require('url')
const router = require('./routes')

let reqNumber = 0

/**
 * @typedef {object} Request
 * @property {module:http.IncomingMessage} request
 * @property {module:url.Url} reqUrl
 */

/**
 * @param {Request} request
 * @param {module:http.ServerResponse} response
 * @return {Promise<void>}
 */
const action404 = async (request, response) => {
  response.writeHead(404)
  response.end()
}

/**
 * @param {module:http.IncomingMessage} req
 * @param {module:http.ServerResponse} response
 */
const app = async (req, response) => {
  const number = ++reqNumber
  const reqUrl = url.parse(req.url, true)
  const request = {request: req, reqUrl}

  process.stdout.write(`Request#${number} for "${reqUrl.path}"\n`)

  const route = router.find(
    /**
     * @param {string} path
     * @param {function(request: Request): boolean} condition
     */
    ({path, condition}) => {
      if (reqUrl.pathname !== path) {
        return false
      }

      if (!condition) {
        return false
      }

      return condition(request)
    }
  )

  /**
   * @type {function(request: Request, response: module:http.ServerResponse): Promise<void>}
   */
  const action = (route && route.action) || action404

  await action(request, response)

  process.stdout.write(`Request#${number} ends with status "${response.statusCode}"\n`)
}

module.exports = app
