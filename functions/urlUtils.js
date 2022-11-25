const { baseUrl } = require('../config.json')

const getTweetIdFromUrl = (url) => url.split('/').at(-1).split('?')[0]

const generateFixedUrl = (url) => {
  let fixedUrl = url.split('/')
  fixedUrl.splice(0, 2)
  fixedUrl = fixedUrl.join('/')
  fixedUrl = fixedUrl.replace('twitter.com', baseUrl)
  return fixedUrl
}

module.exports = {
  getTweetIdFromUrl,
  generateFixedUrl
}