---
layout: post
comments: true
title:  "Natural Language Processing in Python: Part 4 -- WordNet"
date:   2018-01-10 1:58:35
cover_image: https://i.imgur.com/6mgvMDi.png
excerpt: Write-up for Part 4 of YouTube NLP in Python series. We use NLTK to explore WordNet, a lexical database of the English language.  
categories: python, nlp, natural language processing 
tags:
- python
- nlp
- natural language processing
---

<script src="https://apis.google.com/js/platform.js"></script>

## Welcome to Natural Language Processing in Python (Part 4)

If you have not seen Part 3 of this tutorial, please refer to the following link:

1. [NLP in Python Part 3 (Blog Post)][1]:

2. [NLP in Python Part 3 (YouTube Video)][2]:

The companion video to this post on NLP can be viewed here:

<div style="text-align:center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/byx3LDFiEZE" frameborder="0" allowfullscreen></iframe>
</div>

The primary goal of this post will be to:

1. Give an overview of WordNet and illustrate how NLTK can be used to interface with this resource. 

2. Consider various metrics for determining how similar two different words are to each other.

<center>
<div class="g-ytsubscribe" data-channelid="UCFxcvyt2Ucq5IL0_1Njzqlg" data-layout="full" data-count="default"></div><br> 
</center>


## NLTK and WordNet

In this tutorial, we shall briefly go over the WordNet resource. NLTK
provides direct access to this resource, and we shall import that here:

```python
from nltk.corpus import wordnet as wn
```

[According to Wikipedia][4]
> "WordNet is a lexical database for the English language. It groups English
> words into sets of synonyms called **synsets**, which provide short
> definitions and usage examples and records a number of relations among
> these synonym sets or their members."

WordNet is quite an extensive resource for NLP, and the fact that NLTK
provides direct access to this resources is convenient. If you want to 
find more information on WordNet, [here is the official WordNet site.][5]

One primary use for WordNet is to determine the similarity between words.
Take for example the following two sentences:

1. "I learned natural language processing by resources found on the internet."

2. "I learned natural language processing by resources found on the net."

Both sentence 1. and 2. are the same, with the exception of the last word.
The words "internet" and "net" are synoynms, different words that have the 
same meaning, so the meaning of each sentence is the same irrespective of 
whether "internet" or "net" is used at the end.

We can use the `wordnet` module to determine the synsets (synonym sets) of
the word "internet":

```python
print(wn.synsets('internet'))

    [Synset('internet.n.01')]
```

The entry `internet.n.01` is a synset for the word internet.
Each synonym in the set is referred to as a **lemma**.
We can print out the list of such synsets and their corresponding
lemmas. (Specifically, the pairing of a synset with a word is called a lemma):

```python
print(wn.synset('internet.n.01').lemma_names())

    ['internet', 'net', 'cyberspace']
```

According to WordNet, the word "internet" is a synonym of the word "net" and
the word "cyberspace".

For each synset, we can print out the definition as well as an example of
usage in a sentence for the given word:

```python
# Definition of synset:
print(wn.synset('internet.n.01').definition())
    a computer network consisting of a worldwide network of computer 
    networks that use the TCP/IP network protocols to facilitate data 
    transmission and exchange
```

```python
# Example usage of synset:
print(wn.synset('internet.n.01').examples())

    []
```

As we can see, not all synsets have valid examples as we obtain the
empty list. However, for a word like "car" we can take a look at
the synsets:

```python
print(wn.synsets('car'))

    [Synset('car.n.01'), Synset('car.n.02'), Synset('car.n.03'), Synset('car.n.04'), Synset('cable_car.n.01')]
```

And then, for a given synset, we can view the example sentence provided. For this case of the word "car", this 
example is:

```python
# Example usage of synset for "car":
print(wn.synset('car.n.01').examples())
    
    ['he needs a car to get to work']
```

One may obtain the lemmas for a given synset as follows:

```python
print(wn.synset('internet.n.01').lemmas())
    
    [Lemma('internet.n.01.internet'), Lemma('internet.n.01.net'), Lemma('internet.n.01.cyberspace')]
```

For a given lemma, we can also get the synsets corresponding
to that lemma.

```python
print(wn.lemma('internet.n.01.net').synset())
    
    Synset('internet.n.01')
```

## A Few More NLP Terms:

Let us define two specic NLP terms that we will make use of later.

**Hyponym**: "a word of more specific meaning than a general or superordinate
term applicable to it. For example, spoon is a hyponym of cutlery."

Let us explore this concept with the term "cat":

First obtain the synsets for the term "cat":

```python
print(wn.synsets('cat'))

    [Synset('cat.n.01'), Synset('guy.n.01'), Synset('cat.n.03'), Synset('kat.n.01'), Synset('cat-o'-nine-tails.n.01'), Synset('caterpillar.n.02'), Synset('big_cat.n.01'), Synset('computerized_tomography.n.01'), Synset('cat.v.01'), Synset('vomit.v.01')]
```

