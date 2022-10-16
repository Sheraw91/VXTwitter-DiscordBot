const twitterGetUrl = require("twitter-url-direct")

checkLinkIfVideo = (message) => {
	console.log('checkvideo');
	const containsVideo = twitterGetUrl(message)
		.then((response) => {
			if (response.type == 'video/gif') return true
		})
		.catch(console.error)
	return containsVideo
}

module.exports = {
	checkLinkIfVideo
}