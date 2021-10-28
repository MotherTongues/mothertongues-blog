---
layout: post
title:  "G2P Part 2: Using G2P Studio"
author: AidanPine
categories: []
tags: [ tutorial, explanation, tech-showcase, g2p ]
image: assets/images/basic-rule-studio.png
description: "Tutorial: Using G2P Studio"
featured: false
hidden: false
---

This is the second blog post in a 7-part series describing how to make a basic mapping with `g2p`. For background information on what `g2p` is, have a look at the [introductory blog post for g2p]({{ "g2p-background" | absolute_url }})


- [Background]({{ "g2p-background" | absolute_url }})
- How to write a basic mapping in G2P Studio
- [Writing mappings on your computer]({{ "g2p-basic-mappings-local" | absolute_url }})
- [Advanced mappings]({{ "g2p-advanced-mappings" | absolute_url }})
- [ReadAlong Studio & Other Applications]({{ "g2p-applications" | absolute_url }})
- [Preprocessing mappings]({{ "g2p-preprocess" | absolute_url }})
- [Contributing]({{ "g2p-contributing" | absolute_url }})

# What you need to know to understand this post

- To be able to follow along, you'll need access to the internet, and to have read the [introductory blog post for g2p]({{ "g2p-background" | absolute_url }})

## What's the gist of what we're about to do?

In order to use `g2p` we need to understand the building blocks; **rules** and **mappings**. **Rules** are patterns that describe how to turn some input text into some other output text. When we combine a series of ordered rules together for a specific purpose, we call this a **mapping**. This blog post will show you how to write rules and mappings to use with `g2p`.

## How do I follow along?

The easiest way to write rules quickly is using the [G2P Studio](https://g2p-studio.herokuapp.com/) web application[^1]. Once landing on the G2P Studio page, you can scroll down to the [Custom Rules](https://g2p-studio.herokuapp.com/#out_delimiter-0:~:text=Custom%20Rules) section and start directly editing the spreadsheet available there. You can also follow along by writing your rules and mappings on your computer using a text editor like [Visual Studio Code](https://code.visualstudio.com/). This post only shows how to create rules using the [G2P Studio](https://g2p-studio.herokuapp.com/) web application. The [next blog post]({{ "g2p-basic-mappings-local" | absolute_url }}) will show you how to write these rules locally on your computer.

# How to get from 'a' to 'b' (or 'a' to 'æ') with g2p

`g2p` is a Python library[^2] (i.e. software written in the Python programming language) that helps you convert between different characters based on user-defined rules. The inspiration for how to write these rules was mostly taken from the notion of [phonological rewrite rules](https://en.wikipedia.org/wiki/Phonological_rule), which is a common way of describing *multilevel* phonological changes in linguistics. *Multilevel* changes is the idea that a word, like 'cats' or 'dogs' can have multiple 'levels' of representation. For example, you might think of the way that those words are written in English orthography (writing system) as one level. Then, you might think of a general pronunciation for those words, written in the phonetic alphabet, as another level. You could also separate that level into more than one level by having a level each for [narrow and broad transcriptions](https://en.wikipedia.org/wiki/Phonetic_transcription#Narrow_versus_broad_transcription:~:text=orthography.-,Narrow%20versus%20broad%20transcription).

| Level Name |  Word #1   |  Word #2  | Word # 3 |
|---|---|---|---|
| Level 1 (orthography) | cat | dog | back |
| Level 2 (broad IPA) | kæt | dɑɡ | bæk |
| Level 3 (narrow IPA) | kʰæt | dɑɡ | bæk |

Now, just by looking at these three levels, you can probably see some fairly systematic rules here that you could imagine would get you from one level to the next, even if you don't know the phonetic alphabet by heart and even if you don't really know much about English phonology (sound patterns and systems).

One possible hypothesis would be that all 'a' characters in level one turn to 'æ', so we might want a rule to express that all instances of 'a' turn to /æ/. And, for another example, it looks like between levels 2 and 3, /k/ turns into either [k] or [kʰ] depending on whether it occurs before or after /æ/[^3]. 

So, with these hypotheses about the rules to transform from one level to another, how do we start translating this into rules for `g2p`? Keep reading to find out!


## Basic Rule writing

`g2p` lets you describe these patterns using **an ordered series of rules**. Each rule must be defined to have a sequence of one or more input characters and a sequence of zero or more output characters. In the [G2P Studio](https://g2p-studio.herokuapp.com/), we write these rules in a spreadsheet-type interface. 

In the photo below we can see a very basic rule that will turn all instances of the character `a` into `b`. Each row is a new rule. The `In` column describes what characters will be matched, and the `Out` column describes what those matched characters will be turned into.

{% picture basic-rule-studio.png %}

 The `Context Before` and `Context After` columns describe any conditions for the matched text. For example, if I wanted to turn all `a` characters into `b` only if a `c` came before the `a`, I would write the rule like this:

 {% picture basic-rule-studio-context.png %}

## Ok, so how do I actually get these rules to do something?

So, you've understood the [basics of writing rules](#basic-rule-writing) either described above and you want to actually use them to convert something! This section describes exactly how to do that. 

Below is a list of all the rules to capture the transformations between level 1 and level 2 above. There are some rules that we discussed in that section, and some others that might look unfamiliar. For a full description of some of these rules, have a look at the [advanced rule-writing section]({{ "g2p-advanced-mappings" | absolute_url }}).

{% picture custom-rules-g2p-studio.png %}

Once you have written your rules in this section, you can write some text in the left text area at the top of the G2P Studio, and `g2p` will apply your rules and produce the output in the right text area as seen below:

{% picture custom-rules-output-g2p-studio.png %}

You can also click on 'Export' under the Custom Rules section to export your rules to a CSV file if you want to save them for later.

Have a read through the next blog post on [writing rules on your computer without G2P Studio]({{ "g2p-basic-mappings-local" | absolute_url }}).

### Footnotes

[^1]: I'm using the free, hobby plan at <https://www.heroku.com/> to host it though, so occasionally the server goes to sleep. If you first go to the site and it takes a few seconds to boot up, don't worry!
[^2]: A Python 'library' is a collection of code
[^3]: Orthographic characters are circumfixed with apostrophes like 'a', broad IPA typically uses forward slashes like /k/ and narrow IPA typically uses square brackets like [kʰ]