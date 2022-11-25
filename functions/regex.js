const { vxBaseUrl } = require('../config.json')
const { isVideo } = require('./twitterUtils')
const regex = /https?:\/\/(.+?\.)?twitter\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)/igm

const hasTwitterLink = (message) => regex.test(message)

const getVxTwitterLink = async (message) => {
  const regexLink = new RegExp(regex)
  const resp = {
    message: message,
    video: 0
  }

  const match = message.match(regexLink)

  for (let i = 0; i < match.length; i++) {
    const link = match[i]
    const tweetId = link.split('/').at(-1).split('?')[0]
    const containsVideo = await isVideo(tweetId).catch(console.error)

    if (containsVideo) {
      let recomposedUrl = link.split('/')
      recomposedUrl.splice(0, 2)
      recomposedUrl = recomposedUrl.join('/')
      recomposedUrl = recomposedUrl.replace('twitter.com', vxBaseUrl)

      resp.message = resp.message.replace(link, recomposedUrl)
      resp.video += 1
    }
  }

  return resp
}

module.exports = {
  hasTwitterLink,
  getVxTwitterLink
}