---
layout: post
comments: true
title:  "An Android App for Distinguishing Clouds from Contrails Using Machine Learning"
date:   2016-10-20 1:58:35
categories: Android, machine learning, Java
excerpt: Adventures in training an image classifier to determine clouds from contrails.
tags:
- Android
- machine learning
- Java
---

<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- personal_blog -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7213376997288299"
     data-ad-slot="4540332365"
     data-ad-format="auto"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-59145213-1', 'auto');
  ga('send', 'pageview');

</script>

## The problem: Cloud or contrail?

Consider these two pictures:
<div style="text-align:center">
	<img src="http://imgur.com/1IOVTQD.jpg" width="300">
	<img src="http://imgur.com/dnEbOGH.jpg" width="300">
</div>

The one on the left is a cloud, and the other is a contrail. Contrails are clouds formed when water vapor condenses and freezes around small particles that exist in aircraft exhaust. 

Can we build an application that will be able to distinguish between these two things? Furthermore, can we determine the aircraft that was most likely responsible for creating the contrail in question? The images above are ideal cases (the skies are clear and the differences are stark), but just take a less clear example like this:

<div style="text-align:center">
<img src="http://imgur.com/3YR162z.jpg" width="300">
</div>

Are there contrails in this figure? Furthermore, when were they created and by what aircraft?

## The motivation: Climate change

Every day, more than **three million** people take part in commercial air travel. 

<div style="text-align:center">
<img src="http://imgur.com/d4sxjGC.jpg" width="450">
</div>

Given the right environmental conditions, these aircraft can produce stark features against the background sky. These contrails are comprised of different constituents than ordinary cirrus clouds, but may eventually disperse and contribute to the atmospheric amalgam. It is important to know if and where this occurs as the affect on weather patterns as well as climate change cannot be neglected.

The overall goal of this is to provide a tool to climate scientists to study to what degree contrails negatively impact the environment. 

## The solution:

The solution to this problem was a team effort as part of the [NASA SpaceApps Challenge](https://2016.spaceappschallenge.org/ "NASA SpaceApps Challenge") hosted by [SkyWatch](http://www.skywatch.co/ "SkyWatch"). Our solution and team are listed [here](https://2016.spaceappschallenge.org/challenges/aero/clouds-or-contrails/projects/hot-on-the-contrail "Hot on the Contrail"). 

Here's a breakdown of our approach:

<div style="text-align:center">
<img src="http://imgur.com/4U1SgvQ.jpg" width="700">
</div>

1. **Capture:** User takes a picture from their smart phone of the sky.
2. **Upload:** This image and location of the user is uploaded to a server.
3. **Process:** The image is processed against our machine learning model to determine the probability of it being either a cloud or a contrail. 
4. **Determine:** The probability is sent back to the user, and if it is a contrail, a list of flights potentially responsible for the contrail are provided. 

Here is a video showing how one can use the app. In the video, we take a snapshot of the sky, upload our image that we took, and get a score that determines how likely the image is a contrail. In this case, we took a picture of a cloud, and the app returns the expected response of 0% for probability of contrail. The last seconds of the video show the flights in the area that have recently passed overhead. 

<div style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/ziAC2fSxHjE" frameborder="0" allowfullscreen></iframe>
</div>

## Gathering data to train our model

We want to train our model to be able to distinguish the difference between a cloud or contrail. In order to pull this off, we'll want to gather a ton of pictures of clouds and a ton of pictures of contrails. We'll then train our model on this data and give it a picture that it's never seen before, which it must determine based on what it has learned. 

There's a couple options for how to go about doing this, but the one we chose was to scrape images searched via the Bing search engine. One reason for selecting Bing is that Google image search tends to limit the amount that we can search and extract. I forked the Github repo [here](https://github.com/gadelat/Bulk-Bing-Image-downloader) and tweaked it [here](https://github.com/gadelat/Bulk-Bing-Image-downloader "bing_downloader") to give us precisely what we need. We just pop in the search terms we are looking for, and away it goes! 

After running this, we had two folders. One labelled "clouds" and the other labelled "contrails". In each folder were millions of images of either object. If you don't want to wait to download the images, you can simply download the zip files hosted on my repo [here](https://github.com/vprusso/spaceapps_clouds_or_contrails/tree/master/watson_image_classification) Now that we've got our data, onto training our model. 

## Training the model

Okay, we have our training data. Now we're going to make use of [IBM's Watson Visual Recognition](http://www.ibm.com/watson/developercloud/visual-recognition.html) service to create a cloud / contrail classifier. We will then use this classifier on an image it hasn't seen before to see if it's able to determine whether or not it's a cloud or contrail. The source for our classifier can be found on my repo [here](https://github.com/vprusso/spaceapps_clouds_or_contrails/tree/master/watson_image_classification). 

The main driving component of training and using our classifier will be two Javascript files. The first queries the Watson service and creates a classifier based on our data. The following Javascript file does just that, where the ```positive_examples``` variable is trained on the contrail images we previously acquired, and the ```negative_examples``` variable is trained on the cloud image we acquired. 

```javascript
/*
create_classifier.js:
   Connect to Watson application and upload two zipped folders
   labelled as ``clouds`` and ``contrails``. Each folder consists
   of images of either clouds or contrails scaled to 320 x 320 
   pixels.
*/ 
var watson = require('watson-developer-cloud');
var fs = require('fs');

var visual_recognition = watson.visual_recognition({
  username: 'XXX',
  password: 'XXX',
  version: 'v2-beta',
  version_date: '2015-12-02'
});

var params = {
	name: 'contrails_classifier',
	positive_examples: fs.createReadStream('./contrails.zip'),
	negative_examples: fs.createReadStream('./clouds.zip')
};

visual_recognition.createClassifier(params, 
	function(err, response) {
   	 if (err)
      		console.log(err);
    	 else
   		console.log(JSON.stringify(response, null, 2));
});
```

Okay, running this script will output a .json file, which will correspond to our classifier. Once we have that, we can use another Javascript file to use our recently created classifier and an image that is not in the training set.

```javascript
/*
classify_image.js: 
   Connect to the Bluemix interface to classify a test image
   against a classifier trained from ``create_classifier``. 
   contrails_classifier_1232401869
*/
var watson = require('watson-developer-cloud');
var fs = require('fs');

var visual_recognition = watson.visual_recognition({
  username: '1c6ece7f-9e3f-4aa9-88f6-ac96a639bb03',
  password: 'YLI1qiyefpTb',
  version: 'v2-beta',
  version_date: '2015-12-02'
});

var params = {
	images_file: fs.createReadStream('./contrail_clip.jpg'),
	classifier_ids: fs.readFileSync('./classifierlist.json')
};

visual_recognition.classify(params, 
	function(err, response) {
   	 if (err)
      		console.log(err);
    	 else
   		console.log(JSON.stringify(response, null, 2));
});
```

Note the name of the classifier is ```classifierlist.json``` and the image we selected in some image labelled by ```contrail_clip.jpg```, which was an image of a contrail that was not in our training set. And that's it! We have our classifier.

## Building an Android app to query our model

The functionality of the Android app is simple:

1. Determine user's location
2. Upload image and coordinates to server.
3. Receive flight information based on coordinates and output from machine learning algorithm. 

Determining the user's location is pretty standard stuff, and there's a boat load of tutorial material for that floating around on the web. For uploading the image and coordinates to a server, I followed the tutorial found on [Tonikami TV](https://www.youtube.com/watch?v=e8x-nu9-_BM&list=PLe60o7ed8E-Q7tqKNPnWFdUoeniqH_-A9) pretty closely and ended up using the same hosting service of [web000](https://www.000webhost.com/).

If you're interested in a stripped down Android app that just allows you to obtain the user's coordinates and upload an image to a server, you can check out my Github repository [here](https://github.com/vprusso/android_location_photo_upload). 

## Checking flight paths

For tracking the flights that have passed overhead based on the user's coordinates, we decided to go with the [here](http://www.flightstats.com/go/Home/home.do "Flight Stats API"). The nice thing about this interface is that you can find all of the flights within a given radius based on a set of latitude / longitude coordinates. 

If you do use this service, you'll have to sign up, but it is free. Our script for querying this API service is found on my Github repo [here](https://github.com/vprusso/spaceapps_clouds_or_contrails/tree/master/flight_data)


## Wrapping up:

Here's a screenshot of our app. On the left, we have an image of a cloud, which the app correctly determines to not be a contrail. On the right, the app is able to determine that the image does contain a contrail with a probability of 98%. What's quite impressive about this is that not only is the quality of the image poor, but there's part of a tree in the image as well. Thankfully the machine learning poriton is able to suss that out and determine the presence of the contrail!

<div style="text-align:center">
<img src="http://imgur.com/FofszZq.jpg" width="700">
</div>

Working on this project was a lot of fun, and a great deal of thanks is due to [SkyWatch](http://www.skywatch.co/ "SkyWatch") for hosting this event and providing an excellent team of support throughout. I also want to give a great deal of thanks to [Ersin Ertan](https://github.com/ersin-ertan) for enhancing this project and adding his Android expertise!
