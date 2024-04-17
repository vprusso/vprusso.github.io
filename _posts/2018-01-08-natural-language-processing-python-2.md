---
layout: post
comments: true
title:  "Natural Language Processing in Python: Part 2 -- Accessing Text Resources"
date:   2018-01-08 1:58:35
cover_image: https://i.imgur.com/IQZOQUy.png
excerpt: Write-up for Part 2 of YouTube NLP in Python series. We continue our exploration of NLTK and begin to dive into the text resources that NLTK provides.
categories: python, nlp, natural language processing 
tags:
- python
- nlp
- natural language processing
---

<script src="https://apis.google.com/js/platform.js"></script>

## Welcome to Natural Language Processing in Python (Part 2)

If you have not seen Part 1 of this tutorial, please refer to the following link for information on how to install the Natural Language Toolkit in Python installed.

1. [NLP in Python Part 1 (Blog Post)][1]:

2. [NLP in Python Part 1 (YouTube Video)][2]:

The companion video to this post on NLP can be viewed here:

<div style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/n3_mZ47ZVxA" frameborder="0" allowfullscreen></iframe>
</div>

The primary goals of this post will be to:

1. Understand a few terms you may be unfamiliar with from natural languge processing. 

2. Be able to take full advantage of the text corpus provided from NLTK. 

<center>
<div class="g-ytsubscribe" data-channelid="UCFxcvyt2Ucq5IL0_1Njzqlg" data-layout="full" data-count="default"></div><br> 
</center>

Table of Contents of this tutorial:

* [Part 1: Introduction][4]

* [Part 2: Accessing Text Resources][5]

* [Part 3: Generating Word Clouds][6]

* [Part 4: WordNet][7]

* [Part 5: Stemming and Lemmatization][8]

## A few NLP terms 

Before going into what the bulk of this post will be focused on,
let us briefly mention a couple natural language processing terms 
and some corresponding examples of each term. 

 
Refer to Part 1 where this syntax is explained in greater detail. 
We will continue to use Lewis Carroll's "Alice in Wonderland" as 
our primary exploratory text for NLP.

```python 
from nltk.text import Text
alice = Text(nltk.corpus.gutenberg.words('carroll-alice.txt'))
fdist = nltk.FreqDist(alice)
```

### Hapaxes 

A <a href="https://en.wikipedia.org/wiki/Hapax_legomenon">**hapax**</a> is a word 
that occurs only once within a context in a written text. 

```python
print(fdist.hapaxes())
```

### Collocations 

A <a href="https://en.wikipedia.org/wiki/Collocation">**collocation**</a> is a pair 
or group of words that are habitually juxtaposed. For instance "red wine", or in the 
context of "Alice in Wonderland", pairs such as "White Rabbit" and "Red Queen" would 
be collocations. 

```python
print(alice.collocations())

    Mock Turtle; said Alice; March Hare; White Rabbit; thought Alice;
    golden key; beautiful Soup; white kid; good deal; kid gloves; Mary
    Ann; yer honour; three gardeners; play croquet; Lobster Quadrille;
    ootiful Soo; great hurry; old fellow; trembling voice; poor little
```

## Accessing NLTK Text Resources

Recall in 
<a href="http://vprusso.github.io/blog/2018/natural-language-processing-python-1/">Part 1 of this tutorial series</a>, 
we ran the following command:

```python 
nltk.download()
```

This command was responsible for downloading various collections of text that 
we can use to run various NLP functions on. Thus far, we have made use of the 
Gutenberg collection of text to read in "Alice in Wonderland".

### Gutenberg Corpus

There are a few more things to note about how one may access the Gutenberg data. 

As we did in Part 1, it is possible to extract the words from a text read in 
via Gutenberg. For instance:

```python
alice_words = nltk.corpus.gutenberg.words('carroll-alice.txt')
```

As we saw previously, this provides to us the words of, in this case, "Alice in Wonderland".
One may print out the words of this text by using Python's `print` function:

```python 
print(alice_words)

    ['[', 'Alice', "'", 's', 'Adventures', 'in', ...]
```

Note that Python does not print out the entire list or words. The ellipsis 
(...) sequence denotes that there is more content that is supressed from output.
In addition to extracting individual words, we may also extract characters and 
sentences. This may be accomplished using the following respective lines:

```python
alice_chars = nltk.corpus.gutenberg.raw('carroll-alice.txt')
alice_sents = nltk.corpus.gutenberg.sents('carroll-alice.txt')
```

Now that we have access to the words, characters, and sentences of "Alice in Wonderland",
we may run a few rudimentary statistics on the text based on this information. For instance,
calculating the average word length would simply amount to dividing the total number 
of characters by the total number of words:

```python 
print(int(len(alice_chars) / len(alice_words)))

    4
```

In a similar manner, we may calculate the average sentence length by dividing the 
total number of words by the total number of sentences:

```python 
print(int(len(alice_words) / len(alice_sents)))

    20
```

