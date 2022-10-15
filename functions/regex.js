const { vxBaseUrl } = require('../config.json')
const regex = /https?:\/\/(.+?\.)?twitter\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)/igm

const hasTwitterLink = (message) => regex.test(message)

const getVxTwitterLink = (message) => {
  const regexLink = new RegExp(regex)
  let newMessage = message

  while ((m = regexLink.exec(message)) !== null) {
    if (m.index === regexLink.lastIndex) regexLink.lastIndex++
    newMessage.replace(m[0], `${vxBaseUrl}${m[2]}`)
  }

  return newMessage
}

module.exports = {
  hasTwitterLink,
  getVxTwitterLink
}