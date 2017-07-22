---
layout: post
comments: true
title:  "New Android App: Lights Out Game"
date:   2017-07-20 1:58:35
cover_image: http://i.imgur.com/9u7xAUh.png
excerpt: A quick post to describe my recent Android application release of Lights Out.
categories: Android, Java, software, lights out, programming
tags:
- android
- java
- software
- lights out
- programming
---

I recently uploaded <a href="https://play.google.com/store/apps/details?id=com.lightsout.captainhampton.lightsout">Lights Out!"</a> : a simple Android application that is inspired by the <a href="https://en.wikipedia.org/wiki/Lights_Out_(game)">Lights Out!" game by Tiger Electronics</a>. 

I have another blog post (<a href="http://vprusso.github.io/blog/2017/the-mathematics-of-lights-out/">"The Mathematics of Lights Out"</a>) that describes the mathematics behind the game logic as well as a simple interactive Javascript implementation of the game.

Here are a couple screen shots of the Android application. More information can be found on the <a href="">Lights Out link for the Google PlayStore</a>. 

<tr>
	<td> 
		<center>
			<figure>
				<img src="http://i.imgur.com/ugXO6Dm.png" alt="Lights Out main screen." style="width: 250px;"/> 
				<figcaption>Title screen of application.</figcaption>
			</figure>
		</center>
	</td>
</tr>

Here are a few screen shots showcasing the functionality of the app. The user can select a board size of 3x3, 4x4, 5x5, or 6x6.
<center>
	<figure>
		<tr>
			<td> 
				<img src="http://i.imgur.com/NrdGk2N.png" alt="Lights Out level select" style="width: 250px;"/> 
				<figcaption>Select level dimension.</figcaption>
			</td>
		</tr>
	</figure>
</center>

Once a dimension is selected, the levels for the respective dimension may be selected. Here are examples for 3x3, 4x4, and 5x5. 
<tr>
	<td> 
		<img src="http://i.imgur.com/BciAY1m.png" alt="Lights Out 3x3 level listing." style="width: 225px;"/> 
		<img src="http://i.imgur.com/gxNfZt6.png" alt="Lights Out 4x4 level listing." style="width: 225px;"/> 
		<img src="http://i.imgur.com/UYMXmPz.png" alt="Lights Out 5x5 level listing." style="width: 225px;"/> 
	</td>
</tr>

Selecting a level will open up the game board. Here is an example of a 6x6 level. 
<center>
	<figure>
		<tr>
			<td> 
				<img src="http://i.imgur.com/SAQMiMS.png" alt="Lights Out 6x6 level." style="width: 250px;"/> 
				<figcaption>Lights Out 6x6 level.</figcaption>
			</td>
		</tr>
	</figure>
</center>

If stuck, the user may request a hint or to outright solve the configuration Pressing the "solve" button will solve the configuration and give the user a process to follow to solve the given board. This is shown below. 
<center>
	<figure>
		<tr>
			<td> 
				<img src="http://i.imgur.com/MlESFOY.png" alt="Lights Out 6x6 solved level." style="width: 250px;"/> 
				<figcaption>Lights Out 6x6 level solved.</figcaption>
			</td>
		</tr>
	</figure>
</center>

And to top it off, here's a quick video showcasing the functionality of the app:

<div style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/wMtlzL8zQvc" frameborder="0" allowfullscreen></iframe>
</div>


If you have an Android device, feel free to download the app and give it a try! If you have any improvements, suggestions, or crash reports, please let me know in the comments section! Again, you can download the app at the <a href="https://play.google.com/store/apps/details?id=com.lightsout.captainhampton.lightsout">Google Play Store</a>.

The most interesting part of this project was coding up the Lights Out solver. The Lights Out game board can be viewed as a matrix, where each entry is either "on" or "off". This can be thought of as a binary matrix, or a matrix consisting of ones and zeros. Solving a Lights Out board really just boils down to solving a system of linear equations mod 2. Given an arbitrary configuration, you want to make sure that the given configuration is solvable. Furthermore, to provide hints to the user, the algorithm needs to solve the current configuration to give hints on where to move. It's also possible to give the user a Lights Out game board that is impossible to solve (which wouldn't be very fun for the player!).

I made use of the <a href="http://ejml.org">Efficient Java Matrix Library (EJML)</a> in Java to perform some linear algebraic calculations, but I also had to code up a lot of routines by hand as they were not provided by the library. It turned out to be a fun and rewarding process! 

I also want to acknowledge <a href="https://github.com/ersin-ertan">Ersin Ertan</a> for working on an early version of this project with me. He has an <a href="https://www.udemy.com/android-studio/">excellent course on Android Studio</a> that I definitely recommend if you're looking to start developing Android apps. Furthermore, if you're an Android developer and want to check out the project, I've open sourced the whole thing, and it can be cloned at the <a href="https://github.com/vprusso/lights_out">lights_out Github repository</a>.   

