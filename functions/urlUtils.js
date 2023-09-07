const { baseUrl } = require('../config.json')

const getTweetIdFromUrl = (url) => url.split('/').at(-1).split('?')[0]

const generateFixedUrl = (url, hostname) => {
  let fixedUrl = url.split('/')

  fixedUrl.splice(0, 2)
  fixedUrl = fixedUrl.join('/')
  fixedUrl = fixedUrl.replace(hostname, baseUrl)

  return fixedUrl
}

module.exports = {
  getTweetIdFromUrl,
  generateFixedUrl
}
