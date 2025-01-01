---
layout: post
comments: true
title:  "Natural Language Processing in Python: Part 3 -- Generating Word Clouds"
date:   2018-01-09 1:58:35
cover_image: https://i.imgur.com/MEOHNW7.png) 
excerpt: Write-up for Part 3 of YouTube NLP in Python series. This tutorial is focused on how to make use of the wordcloud module along with matplotlib and nltk to generate word clouds from various content sources.   
categories: python, nlp, natural language processing 
tags:
- python
- nlp
- natural language processing
---

<script src="https://apis.google.com/js/platform.js"></script>

## Welcome to Natural Language Processing in Python (Part 3)

If you have not seen Part 2 of this tutorial, please refer to the following link:

1. [NLP in Python Part 2 (Blog Post)][1]:

2. [NLP in Python Part 2 (YouTube Video)][2]:

The companion video to this post on NLP can be viewed here:

<div style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/0Rc3452U6b8" frameborder="0" allowfullscreen></iframe>
</div>

The primary goal of this post will be to:

1. Have some fun generating word clouds. 

<center>
<div class="g-ytsubscribe" data-channelid="UCFxcvyt2Ucq5IL0_1Njzqlg" data-layout="full" data-count="default"></div><br> 
</center>

Table of Contents of this tutorial:

* [Part 1: Introduction][10]

* [Part 2: Accessing Text Resources][11]

* [Part 3: Generating Word Clouds][12]

* [Part 4: WordNet][13]

* [Part 5: Stemming and Lemmatization][14]

## The wordcloud Module

Let us start off by importing the NLTK module.

```python 
import nltk
```

In this tutorial, we shall take a break from the core natural language processing
content, and do something primarily just for kicks. 

We shall make use of what we have learned thus far in NLTK to generate a
[**word cloud**][4] (also known as **tag cloud**). This is a fun and interesting 
way in which to visually represent how prominent certain words are in 
a text resource. 

In order to follow along with this tutorial, you will require the 
Python modules ["matplotlib"][5] and ["wordcloud"][6] Both of these can be 
installed on your machine by navigating to a terminal and typing:

```python 
pip install wordcloud 
pip install matplotlib
```

### Generating Simple Word Clouds

Let us start off by importing the modules we just installed:

```python 
import matplotlib.pyplot as plt
from wordcloud import WordCloud
```

Next, let us generate a really basic and simple word cloud, based 
on just a single Python string. 

```python 
text = "all your base are belong to us"
```

Generating a word cloud with no optional parameters based on the 
above string:

```python
wordcloud = WordCloud().generate(text)
```

Finally, use matplotlib to render the word cloud:

```python 
plt.imshow(wordcloud)
plt.axis("off")
plt.show()
```
This will generate the following word cloud:

<p align="center">
    <center>
        <figure>
            <img src="https://i.imgur.com/N1XoIjs.png" alt="Wordcloud with phrase All your base are belong to us."/>
        </figure>
    </center>
</p>

Since we will be using these three lines quite frequently, let 
us wrap them in a function for easier access. 

```python 
def plot_wordcloud(wordcloud):
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.show()
```

You will notice that the words "base", "us" and "belong" are
present in the word cloud, but the remaining words of "your",
"are", "to", and "all" are absent.

This is because the wordcloud module ignores stopwords by
default. Refer to [Part 1][7] of the NLTK tutorial if the concept
of stopwords is new to you.

If we wish, we can specify our own set of stopwords, instead 
of the stopwords provided by default. 

```python 
wordcloud = WordCloud(stopwords={'to', 'of'}).generate(text)
plot_wordcloud(wordcloud)
```

This generates the word cloud of the same phrase, where the 
stopwords excluded are the ones we selected. 

<p align="center">
    <center>
        <figure>
            <img src="https://i.imgur.com/wiYiWDc.png" alt="Wordcloud with selected stopwords."/>
        </figure>
    </center>
</p>

Another optional parameter for WordCloud is that of 
`relative_scaling`, which corresponds to how the size of the 
text in the word cloud scales based on the content. 

With `relative_scaling=0`, only the ranks of the words are 
considered. If we alter this to `relative_scaling=1.0`, then 
a word that appears twice as frequently will appear twice the 
size. By default, `relative_scaling=0.5`.

```python 
wordcloud = WordCloud(relative_scaling=1.0,
                      stopwords={'to', 'of'}).generate(text)
plot_wordcloud(wordcloud)
```

Add in a few more occurrences of the word "base" to illustrate 
the effect of relative scaling.

```python 
text_base = "all your base are belong to us base base base base"
wordcloud = WordCloud(relative_scaling=1.0,
                      stopwords={'to', 'of'}).generate(text_base)
plot_wordcloud(wordcloud)
```

<p align="center">
    <center>
        <figure>
            <img src="https://i.imgur.com/qSrqNyH.png" alt="Wordcloud with more uses of the word base."/>
        </figure>
    </center>
</p>

Note that the word "base" in the world cloud is relatively much 
larger than the other words. 

Recall from [Part 2][1] of this series where we accessed the Inaugural 
Address corpus provided by NLTK. 

Let us read in the raw content of the 1789 inaugural address of 
Washington and the 2009 address of Obama.

### Generating Word Clouds from NLTK's Corpus

```python 
washington = nltk.corpus.inaugural.raw('1789-Washington.txt')
obama = nltk.corpus.inaugural.raw('2009-Obama.txt')
```

Using `relative_scaling=1.0` as a parameter for the word cloud, 
let us generate respective word clouds for both Washinton and 
for Obama:

Generating the word cloud for Washington:

```python 
wordcloud = WordCloud(relative_scaling=1.0).generate(washington)
plot_wordcloud(wordcloud)
```

This yields the following word cloud 

<p align="center">
    <center>
        <figure>
            <img src="https://i.imgur.com/q5jREL8.png" alt="Word cloud from George Washington inaugural address."/>
        </figure>
    </center>
</p>

By default, if the WordCloud function is not provided a dictionary of stopwords,
the WordCloud function will use the ones provided by default. This is okay, but 
perhaps we notice in the word cloud generated above that words such as "every" 
and "will" are present, but are not particularly useful in extracting information 
into what makes Washington's address more unique over others. 

What we can do then is to add in the words "every" and "will" into the set of 
stopwords that the WordCloud function considers. 

```python 
from wordcloud import STOPWORDS

stopwords = set(STOPWORDS)
stopwords.add("every")
stopwords.add("will")
wordcloud = WordCloud(stopwords=stopwords, relative_scaling=1.0).generate(washington)
plot_wordcloud(wordcloud)
```

<p align="center">
    <center>
        <figure>
            <img src="https://i.imgur.com/9Zua6gW.png" alt="Word cloud from George Washington inaugural address with the words every and will."/>
        </figure>
    </center>
</p>

For visual comparative purposes, the word cloud for Obama is generated in a 
similar manner: 

```python `
wordcloud = WordCloud(relative_scaling=1.0).generate(obama)
plot_wordcloud(wordcloud)
```

The Obama word cloud is shown here: 

<p align="center">
    <center>
        <figure>
            <img src="https://i.imgur.com/kUvwmYt.png" alt="Wordcloud from Barack Obama inaugural address."/>
        </figure>
    </center>
</p>

### Word Clouds in Different Shapes

For this next example, you will need two other Python modules installed, 
if you do not already have them:

```python 
pip install PIL
pip install numpy
```

The `PIL` module is used primarily for image processing, while `numpy` is used for 
various mathematical applications.  The following example is inspired by the  
[examples page on the `wordcloud` website][8].

First off, we will import all of the necessary modules required for this example. 

```python 
import numpy as np
from PIL import Image
from os import path

import nltk
import matplotlib.pyplot as plt
from wordcloud import WordCloud
```

Notice that we already imported some of these modules in an earlier part of this 
tutorial. We are placing them here redundantly so as to make the following example
as self-contained as possible. 

Now, read in the George Washington image as a numpy array. The source of the image can be found [here][9]. 
The entire example is provided below:

```python
img = Image.open(path.join(path.dirname(__file__), 
                           "supplementary_files", 
                           "washington.jpg"))
mask = np.array(img)

text = nltk.corpus.inaugural.raw('1789-Washington.txt')

wc = WordCloud(max_words=1000, mask=mask).generate(text)

wc.to_file("washington_word_cloud.png")

plt.title("Default colors")
plt.imshow(wc)
plt.axis("off")
plt.show()
```

In essence, we first read in the George Washington image into the `img` variable by telling Python 
where the image is located on our machine. Next, we create a `mask` variable, that is, a numerical
representation of the image. We pass this numeric representation to the `WordCloud` function and 
plot as we have done so in the earlier portion of this tutorial. The resulting word cloud should 
look like this:

<p align="center">
    <center>
        <figure>
            <img src="https://i.imgur.com/9RLsyMB.png" alt="Word cloud in the form of George Washington."/>
        </figure>
    </center>
</p>

## Conclusion

That wraps up this tutorial on natural language processing in Python. In the next tutorial, we will go over the WordNet resource. 

[Part 4 of Natural Language Processing in Python][3]

Table of Contents of this tutorial:

* [Part 1: Introduction][10]

* [Part 2: Accessing Text Resources][11]

* [Part 3: Generating Word Clouds][12]

* [Part 4: WordNet][13]

* [Part 5: Stemming and Lemmatization][14]

[1]: http://vprusso.github.io/blog/2018/natural-language-processing-python-2/
[2]: https://www.youtube.com/watch?v=n3_mZ47ZVxA
[3]: http://vprusso.github.io/blog/2018/natural-language-processing-python-4/
[4]: https://en.wikipedia.org/wiki/Tag_cloud
[5]: https://amueller.github.io/word_cloud/
[6]: https://matplotlib.org/
[7]: http://vprusso.github.io/blog/2018/natural-language-processing-python-1/
[8]: https://amueller.github.io/word_cloud/auto_examples/a_new_hope.html#sphx-glr-auto-examples-a-new-hope-py)
[9]: http://weclipart.com/george+washington+silhouette+clip+art/d/6952286
[10]: http://vprusso.github.io/blog/2018/natural-language-processing-python-1/
[11]: http://vprusso.github.io/blog/2018/natural-language-processing-python-2/
[12]: http://vprusso.github.io/blog/2018/natural-language-processing-python-3/
[13]: http://vprusso.github.io/blog/2018/natural-language-processing-python-4/
[14]: http://vprusso.github.io/blog/2018/natural-language-processing-python-5/
[15]: http://vprusso.github.io/blog/2018/natural-language-processing-python-6/
[16]: http://vprusso.github.io/blog/2018/natural-language-processing-python-7/
[17]: http://vprusso.github.io/blog/2018/natural-language-processing-python-8/
[18]: http://vprusso.github.io/blog/2018/natural-language-processing-python-9/
[19]: http://vprusso.github.io/blog/2018/natural-language-processing-python-10/

