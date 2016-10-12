---
layout: post
comments: true
title:  "Twitter sentiment analysis for the first 2016 presidential debate"
date:   2016-10-09 2:58:35
categories: python, machine learning, natural language processing
tags:
- python
- machine learning
- natural language processing
---

# Twitter sentiment analysis for the first 2016 presidential debate

The first presidential debate between Hillary Clinton and Donald Trump has recently concluded. As a political junkie, I was curious to know what the general consensus was among the community of Twitter. In this post, I'll briefly describe my method for capturing live tweets during the debate, processing the sentiment of each tweet, and plotting the corresponding sentiment in real time. The result looks something like this: 

![](http://imgur.com/aEyDPGm.gif)

All of the code for this project can be found at the following Github repo: https://github.com/vprusso/twitter_sentiment_debate

### Tools Used:

1. **Twitter Streaming API and Tweepy Python library**: To stream tweets live during debate.
2. **Google Cloud Natural Language API**: To analyze the sentiment of the tweets in real-time.
3. **Matplotlib and Python**: To plot sentiment as it is processed and analyzed. 

Let's take a brief look at each of these pieces. 

**Twitter Streaming API and Tweepy Python library**

To use the Twitter Streaming API, head over to https://apps.twitter.com/, create an app by following the instructions here https://dev.twitter.com/streaming/overview. Once your app is created, you should have ``Access Token``, ``Access Token Secret Key``, ``Consumer Key``, and ``Consumer Secret``. I've went ahead and stored these as variables in ``config.py`` (which I won't post here, since the keys are meant to be kept secret). Now, let's take a look at the code:


```python
#Import the necessary methods from tweepy library
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream

import config

# # # # TWITTER STREAMER # # # #
class TwitterStreamer():
    """
    Class for streaming and processing live tweets.
    """


    def __init__(self):
        pass


    def stream_tweets(self, fetched_tweets_filename, hash_tag_list):
        #This handles Twitter authetification and the connection to Twitter Streaming API
        l = StdOutListener(fetched_tweets_filename)
        auth = OAuthHandler(config.TWITTER_CONSUMER_KEY, config.TWITTER_CONSUMER_SECRET)
        auth.set_access_token(config.TWITTER_ACCESS_TOKEN, config.TWITTER_ACCESS_TOKEN_SECRET)
        stream = Stream(auth, l)

        #This line filter Twitter Streams to capture data by the keywords: 
        stream.filter(track=hash_tag_list)



# # # # TWITTER STREAM LISTENER # # # #
class StdOutListener(StreamListener):
    """
    This is a basic listener that just prints received tweets to stdout.
    """

    def __init__(self, fetched_tweets_filename):
        self.fetched_tweets_filename = fetched_tweets_filename
        self.sa = SentimentAnalyzer()


    def on_data(self, data):
        tweet = data.split(',"text":"')[1].split('","source')[0]
        if not tweet.startswith('RT'):
            polarity, magnitude = self.sa.analyze_tweet_sentiment(tweet)
            tweet_and_sentiment = tweet +',' + "POLARITY::" + str(polarity) + "," + \
                                  "MAGNITUDE::" + str(magnitude) + '\n'            
            print(tweet_and_sentiment)
            print("\n")
            with open(fetched_tweets_filename,'a') as tf:
                tf.write(tweet_and_sentiment)
        return True


    def on_error(self, status):
        print(status)
```

The first ``TwitterStreamer`` class is a fairly basic setup that gets all of the authorization content we need from the previously mentioned ``config.py`` file. The ``SdtOutListener`` class fetches the tweet, and in the ``on_data`` function, calls a function we have yet to define (``analyze_tweet_sentiment``) that analyzes the tweet sentiment. Note that I'm also filtering out all the retweets from the stream by ignoring any tweets that start with "RT". Now, let's take a look at the sentiment analyzer function, and what we need to run that which takes us to the next component:

**Google Cloud Natural Language API**

We're going to utilize Google Cloud's NLP API on each tweet that we obtain from our Twitter stream. Go through the steps to sign up with the NLP service: https://cloud.google.com/natural-language/ 

Note that you will have to enable the billing feature, and there will be a cost associated with analyzing tweets that go beyond a couple thousand. It's a good idea to set a spending limit before running any big jobs so that the service kills itself if it goes over quote. Unfortunately, by default, the spending limit is unlimited, so you could rack up a hefty fee if you let this going for a while. Word to the wise!

Anyway, now we're going to take a look at the function for ``analyze_tweet_sentiment`` from the previous section. Basically, we take in a tweet as text and run it through the Google NLP processing tool to analyze the sentiment of the tweet.


```python
from googleapiclient import discovery
from oauth2client.client import GoogleCredentials

# Import general libraries 
import urllib 
import httplib2
import json

# Import other python files
import config

DISCOVERY_URL = ('https://{api}.googleapis.com/'
                 '$discovery/rest?version={apiVersion}')

# # # # SENTIMENT ANALYZER # # # #
class SentimentAnalyzer():
    """
    Uses the Google Cloud Natural Language Processing Tool to 
    analyze the sentiment of tweets. 
    """
    def __init__(self):
        pass

    def analyze_tweet_sentiment(self, tweet):
        http = httplib2.Http()

        credentials = GoogleCredentials.get_application_default().create_scoped(['https://www.googleapis.com/auth/cloud-platform'])
        http=httplib2.Http()
        credentials.authorize(http)

        service = discovery.build('language', 'v1beta1',
                                http=http, discoveryServiceUrl=DISCOVERY_URL)

        service_request = service.documents().analyzeSentiment(
            body={
            'document': {
                'type': 'PLAIN_TEXT',
                'content': tweet,
                }
            })

        response = service_request.execute()
        polarity = response['documentSentiment']['polarity']
        magnitude = response['documentSentiment']['magnitude']
        return polarity, magnitude

```

The outcome of running this on each tweet will give a ``polarity`` (a value between [-1,1] that represents either how negative or positive the tweet is) and a ``magnitude``, basically how confident the NLP engine is at the tweet being thatn negative or positive. 

**Matplotlib and Python**

For this section, I have to give a shout out to Sentdex over on YouTube who has some fabulous videos on everything Python with a focus on machine learning, NLP, data viz, and much more (https://www.youtube.com/channel/UCfzlCWGWYyIQ0aLC5w48gBQ). Specifically the inspiration for this part comes from the following video: https://www.youtube.com/watch?v=ojDHK1SmCHA. The following code is lifted quite heavily from the previous video and is responsible for actually plotting the sentiment.


```python
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from matplotlib import style 
import time 

style.use("ggplot")

fig = plt.figure()
fig.canvas.set_window_title('Clinton tweet sentiment')

plt.title('Clinton tweet sentiment')
plt.suptitle('Clinton tweet sentiment')
plt.xlabel('Number of tweets')
plt.ylabel('Sentiment polarity')
ax1 = fig.add_subplot(1,1,1)

def find_between( s, first, last ):
    try:
        start = s.index( first ) + len( first )
        end = s.index( last, start )
        return s[start:end]
    except ValueError:
        return ""

def animate(i):
    pull_data = open("clinton_tweets.txt", "r").read()
    lines = pull_data.split("\n")

    xar = []
    yar = []

    x = 0
    y = 0

    for l in lines:
        x += 1    
        try:
            y += float(find_between(l, "POLARITY::", ","))
        except:
            y += 0
        xar.append(x)
        yar.append(y)

    ax1.clear()

    ax1.set_xlabel('Number of Tweets')
    ax1.set_ylabel('Tweet Sentiment')
    ax1.plot(xar,yar,color='b')

ani = animation.FuncAnimation(fig, animate, interval = 1000)
plt.show()
```

And that's pretty much the extent of it. Leveraging the power of Google's NLP API and the Tweepy API really makes this all quite easy to do. As mentioned before, all of the code is provided on the following repo: https://github.com/vprusso/twitter_sentiment_debate. Make sure that you put in your own access tokens for both the Google and Twitter APIs in the ``config.py`` file, and you should be ready to go! 

{% if page.comments %}
<div id="disqus_thread"></div>
<script>
    /**
     *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
     *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
     */
    /*
    var disqus_config = function () {
        this.page.url = http://vprusso.github.io/blog/2015/welcome-to-jekyll/;  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    */
    (function() {  // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        
        s.src = '//vprusso.disqus.com/embed.js';
        
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>
{% endif %}

