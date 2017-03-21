---
layout: post
comments: true
cover_image: http://i.imgur.com/1YZ69YS.jpg?2
title:  "The Most Metal Guitar Tuning"
date:   2017-03-19 1:58:35
categories: Data Science, Math, Metal, Guitar, R
tags:
- data science
- math
- metal
- guitar
- R
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

Today we'll be answering the age-old question: **"What is the most metal guitar tuning?"** 

<p align="center">
    <center>
        <figure>
            <img src="http://i.imgur.com/1YZ69YS.jpg?2" alt="Invisible Sandwich"/>
            <figcaption>Credit: <a href="http://loudwire.com/funniest-black-metal-versions-of-famous-memes/">Loudwire</a>.</figcaption>
        </figure>
    </center>
</p>

For anyone that's walked into a Guitar Center, you know that there's a 100% chance that you will hear numerous renditions of *"Enter Sandman"* where the guitar player has usually taken creative liberties by adding some extra notes that weren't in the original song. If you have a keen enough ear to hear above all of those Sandmans, you may have heard a sound much like a dying giraffe followed by a series of lower notes, usually with a healthy dose of distortion. If so, you have heard a guitarist in the wild attempting to down tune. 

For those non-guitarists, a standard guitar has six strings, each of which is tuned to a particular note. The majority of songs featuring a guitar in Western music are more often than not tuned to what is called "standard tuning". In metal, it's common that the guitarists will tune some of their strings to a lower note to obtain a heavier sound. The following is a table consisting of standard tuning at the top, where each letter in the first row corresponds to the note that the string is tuned to. For instance, in standard tuning, a guitar is tuned to (E A D G B E) where the notes correspond to the top (or thickest) string to the bottom (or thinnest) string. The "step" column in the table indicates how far the strings have been detuned respective to standard tuning. Going from E to D# corresponds to a half-step and tuning from E to D corresponds to a whole step and so on.   

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;border-color:#999;border-width:1px;border-style:solid;margin:0px auto;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#999;color:#444;background-color:#F7FDFA;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#999;color:#fff;background-color:#26ADE4;}
.tg .tg-n7bi{font-weight:bold;font-family:"Arial Black", Gadget, sans-serif !important;}
.tg .tg-c6lk{background-color:#D2E4FC;font-family:"Arial Black", Gadget, sans-serif !important;;vertical-align:top}
.tg .tg-bn52{background-color:#D2E4FC;font-family:"Arial Black", Gadget, sans-serif !important;;text-align:center;vertical-align:top}
.tg .tg-19ig{font-family:"Arial Black", Gadget, sans-serif !important;;vertical-align:top}
.tg .tg-bvw0{font-weight:bold;font-family:"Arial Black", Gadget, sans-serif !important;;text-align:center}
.tg .tg-k2e9{background-color:#D2E4FC;font-family:"Arial Black", Gadget, sans-serif !important;}
.tg .tg-i6zj{background-color:#D2E4FC;font-family:"Arial Black", Gadget, sans-serif !important;;text-align:center}
.tg .tg-pjj5{font-family:"Arial Black", Gadget, sans-serif !important;}
.tg .tg-szxb{font-family:"Arial Black", Gadget, sans-serif !important;;text-align:center}
.tg .tg-223e{font-family:"Arial Black", Gadget, sans-serif !important;;text-align:center;vertical-align:top}
</style>
<table class="tg">
  <tr>
    <th class="tg-n7bi">Step</th>
    <th class="tg-bvw0">S6</th>
    <th class="tg-bvw0">S5</th>
    <th class="tg-bvw0">S4</th>
    <th class="tg-bvw0">S3</th>
    <th class="tg-bvw0">S2</th>
    <th class="tg-bvw0">S1</th>
  </tr>
  <tr>
    <td class="tg-k2e9">0</td>
    <td class="tg-i6zj">E</td>
    <td class="tg-i6zj">A</td>
    <td class="tg-i6zj">D</td>
    <td class="tg-i6zj">G</td>
    <td class="tg-i6zj">B</td>
    <td class="tg-i6zj">E</td>
  </tr>
  <tr>
    <td class="tg-pjj5">-0.5</td>
    <td class="tg-szxb">D#</td>
    <td class="tg-szxb">G#</td>
    <td class="tg-szxb">C#</td>
    <td class="tg-szxb">F#</td>
    <td class="tg-szxb">A#</td>
    <td class="tg-szxb">D#</td>
  </tr>
  <tr>
    <td class="tg-k2e9">-1</td>
    <td class="tg-i6zj">D</td>
    <td class="tg-i6zj">G</td>
    <td class="tg-i6zj">C</td>
    <td class="tg-i6zj">F</td>
    <td class="tg-i6zj">A</td>
    <td class="tg-i6zj">D</td>
  </tr>
  <tr>
    <td class="tg-pjj5">-1.5</td>
    <td class="tg-szxb">C#</td>
    <td class="tg-szxb">F#</td>
    <td class="tg-szxb">B</td>
    <td class="tg-szxb">E</td>
    <td class="tg-szxb">G#</td>
    <td class="tg-szxb">C#</td>
  </tr>
  <tr>
    <td class="tg-k2e9">-2</td>
    <td class="tg-i6zj">C</td>
    <td class="tg-i6zj">F</td>
    <td class="tg-i6zj">A#</td>
    <td class="tg-i6zj">D#</td>
    <td class="tg-i6zj">G</td>
    <td class="tg-i6zj">C</td>
  </tr>
  <tr>
    <td class="tg-pjj5">-2.5</td>
    <td class="tg-szxb">B</td>
    <td class="tg-szxb">E</td>
    <td class="tg-szxb">A</td>
    <td class="tg-szxb">D</td>
    <td class="tg-szxb">F#</td>
    <td class="tg-szxb">B</td>
  </tr>
  <tr>
    <td class="tg-c6lk">-3</td>
    <td class="tg-bn52">A#</td>
    <td class="tg-bn52">D#</td>
    <td class="tg-bn52">G#</td>
    <td class="tg-bn52">C#</td>
    <td class="tg-bn52">F</td>
    <td class="tg-bn52">A#</td>
  </tr>
  <tr>
    <td class="tg-19ig">-3.5</td>
    <td class="tg-223e">A</td>
    <td class="tg-223e">D</td>
    <td class="tg-223e">G</td>
    <td class="tg-223e">C</td>
    <td class="tg-223e">E</td>
    <td class="tg-223e">A</td>
  </tr>
</table>

Nowadays you'll find bands that take this to another level by adding extra strings to their guitars in the lower register and tuning so low as to be bowel movement inducing. It's awesome, and I suggest you <a href="https://www.youtube.com/watch?v=zg2076b5Lqc">listen to it now</a>. 

### Metal Data

I decided to get my data from <a href="http://metaltabs.com/index.html">metaltabs.com</a>, a site that I used myself when learning how to play songs no one would want to hear at a bonfire. For those unfamiliar, guitar tablature or guitar "tabs", is like sheet music for guitar players, only instead of musical score, it consists of numbers on six lines (each line corresponds to a guitar string) and the numbers indicate where to place your fingers. Here's an example of what a section of a guitar tab might look like.

<p align="center">
    <center>
        <figure>
            <img src="http://imgur.com/UcF1mUt.png" alt="This song is amazing."/>
            <figcaption>Excerpt of "Into the Dead Sky" by At the Gates.</figcaption>
        </figure>
    </center>
</p>

I cooked up a Python script (which may be downloaded on my Github page <a href="https://github.com/vprusso/metaltabs_scraper">here</a>) that processes every guitar tab on the metaltabs site. For each tab, my script reads in the tab file and attempts to determine the tuning of the song based on certain keywords. 

Since these tabs are user submitted, there's no real consistency in the way this information is presented. So obtaining the tuning is somewhat of a heuristic. For instance, to indicate a song is in standard tuning, the tab may indicate this in many different ways, some of which may be: 

* "tune guitar to E standard",
* "using regular tuning",
* "standard", 
* "E,A,D,G,B,E", 
* "Free bird tuning"
* etc. 

Each of these means the same thing, but are stated in a relatively different manner. I wrote some quick and dirty scripts that go through the output file generated to tidy some things up and make them more consistent for processing purposes. The resulting file may also be found on my <a href="https://github.com/vprusso/metaltabs_scraper">Github repo.</a>

### How Metal is it?

First, let's take a look at how standard tuning compares with other lower tunings where all of the strings on the guitar are tuned down. 

![](http://i.imgur.com/T2fn5Za.png)

Surprisingly, the most common tuning here is standard. As we follow the Y-axis to the right, the guitar tunings get progressively lower. The bands on the far right of the graph have such low string tension that the strings become a tripping hazard on stage.   

In the above graph, I haven't included the "drop tunings", that is, the tunings where the top or lowest string is tuned one full step below the remaining five. For instance drop D is the typical (E A D G B E) tuning where now the E-string is lowered to a D, giving (D A D G B E). I expected these to be much more popular than they were, especially since dropping just one string instead of all six seems like less hassle. Here is a graph of just the tunings where the lowest string is dropped.

![](http://i.imgur.com/WIlvhiQ.png)

Again, as we travel to the right on the Y-axis, the tuning gets progressively lower. While standard tuning seems to be the most used tuning in comparison to any other, if we compare standard against all alternate lower tunings, we have the following graph. 

![](http://i.imgur.com/zsp4HYq.png)

So lower tunings overall are more popular than standard, but standard tuning is still used frequently enough. 

### What have we learned?

Standard tuning is more metal than I initially suspected. 


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
