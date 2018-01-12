---
layout: post
comments: true
title:  "Natural Language Processing in Python: Part 5 -- Stemming and Lemmatization"
date:   2018-01-11 1:58:35
cover_image: https://i.imgur.com/yrOGZKJ.png
excerpt: Write-up for Part 5 of YouTube NLP in Python series. We consider what functionality NLTK provides to us for stemming and lemmatizing words.
categories: python, nlp, natural language processing 
tags:
- python
- nlp
- natural language processing
---

<script src="https://apis.google.com/js/platform.js"></script>

## Welcome to Natural Language Processing in Python (Part 5)

If you have not seen Part 4 of this tutorial, please refer to the following link:

1. [NLP in Python Part 4 (Blog Post)][1]:

2. [NLP in Python Part 4 (YouTube Video)][2]:

The companion video to this post on NLP can be viewed here:

<div style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/P2PMgnQSHYQ" frameborder="0" allowfullscreen></iframe>
</div>

The primary goal of this post will be to:

1. Make use of NLTK's stemming functionality.

2. Make use of NLTK's lemmatization functionality.

<center>
<div class="g-ytsubscribe" data-channelid="UCFxcvyt2Ucq5IL0_1Njzqlg" data-layout="full" data-count="default"></div><br> 
</center>

## Stemming

Let us first focus on the notion of [**stemming** according
to Wikipedia][4]:

> "Stemming is the process of reducing inflected (or sometimes
> derived) words to their word stem, base, or root form--generally
> a written word form."

That definition is a bit hard to follow, so let us considered
an example.

Take the word "fishing". This word is based on the so-called
stem, that is, the word "fish". Likewise, the stem of "fished",
"fisher", etc. has the stem "fish".

Writing your own function to determine the stem of a word is
possible, although there are many potential edge cases. Many
of these edge cases are automatically accounted for via the
stemming tools provided by NLTK.

Applications of Stemming:
According to the [previously mentioned Wikipeda article on
stemming][4]:

> "Stemming is used as an approximate method for grouping words
> with a similar basic meaning together. For example, a text
> mentioning "daffodils" is probably closely related to a
> text mentioning "daffodil" (without the "s"). But in some
> cases, words with the same stem have idiomatic meanings which
> are not closely related: a user searching for "marketing" will
> not be satisfied by most documents mentioning "markets" but
> not "marketing"".

One well-known application of stemming is used when you search
in Google. For instance, searching for the term "fish" will also
yields results for the term "fishing" as well, since "fish" is
the stem of "fishing" and is most likely related to the stem
in this case.

One of the stemming algorithms used via NLTK is the so-called
[**Porter Stemmer**][5]:

```python
from nltk.stem import PorterStemmer
```

Let us attempt to determine the stem for the following words in
this word list:

```python
porter = PorterStemmer()
word_list = ["connected", "connecting", "connection", "connections"]

for word in word_list:
    print(porter.stem(word))

    connect
    connect
    connect
    connect
```

The Porter Stemmer identifies "connect" as the stem for
each of the words in the list above.

Let us take another example list of words:

```python
word_list = ["argue", "argued", "argues", "arguing", "argus"]

for word in word_list:
    print(porter.stem(word))

    argu
    argu
    argu
    argu
    argu
```

Note that the term "stem" and "root" are independent. The word
"argue" is the root word of the above word list, but according
to the definition of "stem", the term "argu" is the stem.

NLTK also provides access to a number of other stemmer algorithms.

```python
from nltk.stem import LancasterStemmer
from nltk.stem import SnowballStemmer

lancaster = LancasterStemmer()
snowball = SnowballStemmer(language='english')
```

Using the **Lancaster Stemmer** on the "argue" word list:

```python
for word in word_list:
    print(lancaster.stem(word))

    argu
    argu
    argu
    argu
    arg
```

Using the **Snowball Stemmer** on the "argue" word list:

```python
for word in word_list:
    print(snowball.stem(word))

    argu
    argu
    argu
    argu
    argus
```

Notice that each stemming algorithm provides a different
output. Delving into how each of these stemming algorithms
work along with what the pros and cons of each are is beyond
the scope of this video. However, if you would like a high level
overview of when to use a particular stemming algorithm for your
purposes, [the following StackOverflow answer by Slater Tyranus
provides a very well-written and concise summary of each][6].

## Lemmatizing

According to Wikipedia, the definition of **lemmatization** is:

> "The process of grouping together the inflected forms of
> a word so they can be analyzed as a single item, identified by
> the word's lemma, or dictionary form.

Lemmatization and stemming are related, but different.
The difference is that a stemmer operates on a single word
*without* knowledge of the context, and therefore cannot
discriminate between words which have different meaning
depending on part of speech.

Let us consider some examples of lemmatization and also
of stemming to consider the contrast between the two ideas.

```python
from nltk.stem import WordNetLemmatizer

lemmatizer = WordNetLemmatizer()
```

The `WordNetLemmatizer` class has a method called `lemmatize` which
takes as arguments a word to lemmatize as well as what part of speech
the word happens to be, i.e. noun, verb, adverb, etc.

 Let us attempt to determine the lemma for the word "bats":

```python
print(lemmatizer.lemmatize("bats"))

    bat
```

By default, the part of speech is noun (unless specified otherwise).
Note that the lemmatizer is able to ascertain the lemma of the plural
"bats" by the word "bat".

Note that "bats" can be considered a noun, as in the plural for the
type of animal for instance, but it may also be considered a verb,
as in to "hit at" something.

We can specify the part of speech to consider the word as by the optional
`pos` argument, standing for "part-of-speech":

```python
print(lemmatizer.lemmatize("bats", pos="v"))

    bat
```

Let us now consider lemmatizing the word "better". In fact, let us lemmatize
this word when the term better is an adjective, adverb, noun, and verb, 
respectively.

```python
# Adjective:
print(lemmatizer.lemmatize("better", pos="a"))
    
    good
```

```python
# Adverb:
print(lemmatizer.lemmatize("better", pos="r"))

    well
```

```python
# Noun:
print(lemmatizer.lemmatize("better", pos="n"))

    better
```

```python
# Verb:
print(lemmatizer.lemmatize("better", pos="v"))
    
    better
```

Notice that the lemmatization of "better" when considered to be a
noun or verb stays as "better". Whereas when it is considered as
an adjective it lemmatizes to "good" and when the part of speech
is an adverb it lemmatizes to "well".

If you consult Google's dictionary tool, you will notice this
coincides with this categorization as well.

## Conclusion

That wraps up this tutorial on natural language processing in Python.

[Part 6 of Natural Language Processing in Python][3]


[1]: http://vprusso.github.io/blog/2018/natural-language-processing-python-4/
[2]: XXX
[3]: http://vprusso.github.io/blog/2018/natural-language-processing-python-6/
[4]: https://en.wikipedia.org/wiki/Stemming
[5]: http://www.cs.odu.edu/~jbollen/IR04/readings/readings5.pdf
[6]: https://stackoverflow.com/questions/10554052/what-are-the-major-differences-and-benefits-of-porter-and-lancaster-stemming-alg/11210358
[7]: https://en.wikipedia.org/wiki/Lemmatisation
