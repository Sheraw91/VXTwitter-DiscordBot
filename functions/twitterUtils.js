const axios = require('axios')
require('dotenv').config()
const { getTweetIdFromUrl } = require('./urlUtils')

const analyzeTweet = async (tweetId) => axios
  .get(`https://api.twitter.com/2/tweets/${tweetId}?expansions=attachments.media_keys&tweet.fields=entities`, {
    headers: {
      authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
    }
  })
  .then((resp) => resp.data)
  .catch(console.error)

const isVideo = async (analyzedTweet) => analyzedTweet?.includes?.media[0].type?.normalize() === 'video'

const isQuotingVideo = async (analyzedTweet) => {
  const links = analyzedTweet.data?.entities?.urls

  if (links == undefined) return false

  for (const link of links) {
    const tweetId = getTweetIdFromUrl(link.expanded_url)
    const analyzedQuotedTweet = await analyzeTweet(tweetId)
    if (await isVideo(analyzedQuotedTweet)) return true
  }
  return false
}

module.exports = {
  analyzeTweet,
  isVideo,
  isQuotingVideo
}

