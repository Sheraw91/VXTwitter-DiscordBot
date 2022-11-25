const axios = require('axios')
require('dotenv').config()

const isVideo = async (tweetId) => axios
  .get(`https://api.twitter.com/2/tweets/${tweetId}?expansions=attachments.media_keys`, {
    headers: {
      authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
    }
  })
  .then((resp) => resp.data?.includes?.media[0].type?.normalize() === 'video')
  .catch(console.error)

module.exports = {
  isVideo
}