Let us turn the above two metrics into functions, and determine the average 
word length and sentence length of all the texts in the Gutenberg collection. 

```python 
def avg_word_len(num_chars, num_words):
    return int(num_chars/num_words)

def avg_sent_len(num_words, num_sents):
    return int(num_words/num_sents)
```

Let us make use of these functions on the text that the NLTK gutenberg module 
provides to us. That is, we shall loop through each file provided via the 
gutenberg module, calculate the total number of chars, words, and sentences for
each piece of work, and then display the average word length and average sentence 
length.

```python 
for file_id in nltk.corpus.gutenberg.fileids():
    num_chars = len(nltk.corpus.gutenberg.raw(file_id))
    num_words = len(nltk.corpus.gutenberg.words(file_id))
    num_sents = len(nltk.corpus.gutenberg.sents(file_id))

    print(file_id + 
          " has an average word length of " + 
          str(avg_word_len(num_chars, num_words)) + 
          " and an average sentence length of " + 
          str(avg_sent_len(num_words, num_sents)))

            austen-emma.txt has an average word length of 4 and an average sentence length of 24
            austen-persuasion.txt has an average word length of 4 and an average sentence length of 26
            austen-sense.txt has an average word length of 4 and an average sentence length of 28
            bible-kjv.txt has an average word length of 4 and an average sentence length of 33
            blake-poems.txt has an average word length of 4 and an average sentence length of 19
            bryant-stories.txt has an average word length of 4 and an average sentence length of 19
            burgess-busterbrown.txt has an average word length of 4 and an average sentence length of 17
            carroll-alice.txt has an average word length of 4 and an average sentence length of 20
            chesterton-ball.txt has an average word length of 4 and an average sentence length of 20
            chesterton-brown.txt has an average word length of 4 and an average sentence length of 22
            chesterton-thursday.txt has an average word length of 4 and an average sentence length of 18
            edgeworth-parents.txt has an average word length of 4 and an average sentence length of 20
            melville-moby_dick.txt has an average word length of 4 and an average sentence length of 25
            milton-paradise.txt has an average word length of 4 and an average sentence length of 52
            shakespeare-caesar.txt has an average word length of 4 and an average sentence length of 11
            shakespeare-hamlet.txt has an average word length of 4 and an average sentence length of 12
            shakespeare-macbeth.txt has an average word length of 4 and an average sentence length of 12
            whitman-leaves.txt has an average word length of 4 and an average sentence length of 36
```

Observe that the sentence length tends to vary, while the word length among all of these 
texts is consistent. 

### Accessing Gutenberg Corpus via the Internet

Note that the gutenberg fileids only have a small subset of text compared
to the large amount of content found on Project Gutenberg.  

If you wish to process a text from Project Gutenberg accessed via the web, 
one may use the `urllib` module to import via the internet. 

```python 
from urllib.request import urlopen 

url = "https://www.gutenberg.org/cache/epub/174/pg174.txt" 
raw = urlopen(url).read().decode('utf-8')
```

The URL in the above example is a link to a text file consisting of 
Oscar Wilde's "The Picture of Dorian Grey" hosted by Project Gutenberg.
The above code navigates to that URL, reads the content on the page, and 
then converts it to a utf-8 formatted string. 

Once the raw content has been extracted, we convert this content to something 
that NLTK can understand and process. This should look somewhat familiar if 
you have consulted Part 1 of this tutorial. 

```python 
dorian_grey = nltk.Text(nltk.word_tokenize(raw))
```

Once the text has been converted to an NLTK Text object, we can process it 
just like we have been doing previously. For example, here we convert the 
text object to a frequency distribution and calculate the hapaxes. 

```python 
fdist_dorian = nltk.FreqDist(dorian_grey)
print(fdist_dorian.hapaxes())
```

The above approach is not limited to text from Project Gutenberg, but is 
broadly applicable to any text that can be obtained from a direct URL.

### Web Text Corpus

Let us consider other text resource that NLTK allows us to process. One of them
is various web and chat data. The first one we shall focus on his web text. 

We can print out the file ids of the webtext collection to see what is provided:

```python 
for file_id in nltk.corpus.webtext.fileids():
    print(file_id) 

    firefox.txt
    grail.txt
    overheard.txt
    pirates.txt
    singles.txt
    wine.txt
```

We see a list of text files. For more information on the content of each of these 
file, you can consult:
https://github.com/teropa/nlp/tree/master/resources/corpora/webtext

A very brief description of the content in the above link:

1. firefox.txt: Firefox support forum.

2. grail.txt: Movie script from "Monty Python and the Holy Grail".

3. overheard.txt: Overheard conversation in New York.

4. pirates.txt: Movie script from Pirates of the Caribean.

5. singles.txt: Singles ad. 

6. wine.txt: "Fine Wine Diary" reviews.

Observe that many of the ways in which we access and processed text from gutenberg 
carry over into processing the webtext data. This is a common theme for all of the 
text resources provided by NLTK, and makes it easier to apply functionality for one 
text resource to another in a general fashion.

