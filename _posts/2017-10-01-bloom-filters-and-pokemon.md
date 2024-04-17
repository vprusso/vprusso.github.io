---
layout: post
comments: true
title:  "Bloom Filters and Pokemon"
date:   2017-10-01 1:58:35
cover_image: https://i.imgur.com/r55QjjN.png
excerpt: We take a look at the Bloom filter data structure with some help from Pokemon. 
categories: bloom filters, data structures, computer science, programming, python, pokemon
tags:
- bloom filters
- data structures
- computer science
- programming
- python
- pokemon
---

<p align="center">
    <center>
        <figure>
            <img src="https://i.imgur.com/r55QjjN.png" alt="Professor Oak on Bloom filters."/>
        </figure>
    </center>
</p>

In this post, we will briefly go over the probabilistic data structure referred to as a *Bloom filter*. We'll be using
Pokémon to help us in understanding the general concept of how to make use of such a data structure. The [Jupyter
notebook corresponding to this post may be found on my GitHub page here][1]:

[1]: https://github.com/vprusso/youtube_tutorials/blob/master/data_structures/Bloom%20Filters%20and%20Pokemon.ipynb 

If you prefer, there is also an accompanying video that goes along with this post here:
<div style="text-align:center">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/U8Ni1yJ8ZS4" frameborder="0" allowfullscreen></iframe>
</div>

# TL;DR

>Bloom filters: "Lightweight" version of a hash table. Both hash tables and Bloom filters support efficient insertions
and lookups. Bloom filters are more space efficient than hash tables, but this comes at the cost of having "false
positives" for entry lookup. That is, Bloom filters can say with certainty that an element has not been inserted (no
possibility of false negatives), but may indicate an element has been inserted when it has in fact not been (false
positive). 

# When should I use a Bloom filter?

>"I want a data structure that allows for fast lookups and insertions. I care about how much space the data structure
uses. I don't care if the data structure sometimes indicates an item is present when in fact it is not."

## Example:

I run a website and want to keep track of IP addresses that are blocked and I don't particularly care if a blocked IP
address is occasionally able to access my website, but I do care if someone not on the blocked list is unable to access
the site.

[More examples found on Wikipedia][2].

[2]: https://en.wikipedia.org/wiki/Bloom_filter#Examples "Wikipedia Bloom filter examples."

# Bloom Filter: Toy Example in Python

In order to illustrate how a Bloom filter works let's consider a toy example. We start with a *bit vector*; a vector whose elements are $0$ or $1$. To start, we initialize the bit vector to all zeros. For the purposes of this toy example, we will restrict our attention to a bit vector of size $20$. 

```python
bit_vector = [0] * 20
print(bit_vector)
```

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


The next ingredient we require is the use of a couple *hash functions*, that is, a function that maps data of arbitrary
size to data of a fixed size. The types of hash functions used in Bloom filters are generally not of the "cryptographic
variety", for example, one usually wouldn't use something like [MD5][3]. Non-cryptographic hash functions like
[Murmur][4] and [FNV][5] are mostly used, primarily for their speed over most cryptographic hash functions.  

There is a nice module in Python called [`pyhash`][6] that consists solely of non-cryptographic hashes. 

[3]: https://en.wikipedia.org/wiki/MD5 "Wikipedia MD5."
[4]: https://en.wikipedia.org/wiki/MurmurHash "Wikipedia Murmur hashes."
[5]: https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function "Wikipedia FNV hashes."
[6]: https://pypi.python.org/pypi/pyhash "Pyhash Python module."


```python
import pyhash
```

Let's combine the *bit vector* and *non-cryptographic hash functions* to put together a toy example of a Bloom filter.
In our example, let's say we're using our Bloom filter as a Pokédex; a device to keep track of the Pokémon we have
caught. Each time we catch a Pokémon, we update our Pokédex by running the name of the Pokémon through two hash
functions. The output of the hashes indicates which bits to flip in our bit vector. 

