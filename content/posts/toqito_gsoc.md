+++
title = "toqito is participating in Google Summer of Code for 2025"
date = "2025-03-04"
author = "Vincent Russo"
authorTwitter = "captainhamptons" #do not include @
cover = ""
tags = ["quantum_information", "quantum_software"]
keywords = ["quantum_information", "quantum_software"]
description = ""
showFullContent = false
readingTime = true
hideComments = false
draft=false
+++

I created the [toqito](https://github.com/vprusso/toqito) software project back in early 2020 as a pet project for
delving into some research questions I wanted to pursue in quantum information but felt were lacking in the Python
community. When I was a Ph.D. student, having software like toqito would have been indispensible for rapidly prototyping
ideas and attacking problems numerically. I've been continuing to build my quantum information numerical arsenal that
has been a real feather in my cap when probing into particularly thorny research questions and it's also been a ton of
fun to build and to watch grow. 

![toqito logo](/blog/toqito_logo.png)

# Google Summer of Code (GSoC)

The toqito project has grown in no small part by being part of the open-source ecosystem. Prior hackathon involvement
has served to improve the functionality and quality of toqito beyond what I could reasonably do as one person, and I'm
eternally grateful for the stellar contributions and collective interest and use of toqito by the quantum information
open-source community. This is why I am thrilled to announce that toqito will be taking part in the 2025 [Google Summer
of Code](https://summerofcode.withgoogle.com/) project under the [NumFOCUS](https://numfocus.org/) organization.

![Google Summer of Code logo](/blog/gsoc.png)

For the uninitiated, Google Summer of Code is a development program led by Google to incentivize students and new
contributors to the world of open-source. It serves as a program where these contributors can make meaningful
contributions to a variety of open-source software projects and where the contributors gain valuable experience in
working on open-source software.

If you are interested in participating (or reading this at a later point in time and interested in the initial ideas)
you can consult the listing of ideas for contributors for toqito on the NumFOCUS GitHub page
[here](https://github.com/vprusso/toqito/wiki/GSoC-2025-Projects). 

In any case, if you are so inclined to contribute to or to use toqito (whether within the context of GSoC our outside of
it), I encourage you to peruse the [issues board](https://github.com/vprusso/toqito/issues) and see if any of the
outstanding issues strike your fancy.  Additionally, if there are features that you would like to see in toqito, I
welcome any feedback and suggestions for improvements. 

# GSoC projects in toqito

I am particularly excited to see progress on two research areas that I have spent quite a lot of time thinking about and
developing software for; namely the "extended nonlocal games" and "quantum state distinguishability and
antidistinguishability". 

Extended nonlocal games are particularly close to my heart, as these abstractions were the subject of my [Ph.D.
thesis](https://arxiv.org/abs/1704.07375). These are generalizatons of nonlocal games; a well-studied area that
conceptualizes many intriguing ideas in quantum information in the language of a computer scientist. There are already
numerical tools for studying extended nonlocal games within toqito (as described in [this
tutorial](https://toqito.readthedocs.io/en/latest/tutorials.extended_nonlocal_games.html)), but there are still many
areas in which this games can be applied and studied further that I find fascinating. For instance, many problems in
[quantum key distribution](https://en.wikipedia.org/wiki/Quantum_key_distribution) (QKD) and [quantum
steering](https://en.wikipedia.org/wiki/Quantum_steering) can be conceptualized by the abstraction of an extended
nonlocal game.

![extended nonlocal game](/blog/extended_nonlocal_game.svg)

Likewise, quantum state distinguishability is a field that is so foundational to the area of quantum information and yet
has many open problems and areas to explore in which numerical methods can be quite useful in probing into.

In short, I am thrilled to see the toqito project continue to grow, expand, and to be adopted by researchers in the
field of quantum information. It is a real treat and pleasure to be able to develop software that is useful not just to
my own selfish research pusuits, but the pursuits of others as well. I look forward to having toqito grow beyond just
"my" project and to instead be acquired as a collective tool and possession of the community at large for doing
legitimately interesting things and making research in this area easier and more enjoyable.
