---
layout: post
comments: true
title:  "The mathematics of Tiger Electronic's "Lights Out""
date:   2017-03-03 1:58:35
categories: Android, Java, Math, HTML
tags:
- Android
- Java
- Math
- HTML
---

<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>

<script>

    NUM_ROWS = 5;
    NUM_COLS = 5;

    function getXYCoordsFromLight(light) {
        var res = light.split("_");

        var x = parseInt(res[0]);
        var y = parseInt(res[1]);    

        return [x,y]; 
    }

    function getLightFromXYCoords(x, y) {
        return ( x.toString() + "_" + y.toString() );
    }

    function turnLightOff(light) {
        document.lightsform.elements[light].checked = 0;
    }

    function turnLightOn(light) {
        document.lightsform.elements[light].checked = 1;
    }

    function isLightOn(light) {
        return document.lightsform.elements[light].checked == 1;
    }

    function toggleLight(light) {
        if (isLightOn(light)) {
            turnLightOff(light);
        }
        else {
            turnLightOn(light); 
        }
    }

    function clearBoard() {
        for(var x = 0; x < NUM_ROWS; x++) {
            for(var y = 0; y < NUM_COLS; y++) {
                light = x.toString() + "_" + y.toString();            
                turnLightOff(light);
            }
        }
    }

    function fillBoard() {
        for(var x = 0; x < NUM_ROWS; x++) {
            for(var y = 0; y < NUM_COLS; y++) {
                light = x.toString() + "_" + y.toString();            
                turnLightOn(light);
            }
        }
    }

    function isLightOutOfBounds(light) {
        coords = getXYCoordsFromLight(light); 
        var x = coords[0];
        var y = coords[1]; 

        return ( x >= NUM_ROWS || x < 0 || y >= NUM_COLS || y < 0 );   
    }

    function isLightOn(light) {    
        return (document.lightsform.elements[light].checked == 1);
    }

    function lightPressed(light) {
        coords = getXYCoordsFromLight(light);

        var x = coords[0];
        var y = coords[1]; 

        var top = x - 1;
        var bot = x + 1;
        var left = y - 1;
        var right = y + 1; 

        top_y = getLightFromXYCoords(top, y); 
        if ( !isLightOutOfBounds( top_y ) ) {
            toggleLight( top_y );  
        }

        bot_y = getLightFromXYCoords(bot, y); 
        if ( !isLightOutOfBounds(bot_y) ) {
            toggleLight(bot_y); 
        }

        x_left = getLightFromXYCoords(x, left); 
        if ( !isLightOutOfBounds(x_left) ) {
            toggleLight(x_left); 
        }

        x_right = getLightFromXYCoords(x, right); 
        if ( !isLightOutOfBounds(x_right) ) {
            toggleLight(x_right); 
        }

        if (checkVictory()) {
            alert("\nYou Won!!\n");
        }

    }

    function checkVictory() {
        for(var x = 0; x < NUM_ROWS; x++) {
            for(var y = 0; y < NUM_COLS; y++) {
                light = getLightFromXYCoords(x, y);
                if ( isLightOn(light) ) {
                    return false;
                }
            }
        }
        return true;         
    }

    function makeTableHTML() {
        var result = '<table colspec="' + Array(NUM_COLS).join("120") + '" border = 7 ';
        for (var x = 0; x < NUM_ROWS; x++) {
            result += "<tr>";
            for (var y = 0; y < NUM_COLS; y++) {
                result += "<td><input type=checkbox name=" + x.toString() + "_" + y.toString() + " onClick='lightPressed(name)'></td>";  
            }
            result += "</tr>";
        }

        result += "</table>";
        return result;
    }
            
</script>


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

## The "Lights Out" Game

<a target="_blank" href="https://www.amazon.com/gp/product/B000UHABZC/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B000UHABZC&linkCode=as2&tag=vprusso-20&linkId=d0ff8f519565f85c341a3fb7aa645226">Lights Out </a><img src="//ir-na.amazon-adsystem.com/e/ir?t=vprusso-20&l=am2&o=1&a=B000UHABZC" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /> is a puzzle game that was originally produced by Tiger Electronics in 1995. The game consists of a 5-by-5 grid of squares. Each level in the game consists of a some collection of squares in the grid that are either in the "on" or "off" state. For instance, we may consider the following level

FIG

where the ?? colored squares represent an "on" state and the ?? colored squares represent an "off" state. When one presses a square, this toggles the pressed square as well as the neighboring squares to flip to their opposite state. For instance, if we press the center square in the above example this toggles the square itself as well as the top, bottom, left, and right squares to toggle off. 

FIG

In this case, all squares are toggled in the "off" position. When all squares are in the "off" state, we refer to this as the winning condition of the game. 

Let's consider board setup from Figure ?? again. If instead of pressing the center square we press the top left square, what we end up with is a configuration that looks like the following. 

FIG

Note that since there is no top or left square the only squares that are toggled are the square that was pressed along with the bottom and right squares. That is to say, the toggling behavior does not wrap around the board. 

Now that we know the rules of the game and the winning condition, feel free to play through some of the levels in the following Javascript demo I coded up. The Javascript source for this implementation may be found on my GitHub page <a href="">here</a>.


<center>
    <form name=lightsform>           
    </form>
</center>


## An unbeatable configuration

After playing through the above game, perhaps you have a better understanding of the mechanics. Maybe you'd like to code up an implementation yourself and impress your friends (probably not ideal if you like your friends). Anyway, if you wanted to make a function for generating levels, you couldn't necessarily just go willy-nilly and randomly toggle the squares in either an "on" or "off" position. To see why, consider the following configuration. 

JS EX

Come on now. What's taking you so long? Well, as it turns out, no matter how determined you are, the initial configuration in the above example is unsolvable. Your friends (if we can call them that at this point) are probably already at the end of their rope.  ......

So if we want to avoid this scenario where you're unable to win the game, we need to determine whether or not a given configuration is actually solvable. As it turns out, we can use math of all things to help us out here.  

## Solving "Lights Out"

First, let's right out of the gate observe that the board can be thought of as a matrix with entries that correspond to whether or not the particular square on the board is toggled "on" or "off". For instance, the following configuration

FIG

corresponds directly to the following matrix 

MAT



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