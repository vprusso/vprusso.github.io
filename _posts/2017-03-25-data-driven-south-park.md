---
layout: post
comments: true
title:  "Data Driven South Park"
cover_image: http://i.imgur.com/mdYP6A7.png
date:   2017-03-25 1:58:35
categories: Data Science, Math, South Park, Neural Networks
excerpt: We perform data analysis and some basic natural language processing on 70,000 lines of South Park dialog. We then train a recurrent neural network on the South Park dialog.  
tags:
- data science
- math
- south park
- neural networks
---

Aside from seasons 1 through 9 of *"The Simpsons"*, the only other show that comes close to my all-time favorite is *"South Park"*. I grew up watching Cartman, Stan, Kyle, and Kenny, and I'm sure many people reading this have as well.  

I was particularly excited to see that one of the users on <a href="https://www.kaggle.com">Kaggle</a> (<a href="https://www.kaggle.com/tovarischsukhov">Ksenia Sukhova</a>) uploaded an <a href="https://www.kaggle.com/tovarischsukhov/southparklines"> entire line-by-line transcription of seasons 1 to 18 of *"South Park"*</a>. What interesting things can we do with over 70,000 lines of dialog? Well, let's find out!

This post is split up into two primary sections:

* [Analysis and Natural Language Processing](#basic-analysis-and-natural-language-processing):
We do some topical data analysis on the dialog, complete with pretty graphs. If you wish to perform your own analysis, the tools to do so are provided in this section.

* [Recurrent Neural Networks and South Park](#recurrent-neural-networks-and-south-park):
We construct a neural network that learns from the "*South Park*" dialog. If you wish to train your own neural network on a large corpus of your own text, we provide a guide to do so. 

All of the software and supplementary files I wrote for this post is available on <a href="https://github.com/vprusso/south_park_data">my Github page</a>. 

## Basic Analysis and Natural Language Processing

We start off by investigating some high-level details that may be extracted from the "*South Park*" dialog.

#### Swearing Frequency

It's no secret that swearing is a common occurrence on "*South Park*". For certain swear words, we can take a peek and see just how common they are for each of the 18 seasons. The following graph plots the frequency of words "Ass", "Damn/Dammit", "Fuck", and "Shit" across each of the 18 seasons.
<p align="center">
    <center>
        <figure>
            <img src="http://i.imgur.com/mdYP6A7.png" alt="Plot for occurence of swear word by South Park season."/>
        </figure>
    </center>
</p>
The word "ass" started off really strong in the earlier seasons has progressively declined. We see a spike in season 5 for the word "shit" that is attributed to one particular episode.

Episode 1 of season 5 entitled *"It Hits the Fan"* was noteworthy mostly for the abundant use of the word "shit" throughout the entire episode. An excerpt from <a href="http://www.nytimes.com/2001/06/25/business/mediatalk-south-park-takes-gross-to-new-frontier.html">an article by the New York Times</a> states that

> Throughout the episode, the profanity "shit" or "shitty" are exclaimed uncensored a total of 162 separate times; in syndicated or re-aired versions of this episode, a counter in the bottom left corner of the screen counts the number of times the word has been uttered. The written occurrences are not counted, but "shit" is written 38 times, which puts the "shit"s up to an even 200. "Shit" is uttered roughly once every eight seconds; one such count includes the episode's theme song in the calculation.

#### The Loudest Mouth

Out of the primary four *South Park* characters, Cartman, Stan, Kyle, and Kenny, which one has the loudest mouth? We can start off by analyzing how many lines of dialog each character has in the entire show. 

<p align="center">
    <center>
        <figure>
            <img src="http://i.imgur.com/u4nIjQq.png" alt="Plot for total lines of dialog per character on South Park."/>
        </figure>
    </center>
</p>

For anyone who has watched the show, this comes as no surprise. Cartman is undoubtedly the one with the biggest mouth, and Kenny is hardly audible through his orange parka.

#### The Dirtiest Mouth

We can also ask a similar question about which one of Cartman, Stan, Kyle, and Kenny has the dirtiest mouth, or uses the most swear words. Starting from the top-left, the above pie charts correspond clockwise to "Ass", "Damn/Dammit", "Fuck", and "Shit", respectively in the following graphs.

<p align="center">
    <center>
        <figure>
            <img src="http://i.imgur.com/Fam7wU4.png" alt="Proportion of swear words spoken per character on South Park."/>
        </figure>
    </center>
</p>

Again, not much of a surprise here, as Cartman appears to be responsible for the majority of the swearing between the boys. 

#### Most Common Words

The following plot gives the 50 most common words used in the dialog for the entire series of "*South Park*". I decided to not include "stop words" (words that are common and relatively meaningless from an analysis perspective: "and", "it", "I", etc.). I also eliminated a number of what I considered to be "filler words" (words such as: "oh", "get", and "could", etc.). The resulting plot gives the top 50 words used in the entire dialog.  

<p align="center">
    <center>
        <figure>
            <img src="http://i.imgur.com/XJ8uT8v.png" alt="Most common words in South Park."/>
        </figure>
    </center>
</p>

#### Performing Your Own Analysis

I've only just scratched the surface in deriving insights from the "*South Park*" data. If you're so inclined, I encourage you to clone my <a href="https://github.com/vprusso/south_park_data">Github repository</a> and analyze the data yourself. You'll require <a href="https://www.python.org/downloads/">Python</a> as well as the <a href="http://pandas.pydata.org/">pandas</a> and <a href="http://www.nltk.org/">nltk</a> toolkits installed. If you install Python's pip:

    sudo apt-get install python-pip

You'll be able to install the other necessary packages using pip:

    sudo pip install numpy
    sudo pip install pandas
    sudo pip install nltk

You'll also require the code on my repository, that may be cloned as 

    git clone https://github.com/vprusso/south_park_data.git

Once you've cloned the repository, you can load up the data into a pandas dataframe

    df = read_south_park_data('sp_season_dialog.csv')

Here are a few examples of questions you can ask using the "*South Park*" data as well as my code:

*Question:* How many times is the word "dude" said in all of the seasons 1 to 18:

    print (word_count_by_season_and_episode(df, word="dude"))
    2087

*Question:* How many times is the word "dude" said in all of season 1:

    print(word_count_by_season_and_episode(df, word="dude", seasons=['1']))
    139

*Question:* How many times is the word "dude" said in seasons 1,2,3, and 10:

    print(word_count_by_season_and_episode(df, word="dude", seasons=['1','2','3','10']))
    644

*Question:* How many times is the word "dude" said in season 1 and in episodes 1 and 2:

    print(word_count_by_season_and_episode(df, word="dude", seasons=['1'], episodes=['1','2']))
    21

*Question:* How many times is the word "dude" said in all of the seasons 1 to 18 by Cartman:

    print(word_count_by_season_and_episode(df, word="dude", character="Cartman"))
    427

This is just a small sample of the flavor of questions one may ask. If you manage to do something neat with this data, please do post a link in the comments!

## Recurrent Neural Networks and South Park

### A South Park-based Recurrent Neural Network

In this section, we'll be training a recurrent neural network on all of the *"South Park"* dialog from seasons 1 to 18. The result will be a model that will ideally output syntactic structure similar to that of a character on *"South Park"*. 

In order to achieve this, I followed Andrej's excellent <a href="http://karpathy.github.io/2015/05/21/rnn-effectiveness/">blog post on recurrent neural networks</a>. I also used the software package Andrej wrote, <a href="https://github.com/karpathy/char-rnn">char-rnn</a>, as well as the slightly improved version by Justin Johnson under the name <a href="https://github.com/jcjohnson/torch-rnn">torch-rnn</a>.

<a href="https://en.wikipedia.org/wiki/Artificial_neural_network">Neural networks</a> have seen a resurgence since their original inception since arguably the 1940s. When neural networks were originally devised, they served more as a theoretical construct than a practical one due to computational constraints. With our present levels of computing power, neural networks have become more practical and have been used in a number of very intriguing ways. 

This post is surely not broad enough to cover the expansive landscape of neural networks. However, there are a number of wonderful resources on the topic including Michael Nielsen's book entitled <a href="http://neuralnetworksanddeeplearning.com/">"Neural Networks and Deep Learning"</a>. If you'd like to see some other practical examples of neural networks, the <a href="https://www.tensorflow.org/get_started/get_started">TensorFlow tutorial</a> is also very well written. I also have another post where I used a <a href="http://vprusso.github.io/blog/2016/tensor-flow-neural-net-breast-cancer/">neural network created by TensorFlow to distinguish between either malignant or benign breast cancer tumors</a> that may also be of interest. 

To train the recurrent neural network, I extracted lines from the *"South Park"* dialog data and fed this in as input. I used the <a href="https://github.com/jcjohnson/torch-rnn">torch-rnn</a> software to perform the training (more detail on this is in the next section). After the neural network was trained I invoked the torch-rnn interface to determine what syntactic structure the model could produce.

Keep in mind that while the sentences may sound a bit nonsensical the neural network started with nothing. That is, it learned grammatical structure, punctuation, and to a greater extent how English functions, etc. in addition to constructing sentences in a style similar to that of "*South Park*". I should also mention that since I wasn't training on a machine with a GPU, I had less time to play around with some of the settings of how the neural network learns to see if different parameters gave better results. Even so, here are a few interesting lines the neural network was able to generate:

> Ah, where's my ass! We're all gonna screw me together. 

> Cartman! A Magic Cartman.

> No way, "Who was crapping with the seat down?" Hella no!

> Yes, children, this is!

I don't think Matt Stone and Trey Parker will be writing in this character anytime soon, but who knows!

### Train Your Own Recurrent Neural Network 

Maybe you'd like to train your own neural network on a corpus of text that you have. As <a href="http://karpathy.github.io/2015/05/21/rnn-effectiveness/">Andrej's blog post</a> mentions, these recurrent neural networks are very effective at determining structure in not only basic text, but also software syntax, mathematical equations, etc. 

In this section, I'll tell you precisely how to train your recurrent neural network, from start to finish. I'll go into more detail about how to get each of these working, but the general overview will be based on:

* <a href="https://m.do.co/c/8e3f1a477d6d">DigitalOcean</a>,
* <a href="http://torch.ch/docs/getting-started.html#_">Torch</a>,
* <a href="">torch-rnn</a> (a slightly faster version of char-rnn).

For this example, we'll be using the <a href="">dialog text on my Github page</a> as our training data. You're free to use any text file you'd like. If you want to use your own data, that's great, but keep in mind that generally the more data you have to work with, the better. 

#### 1. Create a droplet at <a href="https://m.do.co/c/8e3f1a477d6d">DigitalOcean</a>. 

In order for this tutorial to be as general as possible, I'm assuming you either have a personal machine with Ubuntu on it or if you don't, you can rent computing time at Digital Ocean. I used this service myself for this blog post and cannot recommend their services highly enough. 

The wonderful thing about <a href="https://m.do.co/c/8e3f1a477d6d">DigitalOcean</a> is you pay for only the computing time that you use. If you want to spin up an Ubuntu instance and only use it for the time necessary to train the network and then destroy the instance, you are only charged for the time and computing power you use.

Again, if you have your own Ubuntu machine, feel free to follow along, or spin up one at <a href="https://m.do.co/c/8e3f1a477d6d">DigitalOcean</a> by following the steps laid out in the <a href="https://www.digitalocean.com/community/tutorials/how-to-create-your-first-digitalocean-droplet-virtual-server">"How to Create Your First DigitalOcean Droplet Virtual Server"</a>.

#### 2. Install dependencies. 

This step will closely follow the documentation for the <a href="">torch-rnn project</a>. Once you have your droplet setup, SSH into it (<a href="https://www.digitalocean.com/community/tutorials/how-to-create-your-first-digitalocean-droplet-virtual-server#step-nine-—-log-in-to-your-droplet">Step 9 in the Digital Ocean tutorial</a>). Once you're logged in, run the following commands to install Python and a library for processing HDF5 files:

    sudo apt-get -y install python2.7-dev
    sudo apt-get install libhdf5-dev

The neural network requires the <a href="">Torch</a> framework. To install Torch, run the following commands:

    git clone https://github.com/torch/distro.git ~/torch --recursive
    cd ~/torch; bash install-deps;
    ./install.sh
    source ~/.bashrc

This will take some time to install, as the framework is quite large. 

    luarocks install torch
    luarocks install nn
    luarocks install optim
    luarocks install lua-cjson

Now we can go ahead and clone the torch-hdf5 from Github.

    cd ..
    git clone https://github.com/deepmind/torch-hdf5
    cd torch-hdf5
    luarocks make hdf5-0-0.rockspec

We've got the minimal amount of what we need now to train our network. You can get more fancy with it by enabling CUDA support for GPUs. I encourage you to do so if you're so inclined, but it's not necessary. Enabling the GPU will make training the neural network faster, but in this example, we won't be using them. 

#### 3. Train the neural network.

Upload your training data to the DigitalOcean droplet you've created (in our example, that's the <a href="">*South Park*"" dialog data</a> entitled ``dialog.txt``). 

Navigate to the torch-rnn directory via the terminal. 

    cd torch-rnn

Before we train the network, we have to convert our ``dialog.txt`` file to an HDF5 and JSON format that torch-rnn can understand and process. Assuming your ``dialog.txt`` is in the torch-rnn directory, run the following command.

    python scripts/preprocess.py \
        --input_txt dialog.txt \
        --output_h5 dialog.h5 \
        --output_json dialog.json

Alright, our training data is ready to be fed into the neural network. Before we train the network, let's create a Linux screen so that we can start our process, logout if we wish, and log back in to check on how it's going.

    screen -S neural-net-dialog

This will open a new screen where we will start to train the network.

    th train.lua -input_h5 dialog.h5 -input_json dialog.json -gpu -1

Once this starts running, we can detach from our screen by pressing CTRL-A CTRL-D. You can then logout if you wish. If you want to take a peek at how the processing is going, SSH back into the DigitalOcean droplet and run

    screen -ls

to get a list of all of the screens running. If you want to resume the screen, just type

    screen -r N

where N is the number proceeding the name that you gave the screen. In our case, this was "neural-net-dialog". You can kill any screens that have finished by running 

    screen -X -S N

where again, N is the number proceeding the name of the screen. If you're not familiar with Linux screens, you can read more about them at the <a href="https://ss64.com/bash/screen.html">screen MAN page</a>.

#### 4. Analyze the output.

Depending on how large the training dataset is, training the neural network will take a while. In the case of the ``dialog.txt`` data, it takes about 24 hours to complete training. 

    th sample.lua -checkpoint cv/checkpoint_10000.t7 -length 2000 -gpu -1

where checkpoint_X is the name of the checkpoint file generated in the `cv` folder. This command will sample 2000 tokens of text from the trained recurrent neural network model.

And that's pretty much it. If you have any questions or comments on this, please feel free to comment on this post and I'll do my best to respond as soon as I can. Please be sure to thank both <a href="http://karpathy.github.io/">Andrej Karpath</a> and <a href="http://cs.stanford.edu/people/jcjohns/">Justin Johnson</a> for their awesome neural network tools as well as <a href="https://www.kaggle.com/tovarischsukhov">Ksenia Sukhova</a> for extracting the "*South Park*" data and to <a href="https://www.kaggle.com/">Kaggle</a> for hosting it, and let me know in the comments if you manage to do something neat from this tutorial!