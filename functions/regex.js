const twitterGetUrl = require('twitter-url-direct')
const { vxBaseUrl } = require('../config.json')
const regex = /https?:\/\/(.+?\.)?twitter\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)/igm

const hasTwitterLink = (message) => regex.test(message)

const isVideo = async (twitterLink) => {
  const resp = await twitterGetUrl(twitterLink.split('?')[0]).catch(console.error)

  return resp.type.normalize() === 'video/gif'
}

const getVxTwitterLink = async (message) => {
  const regexLink = new RegExp(regex)
  let newMessage = message
  let video = 0

  while ((m = regexLink.exec(message)) !== null) {
    if (m.index === regexLink.lastIndex) regexLink.lastIndex++

    if (await isVideo(m[0])) {
      newMessage = newMessage.replace(m[0], `${vxBaseUrl}${m[2]}`)
      video += 1
    }
  }

  return {
    message: newMessage,
    video: video
  }
}

module.exports = {
  hasTwitterLink,
  getVxTwitterLink
}