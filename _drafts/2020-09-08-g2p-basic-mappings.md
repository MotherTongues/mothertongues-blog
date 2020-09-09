---
layout: post
title:  "Tutorial: Make a basic mapping with g2p"
author: AidanPine
categories: []
tags: [ tutorial, explanation, tech-showcase ]
image: assets/images/bonjour-g2p.png
description: "Tutorial: Make a basic mapping with g2p"
featured: false
hidden: false
---

TODO:
    - split into local and g2p studio sections. 
    
    "It might be easier to make the first post almost exclusively about writing rules in the G2P Studio. Then, a separate basic blog post for writing rules but on your computer with a clone of g2p, and then the other two blog posts later." - Aidan


This blog post describes how to make a basic mapping with `g2p`. For background information on what `g2p` is, have a look at the [introductory blog post for g2p]({{ "g2p-background" | absolute_url }})

# What you need to know to understand this post

- To be able to follow along, I suggest having some sort of text editor, like [Visual Studio Code](https://code.visualstudio.com/)

## What's the gist of what we're about to do?

In order to use `g2p` we need to understand the building blocks; **rules** and **mappings**. **Rules** are patterns that describe how to turn some input text into some other output text. When we combine a series of ordered rules together for a specific purpose, we call this a **mapping**. This blog post will show you how to write rules and mappings to use with `g2p`.

## How do I follow along?

The easiest way to write rules quickly is using the [G2P Studio](https://g2p-studio.herokuapp.com/) web application[^1]. Once landing on the G2P Studio page, you can scroll down to the [Custom Rules](https://g2p-studio.herokuapp.com/#out_delimiter-0:~:text=Custom%20Rules) section and start directly editing the spreadsheet available there. You can also follow along by writing your rules and mappings on your computer using a text editor like [Visual Studio Code](https://code.visualstudio.com/).

## Basic Rule writing

`g2p` lets you describe these patterns using **an ordered series of rules**. Each rule must be defined to have a sequence of one or more input characters and a sequence of zero or more output characters. We can define these rules in `g2p` either using a tabular spreadsheet format (CSV) or using a format called JavaScript Object Notation or [JSON](https://www.json.org/json-en.html).

For example, rules written in the tabular comma-separated values (CSV) format:

| in | out |
|---|---|
| a | æ |

or using [JSON](https://www.json.org/json-en.html):

```json
[
    {
        "in": "a",
        "out": "æ"
    }
]
```

Both of the above rules capture our first rule that turns an orthographic 'a' into a broad IPA /æ/. You can choose to write your rules in **either** format, although JSON will offer you slightly more flexibility when writing [advanced rules]({{ "g2p-advanced-mappings" | absolute_url }}).

If we want to write rules that depend on a particular context, we need a couple more columns (CSV) or keys (JSON) than just `in` and `out`. This is where we use `context_before` and `context_after`. So, our second rule from above was to turn /k/ to [kʰ] when the character after /k/ is /æ/. Here, we could write the rules like this:

| in | out | context_before | context_after |
|---|---|---|---|
| k | kʰ | | æ |

or like this using JSON:

```json
[
    {
        "in": "k",
        "out": "kʰ",
        "context_after": "æ"
    }
]
```

## Ok, so how do I actually get these rules to do something?

So, you've understood the [basics of writing rules](#basic-rule-writing) either described above and you want to actually use them to convert something! This section describes exactly how to do that. 

Below is a list of all the rules to capture the transformations between level 1 and level 2 above. There are some rules that we discussed in that section, and some others that might look unfamiliar. For a full description of some of these rules, have a look at the [advanced rule-writing section]({{ "g2p-advanced-mappings" | absolute_url }}).

{% picture custom-rules-g2p-studio.png %}

Once you have written your rules in this section, you can write some text in the left text area at the top of the G2P Studio, and `g2p` will apply your rules and produce the output in the right text area as seen below:

{% picture custom-rules-output-g2p-studio.png %}

You can also click on 'Export' under the Custom Rules section to export your rules to a CSV file if you want to save them for later.

## Mapping configuration

When you combine multiple rules in `g2p` for a particular purpose, this is called a *mapping*. In addition to each file containing your rules, you need a configuration file that tells `g2p` how to process your rules. We write mapping configurations in files titled YAML file `config.yaml`. ".yaml" is the file extension for YAML which stands for 'Yet Another Markup Language' - which might be how you're feeling right now after having already learned about Comma Separated Value (CSV) files and JavaScript Object Notation (JSON)!!

In order to edit your YAML configuration file, you will need some sort of text editor, like [Visual Studio Code](https://code.visualstudio.com/). 

Here is a basic configuration for your mapping:

```yaml
mappings:
  - language_name: English # this is a shared value for all the mappings in this configuration
    display_name: English to IPA # this is a 'display name'. It is a user-friendly name for your mapping.
    in_lang: eng # This is the code for your language input. By convention in g2p this should contain your language's ISO 639-3 code
    out_lang: eng-ipa # This is the code for the output of your mapping. By convention in g2p we suffix -ipa to the in_lang for mappings between an orthography and IPA
    type: mapping 
    authors: # This is a way to keep track of who has contributed to the mapping
      - Aidan Pine
    mapping: eng_to_ipa.json # This is the path to your mapping file. It should be in the same folder as your config.yaml file
```

If you are familiar with yaml, you will see that you can have more than one mapping under the `mappings` key. So to add another mapping to this file, it would look like this:

```yaml
mappings:
  - language_name: English 
    display_name: English to IPA 
    in_lang: eng 
    out_lang: eng-ipa 
    type: mapping 
    authors:
      - Aidan Pine
    mapping: eng_to_ipa.json 
  - language_name: English
    display_name: English IPA to Arpabet
    in_lang: eng-ipa 
    out_lang: eng-arpabet
    type: mapping 
    authors: 
      - Aidan Pine
    mapping: eng_ipa_to_arpabet.json 
```

If you're not familiar with YAML, and you're not just copy pasting from here, I recommend having a look at one of the many [tutorials](https://gettaurus.org/docs/YAMLTutorial/) on how to use YAML properly before attempting to write your own mapping configuration.

### Footnotes

[^1]: I'm using the free, hobby plan at <https://www.heroku.com/> to host it though, so occasionally the server goes to sleep. If you first go to the site and it takes a few seconds to boot up, don't worry!