There are a few different synsets for this word.
Let us take a look at what the definition of
the synset `cat.n.01` is:

```python
print(wn.synset('cat.n.01').definition())

    feline mammal usually having thick soft fur and no ability to roar: domestic cats; wildcats
```

It looks like that definition refers to the feline
variety of the term cat. Note that the second synset
is `guy.n.01`, as in someone who is a "cool cat". Let
us stick with the feline variety.

Let us determine the hyponyms of the term "cat", and
store that into a variable `types_of_cats`.

```python
cat = wn.synset('cat.n.01')
types_of_cats = cat.hyponyms()
```

Now, let us loop through the hyponyms and see the
lemmas for each synset:

```python
for synset in types_of_cats:
    for lemma in synset.lemmas():
        print(lemma.name())

    domestic_cat
    house_cat
    Felis_domesticus
    Felis_catus
    wildcat
```

Note that terms like `domestic_cat` and `house_cat` are
more specific terms with respect to the term "cat", that is,
they are hyponyms of the word "cat".

**Hypernym**: "a word with a broad meaning that more specific words fall
under; a superordinate. For example, color is a hypernym of red."

A hyponym drills down to more specificity, while a hypernym goes
upward toward more generality.

Example:
 Cat <- hypernym
      house_cat <- hyponym

Let us print out the hypernyms for the word "cat".

```python
print(wn.synset('house_cat.n.01').hypernyms())
    
    [Synset('cat.n.01'), Synset('domestic_animal.n.01')]
```

One way in which one may ascribe similarity between two different words
is to assign a score based on the distance in terms of hypernyms and
hyponyms. That is, how many levels up or down is a given word from
the other we are attempting to compare it to.


## How Related are Two Words?


Let us take the terms we have learned thus far along with what WordNet
provides to us to define some metric as to how two words are related
to one another.

There are a few ways in which to calculate the similarities between
words.

The `path_similarity` function returns a score denoting how similar two
words are in terms of the distance between hypernyms/hyponyms.

Let us calculate this metric of similarity between words
"car" and "automobile".

First, define the synsets for these terms:

```python
car = wn.synset('car.n.01')
automobile = wn.synset('automobile.n.01')
```

Now, call the `path_similarity` function. This function returns a score
between 0 and 1, where 0 is no similarity between the hypernym/hyponym
tree and a distance of 1 is the node which houses both of the words
in terms of hypernyms/hyponyms is identical.

```python
print(car.path_similarity(automobile))

    1.0
```

We see that "car" and "automobile" have the highest similarity possible,
with a score of 1.0.

This makes sense, since if we print out the synsets of "car", we see that
one of the synonyms is indeed "automobile".

Let us now take a look at the term "car" and "boat":

```python
boat = wn.synset('boat.n.01')
print(car.path_similarity(boat))

    0.125
```

We see a lower number here. This again makes sense, since the traversal
with respect to hypernyms/hyponyms from car to boat is certainly at least
below 1.0.

There are actually many more ways in which to define distances between words.

1. Wu-Palmer Similarity

2. Resnik Similarity

3. Jiang-Conrath Similarity

4. Lin Similarity

These methods of similarity are all based on different metrics of what one
uses to define similarity between two different words. Going over each of
these methods in detail would go beyond the scope of this tutorial, but
let us look at the [Wu-Palmer similarity metric][6].

The numerics obtained from this method may appear to be more intuitively
pleasing than the `path_similarity` method.

Let us attempt to use this metric in the same way that we did for 
the `path_similarity` function.

```python
print(car.wup_similarity(automobile))

    1.0
```

Okay, again for "car" and "automobile" we see a value of 1.0, that is 
the highest value of similarity correlation under this metric. 

Let us now attempt this metric with "car" and "boat":

```python
print(car.wup_similarity(boat))

    0.6956521739130435
```

This higher value is a bit more intuitively correct, as a boat and 
car are both modes of transport, yet they are also different enough 
to warrant a lower value (as one travels on land and the other by sea).
Let us continue with something even more seemingly unrelated to a car,
a cat.

```python
cat = wn.synset('cat.n.01')
print(car.wup_similarity(cat))

    0.32
```

We see an even lower number here, as one may expect between the terms 
"car" and "cat" under this metric of word similarity. 

## Conclusion

That wraps up this tutorial on natural language processing in Python.

[Part 5 of Natural Language Processing in Python][3]


[1]: http://vprusso.github.io/blog/2018/natural-language-processing-python-2/
[2]: https://www.youtube.com/watch?v=0Rc3452U6b8
[3]: http://vprusso.github.io/blog/2018/natural-language-processing-python-4/
[4]: https://en.wikipedia.org/wiki/WordNet
[5]: https://wordnet.princeton.edu
[6]: https://arxiv.org/pdf/cmp-lg/9406033.pdf
