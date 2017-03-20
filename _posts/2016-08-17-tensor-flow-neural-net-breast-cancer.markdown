---
layout: post
comments: true
title:  "A Neural Network in TensorFlow for Classifying Cancer Data"
date:   2016-08-19 2:58:35
categories: tensorflow, machine learning, data science, neural networks
tags:
- tensorflow
- machine learning
- data science
- neural networks
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

# A neural network in TensorFlow for classifying UCI breast cancer data

I've recently been trying my hand at Google's <a href="https://www.tensorflow.org/">TensorFlow</a> library. So far, I think it's really slick, and I've only just started sinking my teeth into what it can do. 

In this post, we'll be using TensorFlow to build a neural network that will be used to classify cancerous breast tumors based on the data provided by the <a href="http://archive.ics.uci.edu/ml/">UCI Machine Learning Repository</a>. If you've looked around at all for neural network tutorials, you've no doubt stumbled on examples explaining how to use a neural network to classify digits from the MNIST data set. Indeed, this is the "Hello world!" application for neural networks. The purpose of this post is to show another less conventional example of how to build and train a neural network using TensorFlow, and will optimistically be of use to someone getting started with using the TensorFlow library. 

# Obtaining and cleaning the data

As mentioned, we will be obtaing the data from the <a href="https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+(Diagnostic)">UCI repository .</a> The actual data text file we will be using is hosted <a href="https://archive.ics.uci.edu/ml/machine-learning-databases/breast-cancer-wisconsin/breast-cancer-wisconsin.data">here</a>, and a corresponding description of what each column in the text file represents is found <a href="https://archive.ics.uci.edu/ml/machine-learning-databases/breast-cancer-wisconsin/breast-cancer-wisconsin.names">here</a>. For our purposes, we will be slightly modifying the data file with some appropriate header information to allow us to process it in TensorFlow.

For this tutorial, I will be assuming you have TensorFlow and the SciPy stack already installed and are using Python version 3. Let's start by importing what we will need: 


```python
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import tensorflow as tf
import numpy as np
import pandas as pd
```

For our imports, we have ``tensorflow`` to build our neural network and ``numpy`` and ``pandas`` for some useful data manipulations.

Now, if we look at our data text file, we notice that each column corresponds to some quantity for each patient. For instance, the first column is the "sample code number", the second column is the "clump thickness" of the tumor, and the last column is a value that corresponds to whether the tumor found was determined to be "benign" (a value of 2) or "malignant", (a value of 4). 

Let's first modify the data text file so that we have a header at the beginning of the file so that when we store our data into a data frame, we can refer to any element by name.


```python
data_file_name = "breast-cancer-wisconsin.data.txt"
first_line = "id,clump_thickness,unif_cell_size,unif_cell_shape,marg_adhesion,single_epith_cell_size,bare_nuclei,bland_chrom,norm_nucleoli,mitoses,class"
with open(data_file_name, "r+") as f:
    content = f.read()
    f.seek(0, 0)
    f.write(first_line.rstrip('\r\n') + '\n' + content)
```

The variable ``first_line`` is a string that has a list of names that correspond to the data in each column. Now, let's read in the recently modified text file into a ``pandas`` data frame.


```python
df = pd.read_csv(data_file_name)
```

If you have consulted the corresponding description of our data (again, provided <a href="https://archive.ics.uci.edu/ml/machine-learning-databases/breast-cancer-wisconsin/breast-cancer-wisconsin.names">here</a>), you will have noticed that certain data points are marked with a '?'. This question mark indicates that the particular data point in question is missing. Whether this was the result of an overworked scientist or just some other anomaly, we can't be sure. So in our case, we're going to simply drop these from our dataset.

In "the wild", datasets including missing values are a common thorn in the side of the machine learning practitioner. Simply dumping the data is less than ideal, especially since more data generally aids in building a model with superior predictive power. There are many less naive ways of dealing with missing data points, such as <a href="https://en.wikipedia.org/wiki/Imputation_(statistics)">imputation</a>, but for our purposes, we will take the naive approach for now. 


```python
df.replace('?', np.nan, inplace = True)
df.dropna(inplace = True)
```

There is another slight modification we need to apply to our data, and that is to drop the column in our data that corresponds to the patient's ID. This piece of information has absolutely no predictive power when it comes to determining whether a tumor is cancerous or not, and will only confuse our model if we keep it in when training our neural network. 


```python
df.drop(['id'], axis = 1, inplace = True)
```

Before making the next change, let's briefly remind ourselves what we are trying to predict from this data. In short, we want to know based on the information for each patient whether or not the tumor they have is benign or malignant. The way in which this data is encoded in our text file is "2" for benign and "4" for malignant. That is when we build our neural network we can expect one of two outcomes for the prediction. 

For TensorFlow, we're going to want to encode these two cases not as "2" and "4", but as "0" and "1", to explicitly tell TensorFlow that there are two possible classes of output. 


```python
df['class'].replace('2', 0, inplace = True)
df['class'].replace('4', 1, inplace = True)
```

Finally, let's now write our combined data to a ".csv" file.


```python
df.to_csv("combined_data.csv", index = False)
```

# Preparing the data: Train / test split

We now have all of our data in one large ".csv" file. From this combined data file, I have gone ahead and split the data into two separate files, one for <a href="http://vprusso.github.io/csv/cancer_training.csv">training our neural network</a>, and one for <a href="http://vprusso.github.io/csv/cancer_test.csv">testing the accurarcy of our model</a>. Go ahead and download those files to your local working directory. 