Hashing the strings "Pikachu" and "Charmander" using the FNV hash algorithm mod 20 (since 20 is the size of our bit
vector in this example) results in 13 and 5. Likewise, hashing the same strings using the Murmur hashing algorithm mod
20 results in 10 and 9, respectively. 

<p align="center">
    <center>
        <figure>
            <img src="https://i.imgur.com/yq1pefN.png" alt="Feeding the Pokemon strings into the hash functions."/>
        </figure>
    </center>
</p>

We use the outputs of the above hash algorithms to flip the bits located at the respective indices. For instance:

<p align="center">
    <center>
        <figure>
            <img src="https://i.imgur.com/7j7hK5H.png" alt="Resulting bit vector once we've hashed the Pokemon strings."/>
        </figure>
    </center>
</p>

The following Python code achieves what we described above:

```python
# Define FNV and Murmur hash functions from Pyhash.
fnv_hasher = pyhash.fnv1_32()
murmur_hasher = pyhash.murmur3_32()

# Calculate output of FNV and Murmur hash for Pikachu and Charmander.
fnv_hash_pikachu = fnv_hasher("Pikachu") % 20
murmur_hash_pikachu = murmur_hasher("Pikachu") % 20

fnv_hash_charmander = fnv_hasher("Charmander") % 20
murmur_hash_charmander = murmur_hasher("Charmander") % 20

# Print the output of FNV and Murmur hashes.
print("FNV hash output for Pikachu: " + str(fnv_hash_pikachu))
print("Murmur hash output for Pikachu: " + str(murmur_hash_pikachu))

print("FNV hash output for Charmander: " + str(fnv_hash_charmander))
print("Murmur hash output for Charmander: " + str(murmur_hash_charmander))

# Flip the bits of bit_vector in the corresponding locations from above hashes.
bit_vector[fnv_hash_pikachu] = 1
bit_vector[murmur_hash_pikachu] = 1

bit_vector[fnv_hash_charmander] = 1
bit_vector[murmur_hash_charmander] = 1

print(bit_vector)
```

    FNV hash output for Pikachu: 13
    Murmur hash output for Pikachu: 10
    FNV hash output for Charmander: 5
    Murmur hash output for Charmander: 9
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0]


Walking in the tall grass, a wild Bulbasaur appears!
<p align="center">
    <center>
        <figure>
            <img src="https://i.imgur.com/c0mA46j.png" alt="Bulbasaur."/>
        </figure>
    </center>
</p>

Let's consult our Bloom filter Pokédex to see if we've already captured Bulbasaur or not


```python
# Calculate output of FNV and Murmur hash for Bulbasaur.
fnv_hash_bulbasaur = fnv_hasher("Bulbasaur") % 20
murmur_hash_bulbasaur = murmur_hasher("Bulbasaur") % 20

# Print the FNV and Murmur hashes of Bulbasaur.
print("FNV hash output for Bulbasaur: " + str(fnv_hash_bulbasaur))
print("Murmur hash output for Bulbasaur: " + str(murmur_hash_bulbasaur))
```

    FNV hash output for Bulbasaur: 11
    Murmur hash output for Bulbasaur: 8


<p align="center">
    <center>
        <figure>
            <img src="https://i.imgur.com/WoQqlwC.png" alt="Adding Bulbasaur to our Bloom filter."/>
        </figure>
    </center>
</p>

Looks like the outputs of hashing "Bulbasaur" (mod 20) result in an output of $11$ and $8$ for the FNV and Murmur hashes
respectively. Consulting our Bloom filter bit vector, we check whether the bits are flipped "on" or "off" at these
indices:


```python
print(bit_vector[fnv_hash_bulbasaur])
print(bit_vector[murmur_hash_bulbasaur])
```

    0
    0


Since the entries for both of the hash functions for Bulbasaur result in $0$, Bulbasaur is not in our Pokédex. Let's
capture Bulbasaur and appropriately modify out Bloom filter Pokédex to reflect this. 


