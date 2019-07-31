const url = require('url')
const saveToPng = require('../controller/safeToPng')

module.exports = [
  {
    path: '/generate-png',

    /**
     * @param {Request} request
     * @return {boolean}
     */
    condition (request) {
      const requestedUrl = request.reqUrl.query.url

      return Boolean(requestedUrl && url.parse(String(requestedUrl)))
    },

    /**
     * @param {Request} request
     * @param {module:http.ServerResponse} response
     * @return {Promise<void>}
     */
    async action (request, response) {
      const result = await saveToPng(request.reqUrl.query.url)

      if (!result) {
        response.writeHead(500)
        return response.end()
      }

      response.writeHead(201, {
        'Content-Type': 'image/png',
        'Content-Length': result.length,
      })

      response.end(result)
    },
  },
]
