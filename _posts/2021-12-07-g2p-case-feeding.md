---
layout: post
title:  "Preventing feeding of g2p rules with case"
author: joanise
categories: [ Tutorial ]
tags: [ tutorial, explanation, g2p ]
image: false
description: "Tutorial: how to prevent feeding between g2p rules"
featured: false
hidden: false
---

When you write [g2p mappings]({{ "g2p-background" | absolute_url }}), sometimes you find yourself wanting to [prevent feeding]({{ "g2p-advanced-mappings#prevent_feeding-default-false" | absolute_url }}) between rules, but your situation is too complex to be handled by the normal prevent-feeding option.

This blog post describes a technique that can be used to handle complex rule feeding scenarios.

# TL;DR

If you want your g2p mapping to prevent feeding between the input and output of your rules, while retaining the ability to match the output of your rules in the context of other rules, you can use this three-step mapping technique using case to prevent rule feeding, instead of a single mapping with `prevent_feeding` enabled.

# What you need to know to understand this post

This post will only make sense if you're already an advanced user of the g2p system, and you are writing your own mappings.

We assume:
 - Knowledge of the [g2p module](https://github.com/roedoejet/g2p).
 - You've read the [seven part blog post on g2p]({{ "g2p-background" | absolute_url }}).
 - You know how to use `context_after` and `context_before` in g2p mappings.
 - You know how to write mappings in `.csv` files.
 - You know how to call `g2p convert`.
 - You're trying to use `prevent_feeding` but it's not doing what you want.

Note: the word "feeding" comes from the linguistic concept of [feeding order](https://en.wikipedia.org/wiki/Feeding_order), where a rule is said to feed into another rule if it creates the context for the second rule to apply.

# Who is involved with this project?

- g2p project owner: [Aidan Pine](https://aidanpine.ca)
- Author of this post, and g2p software developer: Eric Joanis
- TODO anyone else I should name???

# What is needed to replicate the content in the post?

To reproduce the examples below, you will need to install `g2p` on your own machine by following the instructions at [GitHub/g2p](https://github.com/roedoejet/g2p) and make sure the `g2p convert` command line works.

You'll need a recent version of `g2p`, since we'll make use of the new `--config` option to `g2p convert`. Release v0.5.202112?? or more recent will work, or the master branch on GitHub as of 2021-12-07 or more recent. (TODO create that release before this blog post is published.)

# What are the motivations behind this technique?

In an advanced g2p mapping scenario, our collaborators (TODO: name them???) found themselves writing rules where, as soon as one rule matched a piece of text, no further rules should touch that text. There were many dozens of rules, each one handling some sequence of characters occurring in a specific context, with some catch-all rules at the end that applied if none of the listed contexts applied.

The problem they faced was that using `prevent_feeding` solved making sure no part of the text was touched more than once, but it also prevented touched text from being used in the context of subsequent rules, as was necessary.

# Solving this complex prevent-feeding scenario

## Minimal setup

For this blog post, we'll create a fictitious scenario with a minimum number of rules exhibiting the problem found in the real use case described above.

Imagine we use a g2p mapping to modify some spelling rules, where the same sequence of letters is mapped differently depending on context. In our minimal example, we want to handle "un" as follows:
 - when the string "atin" occurs, it should be replaced by "etin", and the resulting "un" should not be further modified;
 - when "un" occurs before "a" or "e", it should remain as "un";
 - otherwise, "un" should be changed to "on" (catch-all rule).

With these rules, the word "untunatun" should get changed to "antinetin" because the third "un" is part of "atun", the second "un" is followed by "a" or "e", and only the first "un" is handled by our catch-all rule.

Notice that the first two rules preserve "un" in their output, so we have to make sure the output of a rule cannot be reused as the output of a subsequent rule.

## The obvious solution, which does not work

We can almost solve this by using `prevent_feeding`, but not quite.

Let's write the rules as follows:

`mapping.csv`:
```
atun,etun,,
un,un,,[ae]
un,on,,
```

and use config file `config.yaml`, where we are careful to set `prevent_feeding: true`:
```
display name: mapping example for un with prevent feeding
mapping: mapping.csv
in_lang: l1
out_lang: l2
case_sensitive: false
prevent_feeding: true
```

When you run `g2p convert --config config.yaml untunatun l1 l2`, you will get "ontonetun" as output instead of the intended "ontunetun".

**What's the error?** (I know, it's subtle...) The middle "un" should have matched the second rule, since it was followed by "a" before the first rule was applied, and is still followed by "e" after the first rule was applied. That should have blocked the application of the third rule, but apparently it didn't.

**Why is this happening?** We need to talk about how `prevent_feeding` is implemented to answer that question. The point of the prevent-feeding option is to make sure that the output of a rule is never matched as the input of any other rule. To accomplish that, we actually map the output of each rule temporarily to characters in a [Private Use Area](https://en.wikipedia.org/wiki/Private_Use_Areas) in the Unicode standard, and map them back to the real output once all rules have been applied. The private use area characters are intended for internal (hence "private") use within software, but should never be printed, so they were perfect to solve the prevent-feeding problem: they should never occur in input text or in the input of any rule, and so there would never unintended feeding between rules.

The problem is that those private characters are also inaccessible to the `context_before` and `context_after` parts of our rules. So `prevent_feeding` not only blocks the characters from being matched as the input of other rules, it also blocks them from being matched in their contexts.

If you want to see exactly what's going on, run that convert command again with the `--debugger` option. For each rule that gets applied, you'll see the rule, as well as the text before and after it is applied. That can help understand what's going on whe you're trying to debug a g2p mapping.

## A three-step prevent-feeding solution, which does work

The work-around we propose in this blog post is the following:

Instead of defining one mapping with prevent feeding enabled, we'll define three mappings applied one after the other, and we'll create our own temporary representation for previously mapped characters:
 - mapping 1: lowercase all input text;
 - mapping 2: make a **case-sensitive** mapping where the input of each rule is lowercase, the output of each rule is uppercase, and the context of each rule lists both cases, so contexts match before and after the application of other rules;
 - mapping 3: lowercase all output text.

The result exists as a [test case in the g2p repo](https://github.com/roedoejet/g2p/tree/master/g2p/tests/public/mappings/case-feed/), but we'll show it here too, a bit simplified.

`case-nofeed-mapping.csv`:
```
atun,ETUN,,
un,UN,,[aAeE]
un,ON,,
```

`case-nofeed-config.yaml`:
```
mappings:
  - display name: case-nofeed input lowercaser
    mapping: empty.csv
    in_lang: l1
    out_lang: l1-lc
    case_sensitive: false
  - display_name: main case-nofeed mapping with l1 in lc, l2 in uc, thus no feeding
    mapping: case-nofeed-mapping.csv
    in_lang: l1-lc
    out_lang: l2-uc
    case_sensitive: true
  - display name: case-nofeed output lowercaser
    mapping: empty.csv
    in_lang: l2-uc
    out_lang: l2
    case_sensitive: false
```

For the two lowercasing mappings, notice we referred to file `empty.csv`. We indeed need to create an empty file called `empty.csv`. We're using the fact that when a case insensitive mapping (i.e., a mapping with `case_sensitive: false`) is applied, its input is lowercased before the rules are applied, so we don't need to provide any actual rules, which means an empty CSV file will do.

Now, when you run `g2p convert --config case-nofeed-config.yaml untunatun l1 l2`, you get the expected "ontunetun" output because for the middle "un", the second rule matches that "E" in its `context_after`, since the first rule changed "atun" to "ETUN".

## What if my mapping is case sensitive?

OK, so this solution depends on the fact that if your mapping is case insensitive, all input gets dropped to lower case before mapping starts, so distinctions of case in the input are not meaningful. This allows us to use upper case characters as that temporary intermediate representation that could not be matched as the input of other rules.

If your mapping has to be case sensitive, then you cannot use this solution. Instead, you would have to carefully choose your own temporary representation to block feeding via your rule design, while still being able to place that temporary representation in the context of other rules. But make sure you use characters that cannot be valid input in the language you're working with!
