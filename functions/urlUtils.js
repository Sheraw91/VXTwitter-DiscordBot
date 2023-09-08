const { baseUrl } = require('../config.json')

const getTweetIdFromUrl = (url) => url.split('/').at(-1).split('?')[0]

const generateFixedUrl = (url) => {
  let fixedUrl = `${baseUrl}${url}`
  return fixedUrl
}

module.exports = {
  getTweetIdFromUrl,
  generateFixedUrl
}