```python
# Flip the bits in the Bloom filter to indicate that we now have captured Bulbasaur.
bit_vector[fnv_hash_bulbasaur] = 1
bit_vector[murmur_hash_bulbasaur] = 1
print(bit_vector)
```

    [0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0]


BULBASAUR was caught!

# How big does our Bloom filter need to be?

In our toy example, the size of the Bloom filter consists of 20 entries. For our Pokedexing needs, the length of the
filter is most likely too small to be useful. To see why, let's assume we've caught 150 of the 151 of the Pokémon. 


```python
# 150 of the 151 Pokemon (excluding Pidgey)
caught_pokemon = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", 
                  "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", 
                  "Kakuna", "Beedrill", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", 
                  "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran (female)", "Nidorina",
                  "Nidoqueen", "Nidoran (male)", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", 
                  "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", 
                  "Paras", "Parasect", "Venonat", "Venomoth", "Diglet", "Dugtrio", "Meowth", "Persian", "Psyduck",
                  "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath",
                  "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", 
                  "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash",
                  "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetc'd", "Doduo", "Dodrio", "Seel",
                  "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onyx",
                  "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", 
                  "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", 
                  "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", 
                  "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros",
                  "Magikarp", "Gyrados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", 
                  "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos",
                  "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew" ]
pokedex_bloom_filter = [0] * 20

# Update the Bloom filter positions of the bit vector.
for pokemon in caught_pokemon:
    fnv_hash = fnv_hasher(pokemon) % 20
    murmur_hash = murmur_hasher(pokemon) % 20
    
    pokedex_bloom_filter[fnv_hash] = 1
    pokedex_bloom_filter[murmur_hash] = 1
    
# The Pokedex Bloom filter.    
print(pokedex_bloom_filter)
```

    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]


Unbeknown to our Pokémon trainer, the last Pokemon they have yet to catch is the elusive Pidgey. As luck should have it,
the trainer walks into some tall grass and a wild Pidgey appears! 

<p align="center">
    <center>
        <figure>
            <img src="https://i.imgur.com/rZ4o322.png" alt="Pidgey"/>
        </figure>
    </center>
</p>

Before deciding to catch Pidgey, the trainor pulls out their Pokédex to see if they're already caught it.


```python
fnv_hash_pidgey = fnv_hasher("Pidgey") % 20
murmur_hash_pidgey = murmur_hasher("Pidgey") % 20

print(pokedex_bloom_filter[fnv_hash_pidgey])
print(pokedex_bloom_filter[murmur_hash_pidgey])
```

    1
    1


Hmm, okay, well the entries in the Bloom filter indicate that Pidget *may* be in the Pokédex already. As mentioned
before, Bloom filters will only give false positives, never false negatives. That is to say that our Pokédex will never
say that Pidgey is *not* in our Pokédex if it *actually is*, but it *may* say that Pidgey is in our Pokédex, *even if it
actually isn't*.

This is precisely the issue we're having at the moment. We, the audience, know that Pidgey is not in the Pokédex. Since
the size of the Bloom filter is only of size $20$ and the total number of Pokémon is $151$, there will inevitably be
some hash collisions leading to a situation like the one we're encountering now. 

Unfortunately, our Pokémon trainer decides that Pokéballs are expensive and misses their opportunity to complete their
Pokédex. If Professor Oak gave our trainer a Bloom filter Pokédex with a larger number of entries, he could have reduced
the probability of this unfortunate event. 

As it happens, the rate of false positives is approximately 

$$(1 - e^{-kn/m})^k$$, 

where $k$ is the number of hash functions used, $n$ is the number of inserted elements, and $m$ is the total number of
bits, or equivalently, the length of the bit vector used for the Bloom filter. 

More information on the above equation can be found on the Wikipedia page where there is a more [in-depth discussion on
the probability of obtaining false positives][7].

So in order to reduce the probability of collisions, we need to tweak the parameters $k$ and $m$; the number of hash
functions we use and the size of the bit vector, respectively. Assuming that the hash function selects an index in the
bit vector completely at random, the probability that an element in the Bloom filter is *not* set to $1$ can be
calculated by 

