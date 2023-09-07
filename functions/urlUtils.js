const { baseUrl } = require('../config.json')

const getTweetIdFromUrl = (url) => url.split('/').at(-1).split('?')[0]

const generateFixedUrl = (url) => {
  const twitterUrl = /twitter.com/gmi
  const xUrl = /x.com/gmi
  let fixedUrl = url.split('/')

  fixedUrl.splice(0, 2)
  fixedUrl = fixedUrl.join('/')

  if (twitterUrl.test(fixedUrl)) fixedUrl = fixedUrl.replace('twitter.com', baseUrl)
  else if (xUrl.test(fixedUrl)) fixedUrl = fixedUrl.replace('x.com', baseUrl)

  return fixedUrl
}

module.exports = {
  getTweetIdFromUrl,
  generateFixedUrl
}
