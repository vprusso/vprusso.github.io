+++
title = "Hexagonal labyrinths in triangular arrays"
date = "2025-01-02"
#dateFormat = "2006-01-02" # This value can be configured for per-post date formatting
author = "Vincent Russo"
authorTwitter = "captainhamptons" #do not include @
cover = ""
tags = ["mathematics", "number_theory"]
keywords = ["mathematics", "number_theory"]
description = ""
showFullContent = false
readingTime = true
hideComments = false
draft=false
+++


I recently happened upon the textbook ["Triangular Arrays with
Applications"](https://global.oup.com/academic/product/triangular-arrays-with-applications-9780199742943) and decided to
pick up a copy. I'm certainly no number theorist, but I still enjoy a good triangular arrangement of numbers as much as
the next person.

My typical strategy for understanding something mathy is to write some code and to see lots and lots of examples to
develop intuition. I suppose I'm one of those people who need to burn their hands on the stove multiple times to realize
that doing so is a bad idea. Anyway, I digress. 

I realized there wasn't much open-source software for manipulating and studying triangular
arrangements of numbers. Shocking, right? So, to make things right with the world, I spent the better part
of a weekend creating the [`triforce`](https://github.com/vprusso/triforce) Python package. The
[`triforce`](https://en.wikipedia.org/wiki/Lateralus_(song)) package is a suite of tools for the numerical exploration of
triangular arrays. 

### Exploring triangular arrays in triforce

You can invoke well-known triangular arrays (Pascal's triangle, Bell's triangle, etc.) from the `triangles` library of
pre-defined triangular arrangements. Here is an example of the well-known [Pascal's
triangle](https://en.wikipedia.org/wiki/Pascal%27s_triangle)

```py
>>> from triforce.triangles import PascalTriangle
>>> triangle = PascalTriangle(10)
>>> 
>>> # Print the output as a triangular shape:
>>> print(triangle)
                           1 
                         1     1 
                      1     2     1 
                   1     3     3     1 
                1     4     6     4     1 
             1     5    10    10     5     1 
          1     6    15    20    15     6     1 
       1     7    21    35    35    21     7     1 
    1     8    28    56    70    56    28     8     1 
 1     9    36    84    126   126   84    36     9     1 
```

The `triangle` object is of type `Triangle` which has a number of attributes associated with it that can be useful for
exploring various properties of certain triangular arrays. Here are just some of the properties we can explore:

```py
>>> # Extract the right-most diagonal of the triangle:
>>> print(triangle.diagonal(diagonal_index=0, direction="right"))
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

>>> # Extract the second-to-the-right-most diagonal of the triangle:
>>> print(triangle.diagonal(diagonal_index=1, direction="right"))
[1, 2, 3, 4, 5, 6, 7, 8, 9]

>>> # Extract the center entries of the triangle:
>>> print(triangle.center())
[1, 2, 6, 20, 70]

>>> # Extract row sums:
>>> print(triangle.row_sums())
[1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
```

Additionally, the `Triangle` class is extensible to allow you to define your own generating function for the ruleset. We
can override the `generate_triangle` function to dictate how the triangular array is defined. As an example, here is how
we can do this to define the [Hosoya Triangle](https://en.wikipedia.org/wiki/Hosoya%27s_triangle):

```py
from trifoce.triangle import Triangle
from triforce.sequences import fibonacci

class HosoyaTriangle(Triangle):
    """Hosoya Triangle: https://en.wikipedia.org/wiki/Hosoya%27s_triangle"""

    def generate_triangle(self) -> list[list[int]]:
        """Generate the Hosoya triangle up to row n."""
        triangle = []
        for i in range(self.n):
            row = []
            for j in range(i + 1):
                entry = fibonacci(j + 1) * fibonacci(i - j + 1)
                row.append(entry)
            triangle.append(row)
        return triangle
```

One can also visualize properties of the triangles by plotting. Here is an example of visualizing Pascal's triangle such
that the even and odd terms are replaced by black and white pixels, respectively.

```py
from triforce.plots import highlight_plot
from triforce.numerics import is_even

highlight_plot(PascalTriangle(n=510), is_even)
```

![even-odd plot for Pascal's triangle](/blog/pascal_parity_plot.png)

One could (and indeed should!) go to town in adding additional exploratory functionality. I encourage anyone
who is reading this and interested in either forking the project or making a PR to `triforce` for enhancing the current
set of functionality.

### Using triforce in the wild
This is all well and good for exploring triangular arrangements of numbers that have been extensively studied, however
one may wish to conjecture properties of triangular numbers that are defined in a novel way.

For instance, the authors of "*Some properties of the Fibonacci-Pascal triangle*" ([Fibonacci Quart. 60 (2022), no. 5,
372–383](https://www.fq.math.ca/Papers1/60-5/sonrod.pdf)) define the so-called *Fibonacci-Pascal triangle* via the recurrence

$$
\begin{equation}
  T(n, i) =
  \begin{cases}
    F_{n+1} & \text{if } i = 0, \\
    F_{n+1} & \text{if } i = n, \\
    T(n-1, i-1) + T(n-1, i) & \text{otherwise,}
  \end{cases}    
\end{equation}
$$
where \(F_i\) is the \(i\)-th Fibonacci number, with \(F_0 = 0\), \(F_1 = 1\), and \(F_n = F_{n-1} + F_{n-2}\) for \(n
\geq 2\). 

By inheriting from the `Triangle` base class and overriding the `generate_triangle` function, we can define this
triangular arrangement of numbers. Indeed, `FibonacciPascalTriangle` is already defined in `triforce` by using this
strategy of implementation, so we can just pull it off the shelf.

```py
>>> from triforce.triangles import FibonacciPascalTriangle
>>>
>>> triangle = FibonacciPascalTriangle(5)
>>> print(triangle)

        1
      1   1
    2   2   2
  3   4   4   3
5   7   8   7   5
```

While their paper is unfortunately pay-walled (thanks, Fibonacci Quarterly!), I can recall that the authors proved a
number of properties about the Fibonacci-Pascal triangle. 

If you have read the blog post this far, you're likely interested in thinking about such things (NERD!). One
"exercise-for-the-reader" might be to consider a slightly different triangle that has the same recursive structure but
is defined in terms of Lucas numbers instead of Fibonacci numbers.

Let's define the *Lucas-Pascal triangle* via the recurrence
$$
\begin{equation}
  T(n, i) =
  \begin{cases}
    L_{n+1} & \text{if } i = 0, \\
    L_{n+1} & \text{if } i = n, \\
    T(n-1, i-1) + T(n-1, i) & \text{otherwise,}
  \end{cases}    
\end{equation}
$$
where \(L_i\) is the \(i\)-th Lucas number, with \(L_0 = 2\), \(L_1 = 1\), and \(L_n = L_{n-1} + L_{n-2}\) for \(n
\geq 2\). Here is a Lucas-Pascal triangle I prepared earlier 🥧:


```py
>>> from triforce.triangles import LucasPascalTriangle
>>>
>>> triangle = LucasPascalTriangle(5)
>>> print(triangle)

          1 
       3    3 
     4    6    4 
  7    10   10   7 
11   17   20   17   11
```

One question we may want to answer is whether there is a closed-form expression for the row sum. We can look at the
first few values of each row sum of the Lucas-Pascal triangle using `triforce`.

```py
>>> from triforce.triangles import LucasPascalTriangle
>>>
>>> triangle = LucasPascalTriangle(15)
>>> print(triangle.row_sums())
[1, 6, 14, 34, 76, 166, 354, 744, 1546, 3186, 6524, 13294, 26986, 54616, 110274]
```

After playing around with the sum values and the Lucas numbers, I was able to conjecture the following. Let \(n \geq 0\)
be a positive integer. It holds that the row sum of the Lucas-Pascal triangle is given by

$$
\begin{equation}
    \sum_{j=0}^n T(n,j) = 2^n L_4 - 2 L_{n+2}.
\end{equation}
$$

I'll omit the proof, but will mention that an inductive argument is straightforward to prove given the definition of the
triangle. While `triforce` can't be used to prove things of course, it can still garner intuition about the triangular
array structure for making conjectures about its properties.

### Hexagonal labyrinths

I'll end with an idea I had as a bit of a fever dream when thinking about these triangular arrays and reading the short
story ["The Library of Babel"](https://en.wikipedia.org/wiki/The_Library_of_Babel) by [Jorge Luis
Borges](https://en.wikipedia.org/wiki/Jorge_Luis_Borges). In the story, the protagonist describes a labyrinth of
vertically adjacent hexagonal rooms of bookshelves with random books. The books contain every possible ordering of a set
of basic characters and thus contain every book that has been or will be written. The books include the meaning of life,
the cure for cancer, and even verbal sections of this blog post. 

![library-of-babel](/blog/library_of_babel.jpg)

Paradoxically, this information is utterly useless, given its sheer immensity and scope. Inspired by the hexagonal
architecture of this fictional library, we could consider a similar style of recursive structure superimposed on
triangular arrays of numbers. 

There are likely many ways one *could* define a hexagonal labyrinth with the above description. One way is as a
recursive sequence of triangular arrays \(\{T_d\}_{d \geq 0}\) where given \(T_d\), for \(d \geq 0\), the array
\(T_{d+1}\) is constructed by extracting entries from \(T_d\) located at positions corresponding to the centers of
hexagonal patterns superimposed on \(T_d\). Specifically, for \(d \geq 0\), we define

$$
\begin{equation}
    T_{d+1}(j, k) = T_d(2(j+1), 2k + 1)
\end{equation}
$$

for \(j \geq 0\) and \(0 \leq k \leq j\). For example, here are some numbers arranged in such a hexagonal configuration:

```
               1 
              / \
             1---1
            /     \
           2   1   2
            \     / 
         3---2---2---3
        /     \ /     \
       5   3   4   3   5
     8---5---6---6---5---8
     ...
```

If one wished, they could extend `triforce` to include a `labyrinth.py`. Doing so would give similar capabilities to
empircally analyze the structure and make claims about the hexagonal labyrinth structures. Given an initial hexagonl
configuration, we could "descend" into a subsequent layer of the library by selecting a hexgonal center. Then, this
hexagonal center would dictate the starting point of the next triangular arrangement of numbers. Again, this is not the
only way one could define this, but it could be one way of staying "true" to the literature angle.

As a bit of fun, we could assign some other names to some of the other attributes of the triangle that are creatively
inspired. 

For instance, we could define the path (or ladder) down from one section of the library to the next as a
*Lateralus*. The term [*Lateralus*](https://en.wikipedia.org/wiki/Lateralus_(song)) is derived from a song by the band
[Tool](https://en.wikipedia.org/wiki/Tool_(band)). This song is particularly notable for its syllabic lyrical
construction, which is based off the Fibonacci sequence. 

Another one (perhaps more relevant to the structure at hand) is a [hexagon
sun](https://en.wikipedia.org/wiki/Hexagon_Sun) from the band [Boards of
Canada](https://en.wikipedia.org/wiki/Boards_of_Canada). What is a "hexagon sun"? Well, it could be the hexagonal
configurations with the rays emanating from these configurations. Is it possible to determine an equation for hexagonal
suns for a given level of the labyrinth?

Is it worth thinking about such a structure? Is it worth thinking about such properties within these structures? I don't
know. I thought that the juxtaposition of a mathematical construct against something inspired by literature and music
was kind of cool. Others have thought about such structures within triangular arrays before (for instance, the ["Star of
David"](https://en.wikipedia.org/wiki/Star_of_David_theorem) theorem for triangular arrangements of numbers was surely
inspired by such a melding of comparisons).

![star-of-david](/blog/star_of_david.png)

There's obviously a lot of freedom with how one could define this type of structure and maybe even one of them would be
worthwhile to think about. I welcome any input on the above (very rough) thoughts and ideas as well as any PRs for the
`triforce` package.
