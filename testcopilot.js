// Read last twitter tops using hashtag twitter
function twitterWithHashtag(hashTagName) {
  var twitter = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: '',
  });
  var twitter_top_hashtag = twitter.get('statuses/filter', {
    track: hashTagName,
  });
  twitter_top_hashtag.on('data', function (data) {
    console.log(data); //?
  });
  twitter_top_hashtag.on('error', function (error) {
    console.log(error);
  });
}

twitterWithHashtag('#SosCuba');
