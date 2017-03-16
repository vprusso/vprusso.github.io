---
layout: post
comments: true
title:  "Learning Vim in 10 hours"
date:   2017-02-19 1:58:35
categories: Programming, Learning, Code
tags:
- code
- learning
- programming
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

## Prologue: Vim (How do you exit this damn thing?)

I've been developing software in one form or another for a number of years. As a result, I've used various IDEs and text editors to wrangle my code. Depending on what I'm coding, the choice between IDE and text editor may vary. For instance if I'm developing an Android application, I'll stick with Android Studio, and if I'm developing something less specific I'll use Sublime Text. In the past I've used Notepad++, but at the time of this writing, Sublime really does an excellent job of integrating various plug-ins, code completion, syntax highlighting, and provides an overall nice experience, that is, a text editor that gets out of the way and lets you spend your time thinking about the software, rather than the tool. 

What about the more established editors like Emacs or Vim? Well, I did use Emacs for a while, but I wouldn't have ever called myself a power user. I was proficient enough, but generally frustrated by the macros that were overwhelming at first, and never quite solidified since I never used it exclusively. Vim was not much better for me, as it was the text editor that I could enter, but had to look up on the Internet to find out how to exit. 

Despite my aversion to both editors, I'm well aware of the people who swear by either editor. There must be a very good reason as to why these editors have stood the test of time and why people still use these editors decades after their inception. Indeed, there are many things I didn't even know I was missing out on.

### Disclaimer

A disclaimer on the title is in order. When I say "Learn X in Y Hours", I'm speaking of course of a base level of proficiency. I'm under no illusion that the entirety of Vim can be comfortably fit in 10 hours or less. Indeed, there are long time users of Vim that still discover its extensive capabilities. When I use the term "learn" in this case then, I'm more or less referring to obtaining enough proficiency for me to use the most basic features of Vim. I think this comic echoes my overall sentiment of the cascade of programming books that claim to teach you a language in some very small amount of time: 
<div style="text-align:center">
    <figure>
        <img src="http://vprusso.github.io/images/bp_vim/ars_longa_vita_brevis.png" width="450">
        <figcaption>Credit: <a href="http://abstrusegoose.com">Abtruse Goose.</a> </figcaption>
    </figure>
</div>
With that out of the way, let's get on with it. 

## The inspiration

I've been a big fan of <a href="http://tim.blog/podcast/">Tim Ferriss</a> for a long time, and one of his tenants in acquiring any type of skill is the so-called 80/20 rule, often referred to as the <a href="https://en.wikipedia.org/wiki/Pareto_principle">Pareto principle.</a> Applying this to my Vim training I need to determine what the 20% of "Vim skill" I need to acquire in order to achieve 80% of the desired effect of being proficient with Vim. In order to tackle this, I'll be breaking my approach down into what Tim refers to as the D.S.S.S. method. 

## D.S.S.S. (Deconstruction, Selection, Sequencing, Stakes)

In Tim Ferriss's book, The 4-Hour Chef, he outlines a model referred to as D.S.S.S., which stands for Deconstruction, Selection, Sequencing, and Stakes. This model is ideal for rapidly learning and getting to a base level of proficiency. Another different but related approach delivered by Josh Kauffman in the following <a href="https://www.youtube.com/watch?v=5MgBikgcWnY">TED talk</a> discusses how to learn the fundamentals of a skill within 20 hours. His book, in which the talk is based, covers skills such as learning to play the ukulele as well as learning the DVORAK keyboard layout for more efficient typing. The key ideas for both are primarily the same, and I'll be breaking up my learning process for Vim in a similar manner. 

### Deconstruction - What are the minimum learnable units?

### Selection

Description.....My application....

### Sequencing

Description.....My application....

### Stakes
If I don't learn this ... 

Description.....My application....

## Time allocation

The following provides a detailed breakdown of how I spent my time learning Vim in roughly 25 to 60 minute intervals, and what those intervals were composed of.  

## Epilogue: Vim (I can now exit this damn thing!)

I've now come to appreciate the power of Vim and what interesting things it can be used for. There are certainly tasks where Vim really shines and using it is the right choice. However, as with any tool in ones toolbox, it's most likely not ideal to be religiously devoted to one tool over another. Sure, Vim is excellent in many ways, but there are still development scenarios and environments where it just doesn't make sense. An example mentioned in the beginning of this post is with respect to Android development. One could, in principle, develop an application of this sort purely in Vim. However, this is surely not worth the extra baggage that comes along with sticking exclusively to Vim. On the other hand, I'm glad that I've finally taken the time and effort to get to a base level of proficiency with Vim. Programming for as long as I have been, this is something that has been overdue. I look forward to leveraging the power of Vim in scenarios that appropriately leverage its capabilities. 

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
