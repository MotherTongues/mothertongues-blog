---
layout: post
title:  "G2P Part 3: Make a basic mapping with g2p"
author: AidanPine
categories: []
tags: [ tutorial, explanation, tech-showcase, g2p ]
image: assets/images/ab-abc.png
description: "Tutorial: Make a basic mapping with g2p"
featured: false
hidden: false
---

This is the third blog post in a seven-part series describing how to make a basic mapping with `g2p` on your computer. If you haven't already, please read the [introductory blog post for g2p]({{ "g2p-background" | absolute_url }}) and [the post about basic mappings with G2P Studio]({{ "g2p-basic-mappings-gui" | absolute_url }})

- [Background]({{ "g2p-background" | absolute_url }})
- [How to write a basic mapping in G2P Studio]({{ "g2p-basic-mappings-gui" | absolute_url }})
- Writing mappings on your computer
- [Advanced mappings]({{ "g2p-advanced-mappings" | absolute_url }})
- [ReadAlong Studio & Other Applications]({{ "g2p-applications" | absolute_url }})
- [Preprocessing mappings]({{ "g2p-preprocess" | absolute_url }})
- [Contributing]({{ "g2p-contributing" | absolute_url }})

# What you need to know to understand this post

- To be able to follow along, I suggest having some sort of text editor, like [Visual Studio Code](https://code.visualstudio.com/). 

- You will also need to have [Python](https://www.python.org/) installed on your computer. If you need a bit of help, my colleague Eddie Antonio Santos wrote a very good blog article on [installing Python on Mac](https://eddieantonio.ca/blog/2020/01/26/installing-python-on-macos/). 

## What's the gist of what we're about to do?

As described in the [previous post]({{"g2p-basic-mappings-gui" | absolute_url }}), in order to use `g2p` we need to understand the building blocks; **rules** and **mappings**. **Rules** are patterns that describe how to turn some input text into some other output text. When we combine a series of ordered rules together for a specific purpose, we call this a **mapping**. This blog post will show you how to write rules and mappings on your computer to use with `g2p`.

## How do I follow along?

You can follow along by writing your rules and mappings on your computer using a text editor like [Visual Studio Code](https://code.visualstudio.com/).

You should also install `g2p` by running `pip3 install g2p`[^1] in your command line or an [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal) within [Visual Studio Code](https://code.visualstudio.com/). See [this post](https://www.kaggle.com/getting-started/99468) for more information on installing Python packages with pip. 

### Use in Python and the command line

#### Installation

There are two ways to install `g2p`:
 - install the latest published version of `g2p`, for use as is;
 - install an editable version to create your own mappings or edit `g2p` yourself.

To install the latest published version of `g2p`, we recommend installing it using [pip](https://en.wikipedia.org/wiki/Pip_(package_manager)):

```python
pip install g2p
```

If you are going to be creating your own mappings or editing `g2p` in any way, you must first fork `g2p` by going to [https://github.com/roedoejet/g2p](https://github.com/roedoejet/g2p) and forking the project to your own GitHub space.

Once you've forked `g2p`, clone your own fork:

```bash
git clone https://github.com/YourGitHubUsername/g2p.git
```

and then do an *editable* pip installation:

```bash
cd g2p && pip install -e .
```

#### Usage

Using `g2p` within Python can be done programatically using the `make_g2p` function:

```python
>>> from g2p import make_g2p
>>> transducer = make_g2p('dan', 'eng-arpabet')
>>> transducer('hej').output_string
'HH EH Y'
```

#### Command Line Interface

You can also use `g2p` from the command line. The basic command for conversions is:

```bash
g2p convert <input_text> <in_lang> <out_lang>
```

So in practice:

```bash
$ g2p convert hej dan eng-arpabet
HH EH YY
```

## Basic Rule writing

Each rule must be defined to have a sequence of one or more input characters and a sequence of zero or more output characters. We can define these rules in `g2p` either using a tabular spreadsheet format (CSV) or using a format called JavaScript Object Notation or [JSON](https://www.json.org/json-en.html).

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

## Mapping configuration

When you combine multiple rules in `g2p` for a particular purpose, this is called a *mapping*. In addition to each file containing your rules, you need a configuration file that tells `g2p` how to process your rules. We write mapping configurations in YAML files titled `config.yaml`. ".yaml" is the file extension for YAML which stands for 'Yet Another Markup Language' - which might be how you're feeling right now after having already learned about Comma Separated Value (CSV) files and JavaScript Object Notation (JSON)!!

Here is a basic configuration for your mapping:

```yaml
mappings:
  - language_name: My Test Language # this is a shared value for all the mappings in this configuration
    display_name: My Test Language to IPA # this is a 'display name'. It is a user-friendly name for your mapping.
    in_lang: test # This is the code for your language input. By convention in g2p this should contain your language's ISO 639-3 code
    out_lang: test-ipa # This is the code for the output of your mapping. In g2p we suffix -ipa to the in_lang for mappings between an orthography and IPA
    type: mapping 
    authors: # This is a way to keep track of who has contributed to the mapping
      - Aidan Pine
    mapping: test_to_ipa.json # This is the path to your mapping file. It should be in the same folder as your config.yaml file
```

If you are familiar with yaml, you will see that you can have more than one mapping under the `mappings` key. So to add another mapping to this file, it would look like this:

```yaml
mappings:
  - language_name: My Test Language 
    display_name: My Test Language to IPA 
    in_lang: test 
    out_lang: test-ipa 
    type: mapping 
    authors:
      - Aidan Pine
    mapping: test_to_ipa.json 
  - language_name: My Test Language
    display_name: My Test Language IPA to Arpabet
    in_lang: test-ipa 
    out_lang: test-arpabet
    type: mapping 
    authors: 
      - Aidan Pine
    mapping: test_ipa_to_arpabet.json 
```

If you're not familiar with YAML, and you're not just copy pasting from here, I recommend having a look at one of the many [tutorials](https://gettaurus.org/docs/YAMLTutorial/) on how to use YAML properly before attempting to write your own mapping configuration, or looking at some of the examples of configurations in `g2p/mappings/langs/*`.

## Bringing it all together

From following the previous two sections, you should have two files created: `test_to_ipa.json` and `config.yaml`. Your `config.yaml` file should look like this:

```yaml
mappings:
  - language_name: My Test Language # this is a shared value for all the mappings in this configuration
    display_name: My Test Language to IPA # this is a 'display name'. It is a user-friendly name for your mapping.
    in_lang: test # This is the code for your language input. By convention in g2p this should contain your language's ISO 639-3 code
    out_lang: test-ipa # This is the code for the output of your mapping. By convention in g2p we suffix -ipa to the in_lang for mappings between an orthography and IPA
    type: mapping 
    authors: # This is a way to keep track of who has contributed to the mapping
      - Aidan Pine
    mapping: test_to_ipa.json # This is the path to your mapping file. It should be in the same folder as your config.yaml file
```

and your `test_to_ipa.json` file should look like this:

```json
[
    {
        "in": "k",
        "out": "kʰ",
        "context_after": "æ"
    }
]
```

Then, type the following command in your command line or integrated terminal: `g2p convert "kæt" test test-ipa --config /path/to/config.yaml`, replace `/path/to/config.yaml` with the path from your current working directory in the command line to your config.yaml file. You should see the output `kʰæt` produced below. Congratulations! You did your first conversion with `g2p`. Try changing your rules around or converting other text and experiment to see what happens.


### Footnotes

[^1]: See this link for more information on the difference between pip and pip3: <https://www.pythonpool.com/pip-vs-pip3/>
