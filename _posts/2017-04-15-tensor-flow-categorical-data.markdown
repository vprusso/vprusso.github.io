---
layout: post
comments: true
title:  "Using TensorFlow on Categorical Data"
date:   2017-04-15 2:58:35
categories: tensorflow, machine learning, data science, neural networks
excerpt: We use TensorFlow to attempt to determine the edibility of a mushroom based on its physical traits that are encoded categorically.
tags:
- tensorflow
- machine learning
- data science
- neural networks
---

### Introduction

In this post, we will be using the UCI mushroom database as training data for us to determine if a given mushroom with specific attributes is either edible or poisonous. This data set serves as a nice example of one where the attributes are categorical, which is something you may run across yourself, and optimistically this article can serve as a guide post for how to deal with such situations. We will use TensorFlow to determine the edibility of a given mushroom, and the approach will follow in a very similar manner to <a href="https://www.tensorflow.org/get_started/tflearn">the excellent tutorial on the TensorFlow page where Iris flower data is considered</a> instead. 

For anyone who has dipped their toes into machine learning, and specifically neural networks, two of the primary examples that come up as a typical "Hello World" application is the Iris classification and the hand-written digit classification. These are abundant examples with good reason, as they illustrate a useful and nontrivial property of neural networks. However, these examples tend to dominate the landscape of introductory neural network applications. The primary goal of this post then is to show a very similar type of example, but have a focus on data that is generally not used in the prototypical neural network introductions. One reason for this is that, at least for me, it was initially unclear what else neural networks could be applied to. Indeed, if you're inclined, the approach in this post is broadly applicable to just about any of the <a href="http://archive.ics.uci.edu/ml/datasets.html?format=&task=cla&att=&area=&numAtt=&numIns=&type=&sort=nameUp&view=table">"classification" data sets from the UCI machine learning repository</a>. If you want another example of using TensorFlow to construct a neural network on non-categorical data, I have <a href="http://vprusso.github.io/blog/2016/tensor-flow-neural-net-breast-cancer/">blog post that gives a quick example for how to classify breast cancer tumors</a>. 

I encourage you to find an interesting dataset there and construct your own neural network. If you do so, please let me know! 

### Overview

In a similar manner to the <a href="https://www.tensorflow.org/get_started/tflearn">TensorFlow tutorial</a>, we will be breaking this task down into the following bites:

1. [Download and Clean the Mushroom Data from the UCI Repository](#download-and-clean-the-mushroom-data-from-the-uci-repository).

2. [Load Mushroom CSV Data into TensorFlow](#load-mushroom-csv-data-into-tensorflow).  

3. [Use TensorFlow to Construct a Neural Network Classifier](#use-tensorflow-to-construct-a-neural-network-classifier). 

4. [Use the UCI Data to Train the Neural Network](#use-the-uci-data-to-train-the-neural-network).

5. [Determine the Accuracy of our Neural Network Model](#determine-the-accuracy-of-our-neural-network-model). 

6. [Test the Neural Network on a Sample Not Seen](#test-the-neural-network-on-a-sample-not-seen).

The TensorFlow library is an evolving one, and as a result, some of the functions called in this post may be deprecated at some point in the future. I will do my best to update the code in this post as the updates come out. If you encounter any problems or errors, please feel free to contact me. 

I'm also going to assume that you have a machine with TensorFlow on it. For more information on that, you can consult the <a href="https://www.tensorflow.org/install/">documentation on how to install TensorFlow</a> for your particular setup.

### Complete Source Code Listing

If you simply want some code to grab and try it out for yourself, I'll provide the complete listing below. You can just clone my repository to obtain all of the code and supplementary data files required. If you'd like a bit more explanation as to what is happening, the rest of the post will elaborate on that in greater detail. 

**Git repository link**: <a href="https://github.com/vprusso/tf_mushroom">https://github.com/vprusso/tf_mushroom</a>

```python
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import tensorflow as tf
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

import os


def prepare_data(data_file_name):
    """
    Responsible for cleaning the data file provided from the UCI machine
    learning repository here: http://archive.ics.uci.edu/ml/datasets/Mushroom.
    The function then produces two CSV files appropriately formatted to be
    used in TensorFlow where the CSV files split with respect to
    training and testing data.
    """

    # The header is formed from the 'agaricus-lepiota.name' file found on
    # http://archive.ics.uci.edu/ml/datasets/Mushroom
    header = ['class', 'cap_shape', 'cap_surface',
              'cap_color', 'bruises', 'odor', 'gill_attachment',
              'gill_spacing', 'gill_size', 'gill_color', 'stalk_shape',
              'stalk_root', 'stalk_surface_above_ring',
              'stalk_surface_below_ring', 'stalk_color_above_ring',
              'stalk_color_below_ring', 'veil_type', 'veil_color',
              'ring_number', 'ring_type', 'spore_print_color',
              'population', 'habitat']
    df = pd.read_csv(data_file_name, sep=',', names=header)

    # Entries with a '?' indicate a missing piece of data, and
    # these entries are dropped from our dataset.
    df.replace('?', np.nan, inplace=True)
    df.dropna(inplace=True)

    # The class of poisonous or edible is indicated in the data as
    # either 'p' or 'e' respectively. We require that this is numeric,
    # and therefore use '0' to indicate poisonous (or not edible) and
    # '1' to indicate edible.
    df['class'].replace('p', 0, inplace=True)
    df['class'].replace('e', 1, inplace=True)

    # Since we are dealing with non-numeric feature data, or in other
    # words, categorical data, we need to replace these with numerical
    # equivalents. Pandas has a nice function called "get_dummies" that
    # performs this task.
    cols_to_transform = header[1:]
    df = pd.get_dummies(df, columns=cols_to_transform)

    # We can now split the data into two separate data frames,
    # one for training, which will constitute the bulk of the
    # data, and one for testing.
    df_train, df_test = train_test_split(df, test_size=0.1)

    # Determine the number of rows and columns in each of the
    # data frames.
    num_train_entries = df_train.shape[0]
    num_train_features = df_train.shape[1] - 1

    num_test_entries = df_test.shape[0]
    num_test_features = df_test.shape[1] - 1

    # The data frames are written as a temporary CSV file, as we still
    # need to modify the header row to include the number of rows and
    # columns present in the training and testing CSV files.
    df_train.to_csv('train_temp.csv', index=False)
    df_test.to_csv('test_temp.csv', index=False)

    # Append onto the header row the information about how many
    # columns and rows are in each file as TensorFlow requires.
    open("mushroom_train.csv", "w").write(str(num_train_entries) +
                                          "," + str(num_train_features) +
                                          "," + open("train_temp.csv").read())

    open("mushroom_test.csv", "w").write(str(num_test_entries) +
                                         "," + str(num_test_features) +
                                         "," + open("test_temp.csv").read())

    # Finally, remove the temporary CSV files that were generated above.
    os.remove("train_temp.csv")
    os.remove("test_temp.csv")


# Define the test inputs
def get_test_inputs():
    x = tf.constant(test_set.data)
    y = tf.constant(test_set.target)

    return x, y


# Define the training inputs
def get_train_inputs():
    x = tf.constant(training_set.data)
    y = tf.constant(training_set.target)

    return x, y


# Classify two new mushroom samples. (expect output: [0,1]),
# i.e. poisonous, edible.
def new_samples():
    return np.array([[0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
                      1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
                      0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0,
                      0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0,
                      0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
                      0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1,
                      0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                      1, 0, 1, 0, 0, 0, 0],
                     [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
                      0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
                      0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0,
                      0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
                      0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
                      0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0,
                      0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
                      0, 0, 0, 0, 0, 0, 1]], dtype=np.int)


if __name__ == "__main__":

    MUSHROOM_DATA_FILE = "agaricus-lepiota.data"

    # Prepare the mushroom data for TensorFlow by
    # creating two train / test CSV files.
    prepare_data(MUSHROOM_DATA_FILE)

    # Load datasets.
    training_set = tf.contrib.learn.datasets.base.load_csv_with_header(
        filename='mushroom_train.csv',
        target_dtype=np.int,
        features_dtype=np.int,
        target_column=0)

    test_set = tf.contrib.learn.datasets.base.load_csv_with_header(
        filename='mushroom_test.csv',
        target_dtype=np.int,
        features_dtype=np.int,
        target_column=0)

    # Specify that all features have real-value data
    feature_columns = [tf.contrib.layers.real_valued_column("", dimension=98)]

    # Build 3 layer DNN with 10, 20, 10 units respectively.
    classifier = tf.contrib.learn.DNNClassifier(
        feature_columns=feature_columns,
        hidden_units=[10, 20, 10],
        n_classes=2,
        model_dir="/tmp/mushroom_model")

    # Fit model.
    classifier.fit(input_fn=get_train_inputs, steps=2000)

    # Evaluate accuracy.
    accuracy_score = classifier.evaluate(input_fn=get_test_inputs,
                                         steps=1)["accuracy"]

    print("\nTest Accuracy: {0:f}\n".format(accuracy_score))

    # Test on two mushroom samples.
    predictions = list(classifier.predict(input_fn=new_samples))

    print("New Samples, Class Predictions:    {}\n"
          .format(predictions))

```

### Download and Clean the Mushroom Data from the UCI Repository

We will be obtaining our data from the <a href="http://archive.ics.uci.edu/ml/machine-learning-databases/mushroom/">UCI machine learning mushroom data set page</a>. On this page, there are two primary files that we will be making using of, ``agaricus-lepiota.data`` and ``agaricus-lepiota.names``. The ``agaricus-lepiota.data`` file is a comma separated file with 8124 rows and 22 columns. Each row corresponds to a mushroom, and each of the 22 columns correspond to respective attributes of each mushroom. Each entry consists of a single character, where the character legend is found in the ``agaricus-lepiota.names`` file. This tells us precisely what each of these letters in a given column means for the particular mushroom we are considering. 

The UCI mushroom data is almost ready to go directly from the UCI link, but we're going to tweak a couple things. Before proceeding, we'll require the following imports.

```python
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import tensorflow as tf
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

import os
```

The first thing we're going to do is add a header row so that TensorFlow knows what each column in our data file corresponds to. The header row will be a comma separated row that we will place in the first row of the file, where each of the columns in this row will correspond to the attributes listed in the ``agaricus-lepiota.names`` file. 

```python
# The header is formed from the 'agaricus-lepiota.name' file found on
# http://archive.ics.uci.edu/ml/datasets/Mushroom
header = ['class', 'cap_shape', 'cap_surface',
          'cap_color', 'bruises', 'odor', 'gill_attachment',
          'gill_spacing', 'gill_size', 'gill_color', 'stalk_shape',
          'stalk_root', 'stalk_surface_above_ring',
          'stalk_surface_below_ring', 'stalk_color_above_ring',
          'stalk_color_below_ring', 'veil_type', 'veil_color',
          'ring_number', 'ring_type', 'spore_print_color',
          'population', 'habitat']
df = pd.read_csv(data_file_name, sep=',', names=header)
```

Second, we are now going to eliminate any row with a "?" entry in the column. It is arguably a bit overkill to just eliminate these rows entirely, as most times the rest of the columns are populated with non-"?" entries. There are many techniques for dealing with such data points in a machine learning context, but for the purposes of brevity, we'll be doing the relatively unsophisticated approach of just removing the rows with offending "?" entries. 

```python
# Entries with a '?' indicate a missing piece of data, and
# these entries are dropped from our dataset.
df.replace('?', np.nan, inplace=True)
df.dropna(inplace=True)
```

Third, we're going to replace the "p" or "e" in the class column of the data frame, where "p" denotes a poisonous mushroom and "e" denotes an edible one. For our purposes, it will be much more straight forward to replace the "p" and "e" with "0" and "1" respectively. 

```python
# The class of poisonous or edible is indicated in the data as
# either 'p' or 'e' respectively. We require that this is numeric,
# and therefore use '0' to indicate poisonous (or not edible) and
# '1' to indicate edible.
df['class'].replace('p', 0, inplace=True)
df['class'].replace('e', 1, inplace=True)
```

Fourth, we are going to convert the categorical attributes of the mushroom dataset to numerical information that TensorFlow can use. In order to do this, we will be using the ``get_dummies`` function provided by the ``pandas`` library for precisely this purpose. For more information on how this function is used in machine learning for categorical feature data, you can refer to <a href="http://fastml.com/converting-categorical-data-into-numbers-with-pandas-and-scikit-learn/">the excellent blog post at fastml</a>.

```python
# Since we are dealing with non-numeric feature data, or in other
# words, categorical data, we need to replace these with numerical
# equivalents. Pandas has a nice function called "get_dummies" that
# performs this task.
cols_to_transform = header[1:]
df = pd.get_dummies(df, columns=cols_to_transform)
```

Fifth, we're going to split the mushroom data into two different files: one for training and the other for testing. The training data will constitute the bulk of the mushroom data, and for the purposes of creating the testing data, I'll remove 10 random entries from our training data and place those in the testing data set. 

```python
# We can now split the data into two separate data frames,
# one for training, which will constitute the bulk of the
# data, and one for testing.
df_train, df_test = train_test_split(df, test_size=0.1)
```

Finally, TensorFlow requires that we add two pieces of information to our CSV files that are not currently there. The data that we need to add is the number of rows and columns present in each of the training and testing CSV files. We first extract that information from our data frames created above, and then we modify the header in each file to reflect this information. 

```python
# Determine the number of rows and columns in each of the
# data frames.
num_train_entries = df_train.shape[0]
num_train_features = df_train.shape[1] - 1

num_test_entries = df_test.shape[0]
num_test_features = df_test.shape[1] - 1

# The data frames are written as a temporary CSV file, as we still
# need to modify the header row to include the number of rows and
# columns present in the training and testing CSV files.
df_train.to_csv('train_temp.csv', index=False)
df_test.to_csv('test_temp.csv', index=False)

# Append onto the header row the information about how many
# columns and rows are in each file as TensorFlow requires.
open("mushroom_train.csv", "w").write(str(num_train_entries) +
                                      "," + str(num_train_features) +
                                      "," + open("train_temp.csv").read())

open("mushroom_test.csv", "w").write(str(num_test_entries) +
                                     "," + str(num_test_features) +
                                     "," + open("test_temp.csv").read())
```

I've gone ahead and set each of the training and testing files up for download here:

* **A training set of mushroom data** (<a href="http://vprusso.github.io/csv/mushroom_train.csv">mushroom_train.csv</a>).
* **A test set of mushroom data** (<a href="http://vprusso.github.io/csv/mushroom_test.csv">mushroom_test.csv</a>).

### Load Mushroom CSV Data into TensorFlow

Now that we've appropriately created the CSV files above, we can now load the CSV files into TensorFlow. To do so, we shall make use the ``load_csv_with_header()`` function provided from TensorFlow. 

```python
# Load datasets.
training_set = tf.contrib.learn.datasets.base.load_csv_with_header(
    filename='mushroom_train.csv',
    target_dtype=np.int,
    features_dtype=np.int,
    target_column=0)

test_set = tf.contrib.learn.datasets.base.load_csv_with_header(
    filename='mushroom_test.csv',
    target_dtype=np.int,
    features_dtype=np.int,
    target_column=0)
```

We use this function to construct both the training and testing sets. The ``load_csv_with_header()`` function takes a filename, which corresponds to the respective CSV files we constructed in the previous section. It also takes an argument ``target_dtype`` that tells TensorFlow what numeric type it is trying to predict. In our case, it's trying to determine whether the mushroom is poisonous or edible. We encoded that information as either "0" or "1", so the target type is an integer. The ``features_dtype`` is similar, only now we're telling TensorFlow what the type of the features are. 

Initially, the features were categorical, but recall we made use of the ``get_dummies()`` function to convert the categorical data into numerical data. If you take a peek at either the ``mushroom_train.csv`` file or the ``mushroom_test.csv`` file, you'll notice the features are composed of "0"s and "1"s. So again, the data type for our features are integer. Finally, the ``target_column`` tells TensorFlow what column in our file corresponds to the thing it is trying to predict. In our case, this is the first column, the one that corresponds to the ``class`` heading. Again, this ``class`` column is the one that consists of the information in terms of "0" or "1" whether the mushroom is poisonous or edible. 

### Use TensorFlow to Construct a Neural Network Classifier

We are now going to create a classifier using TensorFlow based on our data set. 

```python
# Specify that all features have real-value data
feature_columns = [tf.contrib.layers.real_valued_column("", dimension=98)]

# Build 3 layer DNN with 10, 20, 10 units respectively.
classifier = tf.contrib.learn.DNNClassifier(
    feature_columns=feature_columns,
    hidden_units=[10, 20, 10],
    n_classes=2,
    model_dir="/tmp/mushroom_model")
```

Let's look at the arguments being fed into the ``classifier`` variable. 

* ``feature_columns=feature_columns``. The features of our mushroom data. Notice that in the way in which we define the ``feature_columns`` variable, we pass it an argument of ``dimension=98``, since there are 98 different features for each mushroom in the training and test data (not including the class column, since that is the column we are attempting to predict). 

* ``hidden_units=[10, 20, 10]``. This tells TensorFlow that we want to construct a neural network with 3 layers where the first layer consists of 10 neurons, the second of 20, and the third of 10 neurons. Why we chose 3 layers and to have a specific amount of neurons on each layer is somewhat more of an art than a science in some ways. In any case, tweaking these types of parameters is a large field of study, and we selected these particular parameters because these are precisely the same ones used in the TensorFlow quick start guide. 

* ``n_classes = 2``. This tells TensorFlow that we have two possible classes to predict. Again, in our case, these classes correspond to either poisonous or edible. 

* ``model_dir="/tmp/mushroom_model``. Training this model is quick since the amount of data we are providing to TensorFlow is quite small. However, it is usually good practice to checkpoint as the model is trained so that if the computation halts at some point, there's a point to go back to instead of training the entire network all over again. This stores the checkpoint in the Linux /tmp/mushroom_model directory. 

### Use the UCI Data to Train the Neural Network

For ease of use later, we're going to define two functions, ``get_test_inputs()`` and ``get_train_inputs()``. 

```python
# Define the test inputs
def get_test_inputs():
  x = tf.constant(test_set.data)
  y = tf.constant(test_set.target)

  return x, y

# Define the training inputs
def get_train_inputs():
  x = tf.constant(training_set.data)
  y = tf.constant(training_set.target)

  return x, y
```

Each function performs the same task, where the only difference has to do with whether we are returning parameters based on either the training or testing data. In each function, we define variables ``x`` and ``y`` that are TensorFlow constant variables. We'll be using the ``get_train_inputs()`` function to fit the classifier, and the ``get_test_inputs()`` later. 

We now fit the classifier to the mushroom training data set. 

```python
# Fit model.
classifier.fit(input_fn=get_train_inputs, steps=2000)
```
The ``input_fn`` argument in the ``fit`` function corresponds to the ``get_train_inputs()`` function defined above, and the ``steps`` argument is set relatively arbitrarily to 2000. Again, this number is also used in the TensorFlow quick start guide, and it seems to be a sufficient number of steps to run on such a small data set. 

### Determine the Accuracy of our Neural Network Model

Now that we've trained our classifier, we're going to determine its accuracy. 

```python
# Evaluate accuracy.
accuracy_score = classifier.evaluate(input_fn=get_test_inputs,
                                     steps=1)["accuracy"]

print("\nTest Accuracy: {0:f}\n".format(accuracy_score))
```

If you run the above, the accuracy of the classifier will print something like:

```
Test Accuracy: 1.000000
```

### Test the Neural Network on a Sample Not Seen

Let's now create two samples that are not in the training data and see what class of mushroom TensorFlow predicts for these two samples. I'm just going to pull two samples out of the test data set that we already have, but perhaps you can imagine a scenario where, let's say, more mushroom data is selected, and we want to see what our classifier says about this new mushroom we've acquired as to whether it is poisonous or not. 

```python
# Classify two new mushroom samples. (expect output: [0,1]),
# i.e. poisonous, edible.
def new_samples():
    return np.array([[0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
                      1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
                      0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0,
                      0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0,
                      0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
                      0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1,
                      0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                      1, 0, 1, 0, 0, 0, 0],
                     [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
                      0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
                      0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0,
                      0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0,
                      0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
                      0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0,
                      0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
                      0, 0, 0, 0, 0, 0, 1]], dtype=np.int)
```

The two samples above in the function are two that were extracted from the test dataset. I made sure to take out the first column of each of these rows, as this piece of data corresponds to whether or not the mushroom is edible or not, precisely the piece of information we want to predict. 

Since I took these two rows out, I know that the first mushroom is poisonous and the second one is edible. Therefore, we should expect to see a "0" output for the first and "1" output for the second. The following lines test these samples on our classifier.

```python
# Test on two mushroom samples.
predictions = list(classifier.predict(input_fn=new_samples))

print("New Samples, Class Predictions:    {}\n"
      .format(predictions))
```

Running the above, we indeed see that the output from our classifier agrees with what we already knew to be true, that is the first mushroom is poisonous and the second is edible. 

```
New Samples, Class Predictions:    [0, 1]
```

### Additional Resources

There are a number of excellent TensorFlow resources. 

* The <a href="https://www.tensorflow.org/tutorials/">official TensorFlow tutorials</a> are very well-written. 

* This blog post covered many of the same concepts found in the <a href="https://www.tensorflow.org/get_started/tflearn"> tf.contrib.learn Quick Start guide</a> on the TensorFlow website. 



















