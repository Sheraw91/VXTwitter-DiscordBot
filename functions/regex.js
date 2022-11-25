const { generateFixedUrl } = require('./urlUtils')
const { analyzeTweet, isVideo, isQuotingVideo } = require('./twitterUtils')
const regex = /https?:\/\/twitter\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)/img

const hasTwitterLink = (message) => {
  const regexLink = new RegExp(regex)
  return regexLink.test(message)
}

const getVxTwitterLink = async (message) => {
  const regexLink = new RegExp(regex)
  const resp = {
    message: message,
    video: 0
  }

  const links = message.match(regexLink)

  for (const link of links) {
    const tweetId = link.split('/').at(-1).split('?')[0]
    const analyzedTweet = await analyzeTweet(tweetId)

    const containsVideo = await isVideo(analyzedTweet)
    if (containsVideo) {
      resp.message = resp.message.replace(link, generateFixedUrl(link))
      resp.video += 1
    } else {
      // Check that the tweet is not quoting a tweet with video
      if (await isQuotingVideo(analyzedTweet)) {
        resp.message = resp.message.replace(link, generateFixedUrl(link))
        resp.video += 1
      }
    }
  }

  return resp
}

module.exports = {
  hasTwitterLink,
  getVxTwitterLink
}