```python 
num_grail_words = len(nltk.corpus.webtext.words('grail.txt'))
num_grail_chars = len(nltk.corpus.webtext.raw('grail.txt'))
num_grail_sents = len(nltk.corpus.webtext.sents('grail.txt'))

print(avg_word_len(num_grail_chars, num_grail_words))
print(avg_sent_len(num_grail_words, num_grail_sents))

    3
    9
```

### Inagural Address Corpus:

This is a collection of presidential inaugural addresses; the speech that the 
president makes prior to officially starting their term in office. 

Let us print out the files provided to us via the inaugural corpus:

```python 
for file_id in nltk.corpus.inaugural.fileids():
    prinf(file_id) 

        1789-Washington.txt
        1793-Washington.txt
        1797-Adams.txt
        1801-Jefferson.txt
        1805-Jefferson.txt
        1809-Madison.txt
        ...
```

Each file consists of the format: X-Y, where X is the four digit year, and 
Y is the last name of the president giving the inaugural address. 

Let us loop through each address. While doing so, let us keep a running tally 
of the number of times the word "America" is used in each address.

```python 
# Loop through each inaugural address:
for fileid in nltk.corpus.inaugural.fileids():
    america_count = 0 
    # Loop through all words in current inaugural address:
    for w in nltk.corpus.inaugural.words(fileid):
        # We convert the word to lowercase before checking 
        # This makes checking for the occurrence more consistent.
        # Note that the "startswith" function also catches words like 
        # "American", "Americans", etc.
        if w.lower().startswith('america'):
            america_count += 1
    # Output both the inaugural address name and count for America:
    president = fileid[5:-4]
    year = fileid[:4]
    print("President " + president + 
          " of year " + year + 
          " said America " + str(america_count) + " times. ")

            President Washington of year 1789 said America 2 times. 
            President Washington of year 1793 said America 1 times. 
            President Adams of year 1797 said America 8 times. 
            President Jefferson of year 1801 said America 0 times. 
            President Jefferson of year 1805 said America 1 times. 
            President Madison of year 1809 said America 0 times. 
            ...
```

Say I also want to see how many times the word "citizen" is present in
each of the inaugural addresses. It may be preferable to consider a plot
output as opposed to one that simply outputs to terminal.

Let us consider a conditional frequency distribution, that is, a frequency
distribution that is a collection of frequency distributions run under
different conditions.

Recall the `FreqDist` function took a list as input. NLTK provides a 
`ConditionalFreqDist` function as well which takes a list of pairs. 
Each pair has the form `(condition, event)`. 

In our example, we care about the case when either the word "America"
or "citizen" is used in each of the inaugural addresses. In other words, 
encountering the phrase "America" or "citizen" are the conditions we 
care about, and the events are one for each year of the inaugural address. 

```python 
cfd = nltk.ConditionalFreqDist(
            (target, fileid[:4])
            for fileid in nltk.corpus.inaugural.fileids() 
            for w in nltk.corpus.inaugural.words(fileid)
            for target in ['america', 'citizen']
            if w.lower().startswith(target))
cfd.plot()
```

The result of generating the above plot is given below:

<p align="center">
    <center>
        <figure>
            <img src="https://i.imgur.com/kkKolAW.png" alt="Conditional Frequency Distribution of Inaugural addresses."/>
        </figure>
    </center>
</p>

## Conclusion

That wraps up this tutorial on natural language processing in Python. In the next tutorial, we will take a bit of a breather and have fun with generating word clouds. 

[Part 3 of Natural Language Processing in Python][3]

Table of Contents of this tutorial:

* [Part 1: Introduction][4]

* [Part 2: Accessing Text Resources][5]

* [Part 3: Generating Word Clouds][6]

* [Part 4: WordNet][7]

* [Part 5: Stemming and Lemmatization][8]

[1]: http://vprusso.github.io/blog/2018/natural-language-processing-python-1/
[2]: https://www.youtube.com/watch?v=tP783g97C5o
[3]: http://vprusso.github.io/blog/2018/natural-language-processing-python-3/
[4]: http://vprusso.github.io/blog/2018/natural-language-processing-python-1/
[5]: http://vprusso.github.io/blog/2018/natural-language-processing-python-2/
[6]: http://vprusso.github.io/blog/2018/natural-language-processing-python-3/
[7]: http://vprusso.github.io/blog/2018/natural-language-processing-python-4/
[8]: http://vprusso.github.io/blog/2018/natural-language-processing-python-5/
[9]: http://vprusso.github.io/blog/2018/natural-language-processing-python-6/
[10]: http://vprusso.github.io/blog/2018/natural-language-processing-python-7/
[11]: http://vprusso.github.io/blog/2018/natural-language-processing-python-8/
[12]: http://vprusso.github.io/blog/2018/natural-language-processing-python-9/
[13]: http://vprusso.github.io/blog/2018/natural-language-processing-python-10/
