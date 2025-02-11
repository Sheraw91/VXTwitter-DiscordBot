const { generateFixedUrl } = require("./urlUtils");
// const { analyzeTweet, isVideo, isQuotingVideo } = require("./twitterUtils");
const axios = require("axios");
const regex =
  /https?:\/\/(twitter|x)\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)/gim;

const hasTwitterLink = (message) => {
  const regexLink = new RegExp(regex);
  return regexLink.test(message);
};

const getVxTwitterLink = async (message) => {
  const regexLink = new RegExp(regex);
  const resp = {
    message: message,
    video: 0,
  };

  const links = message.match(regexLink);

  for (const link of links) {
    const result = new RegExp(regex).exec(link);
    const url = result[2];

    /* NO API */
    // Getting url after hostname
    // resp.message = resp.message.replace(link, generateFixedUrl(url));
    // resp.video += 1;

    /* TWITTER API - NOT FREE ANYMORE */
    // const tweetId = link.split("/").at(-1).split("?")[0];
    // const analyzedTweet = await analyzeTweet(tweetId);
    // resp.message = resp.message.replace(link, generateFixedUrl(link));
    // const containsVideo = await isVideo(analyzedTweet);
    // if (containsVideo) {
    //   resp.message = resp.message.replace(link, generateFixedUrl(link));
    //   resp.video += 1;
    // } else {
    //   // Check that the tweet is not quoting a tweet with video
    //   if (await isQuotingVideo(analyzedTweet)) {
    //     resp.message = resp.message.replace(link, generateFixedUrl(link));
    //     resp.video += 1;
    //   }
    // }

    /* VXTWITTER API - FREE */
    const tweetId = link.split("/").at(-1).split("?")[0];
    const vxtwitter = await axios
      .get(`https://api.vxtwitter.com/Twitter/status/${tweetId}`)
      .then((resp) => resp.data)
      .catch(console.error);
    if (vxtwitter.hasMedia) {
      resp.message = resp.message.replace(link, generateFixedUrl(url));
      resp.video += 1;
    } else if (vxtwitter.qrt) {
      resp.message = resp.message.replace(link, generateFixedUrl(url));
      resp.video += 1;
    }
  }

  return resp;
};

module.exports = {
  hasTwitterLink,
  getVxTwitterLink,
};