If you take a look in each of these files, they now have a comma-separated header that looks something like this:


```python
# Number of rows, Number of columns (excluding the class), benign, malignent
```

That is, we have a comma-separated list of elements prepended to the beginning of the file for our train and test data sets that let TensorFlow know how many rows, columns (excluding the column we are trying to predict), and list of potential outcomes for our model (in our case; benign or malignant). 

You may be curious as to how I split the train and test data. My method was to simply pick 6 random examples from the combined data set, and place them into the ``cancer_test.csv`` file. The remaining elements from the combined data set comprise the ``cancer_training.csv`` file.

Now that we have our data pruned, we can get on to building our neural network.

# Building the neural network

Okay. Let's go ahead and read in our data:


```python
CANCER_TRAINING = "cancer_training.csv"
CANCER_TEST = "cancer_test.csv"

training_set = tf.contrib.learn.datasets.base.load_csv(filename = CANCER_TRAINING,
                                                       target_dtype = np.int)
test_set = tf.contrib.learn.datasets.base.load_csv(filename=CANCER_TEST,
                                                   target_dtype = np.int)
```

Note that the ``target_dtype = np.in`` signals to TensorFlow that the predictive element that our neural network wants to compute is an integer--either 0 or 1 to denote either benign or malignant. 


```python
classifier = tf.contrib.learn.DNNClassifier(hidden_units=[10,20,10],
                                            n_classes=2,
                                            model_dir="/tmp/cancer_model")
```

For our classifier, we are signaling to TensorFlow to build a deep neural network consisting of 3 hidden layers, where the first and third layers have 10 neurons and the second consists of 20 neurons. The ``n_classes`` argument lets TensorFlow known that there are two possible classes to select between; namely benign (0) or malignant (1). 

Now we are going to train our neural network. TensorFlow makes this very easy, as wejust have to send our training data through a fit function. 


```python
classifier.fit(x = training_set.data,
               y = training_set.target,
               steps = 2000)
```

Using the ``steps`` argument, we specify that we want to train our network for a total of 2000 steps.

And that's that! We now have our trained neural network. We can now apply it to some test data to see how it fairs. Let's apply our neural network to the 6 examples found in the ``cancer_test.csv`` file. In doing so, this will allow us to calculate the accuracy of our model.


```python
accuracy_score = classifier.evaluate(x = test_set.data,
                                     y = test_set.target)["accuracy"]
print('Accuracy: {0:f}'.format(accuracy_score))
```

    Accuracy: 1.000000


Looks like our neural network was able to perfectly classify all 6 examples found in the test set! What's more, let's say we obtain a new source of data entirely outside of our training or test sets. 


```python
new_samples = np.array(
    [[5,10,8,4,7,4,8,11,2], [5,1,1,1,1,1,1,1,2]], dtype=float)
y = classifier.predict(new_samples)
print('Predictions: {}'.format(str(y)))
```

    Predictions: [1 0]


# Complete software listing

The complete software listing for what we covered in this post is provided below. Recall, you will require the following <a href="http://vprusso.github.io/csv/cancer_training.csv">training</a> and <a href="http://vprusso.github.io/csv/cancer_test.csv">test</a> files along with the data text file from <a href="https://archive.ics.uci.edu/ml/machine-learning-databases/breast-cancer-wisconsin/breast-cancer-wisconsin.data"></a> to run it. The software along with the data files are also hosted on the following <a href="https://github.com/vprusso/tf_nn_cancer">Github repository.</a>


```python
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import tensorflow as tf
import numpy as np
import pandas as pd

# Preparing the data:
data_file_name = 'breast-cancer-wisconsin.data.txt'

first_line = "id,clump_thickness,unif_cell_size,unif_cell_shape,marg_adhesion,single_epith_cell_size,bare_nuclei,bland_chrom,norm_nucleoli,mitoses,class"
with open(data_file_name, "r+") as f:
	content = f.read()
	f.seek(0, 0)
	f.write(first_line.rstrip('\r\n') + '\n' + content)

df = pd.read_csv(data_file_name)

df.replace('?', np.nan, inplace = True)
df.dropna(inplace=True)
df.drop(['id'], axis = 1, inplace = True)

df['class'].replace('2',0, inplace = True)
df['class'].replace('4',1, inplace = True)

df.to_csv("combined_data.csv", index = False)

# Data sets
CANCER_TRAINING = "cancer_training.csv"
CANCER_TEST = "cancer_test.csv"

# Load datasets.
training_set = tf.contrib.learn.datasets.base.load_csv(filename=CANCER_TRAINING,
                                                       target_dtype=np.int)
test_set = tf.contrib.learn.datasets.base.load_csv(filename=CANCER_TEST,
                                                   target_dtype=np.int)

# Build 3 layer DNN with 10, 20, 10 units respectively.
classifier = tf.contrib.learn.DNNClassifier(hidden_units=[10, 20, 10],
                                            n_classes=2,
                                            model_dir="/tmp/cancer_model")

# Fit model.
classifier.fit(x=training_set.data, 
               y=training_set.target, 
               steps=2000)

# Evaluate accuracy.
accuracy_score = classifier.evaluate(x=test_set.data,
                                     y=test_set.target)["accuracy"]
print('Accuracy: {0:f}'.format(accuracy_score))

# Classify two new cancer tumor samples.
new_samples = np.array(
    [[5,10,8,4,7,4,8,11,2], [5,1,1,1,1,1,1,1,2]], dtype=float)
y = classifier.predict(new_samples)
print('Predictions: {}'.format(str(y)))
```


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