$$ 1 - \frac{1}{m}.$$

By taking this to the $k^{th}$ power, we have the probability that the elements in the Bloom filter are *not* set to $1$
which can be calculated by 

$$ \left( 1 - \frac{1}{m} \right)^k.$$ 

If we have inserted $n$ Pokémon into our Bloom filter, the probability that a certain bit in the vector is still $0$ is
given by 

$$\left( 1 - \frac{1}{m} \right)^{kn}.$$

For instance, in our toy example, we had that the size of the bit vector for the Bloom filter was $m = 20$. We made use
of $k = 2$ hash functions, FNV and Murmur. When we caught Pikachu and Charmander, this sets the value corresponding to
the total number of Pokémon in our Pokédex to $n = 2$. Therefore the probability that a certain element in the bit
vector is still $0$ before capturing Bulbasaur is given as 

$$
\left( 1 - \frac{1}{20} \right)^{4} \approx 0.81450. 
$$

Not terrible, but as we catch more Pokémon, this number drops quite a bit. Since there are 151 Pokémon in total, it
doesn't take long for the probability of any element in the bit vector to still be $0$ to be quite low. For instance,
even when we've caught 20 Pokémon, there's only a $0.1285$ chance of any element in the vector still being $0$ 

$$
\left( 1 - \frac{1}{20} \right)^{40} \approx 0.1285.
$$

One thing that Professor Oak must do then is to stop being so stingy and allocate more space for the Bloom filter. The
other important thing to keep note of is the number of hash functions to use. If we have too many hash functions, then
our Bloom filter will be quite slow, not to mention the entries in our Bloom filter will fill up faster with more hash
functions in use. Alternatively, if we limit our hash functions, that increases the chance that we obtain a higher
number of false positives. 

Luckily, if we select both $m$ and $n$, the following formula is known to give us an optimal value for $k$, the number
of hash functions to use 

$$
k = (m/n)\ln(2),
$$

such that the probability that the Bloom filter erroneously claims that a Pokémon is in the Pokédex is minimized. Again,
that function is given as 

$$
\left(1 - e^{-kn/m} \right)^k.
$$

Using this, let's try to come up with a Bloom filter that performs better than our toy example for the purposes of being
used for a Pokédex. 

First, (at least for Pokémon Red and Blue) the total number of Pokémon one can encounter is 151.

<p align="center">
    <center>
        <figure>
            <img src="https://i.imgur.com/3hj2wCz.png" alt="Set of Pokemon in the Red/Blue universe."/>
        </figure>
    </center>
</p>

So we can pick $n = 151$. For $m$, we can pick something quite a bit larger than that, just to be safe. Let's set $m
= 1000$ as the number of entries in our bit vector for our Bloom filter. Using these parameters, we can compute $k$.

[7]: https://en.wikipedia.org/wiki/Bloom_filter#Probability_of_false_positives


```python
from __future__ import division
import math

# Total number of Pokemon in the Blue/Red universe.
n = 151
# Selecting parameter m to be larger than what we require. 
m = 1000
# Calculating the optimal k to determine how many hash functions we should use. 
k = (m//n)*math.log(2,math.e)
print(k)
```

    4.15888308336


With these selected parameters, the probability that we encounter a false positive is


```python
# How likely is it with the parameters n,m, and k that we encounter a false positive?
(1 - math.e**(-k*n/m))**k
```




    0.04189505785699619



Selecting the parameters for a Bloom filter is a relatively indirect process. Are we okay with accepting this for our
purposes? Perhaps for catching Pokémon, this probability is low enough to be just fine for our purposes. However, if we
want to push it a bit lower, can select a different value for $m$, recompute $k$, and see if the probability is any
smaller. 

Hopefully, this post was useful to you in understanding what Bloom filters are, how they work, and optimistically
achieved this in a relatively entertaining way. If you have any questions, comments, or corrections, please do not
hesitate to comment below and let me know! Thanks again for taking the time to read!
