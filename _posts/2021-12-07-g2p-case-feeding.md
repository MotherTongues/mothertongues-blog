---
layout: post
title:  "Preventing feeding of g2p rules"
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

If you want your g2p mapping to prevent feeding between the input and output of your rules, while retaining the ability to match the input and output of your rules in the context of other rules, you can use a three step mapping instead of a single mapping with `prevent_feeding` enabled.

# What you need to know to understand this post

This post will only make sense if you're already an advanced user of the g2p system, and you are writing your own mappings.

We assume:
 - Knowledge of [g2p](https://github.com/roedoejet/g2p)
 - You've read the [seven part blog post on g2p]({{ "g2p-background" | absolute_url }}).
 - You know how to use `context_after` and `context_before` in g2p mappings.
 - You know how to write mappings in `.csv` files.
 - You know how to call `g2p convert` with its `--config` option.
 - You're trying to use `prevent_feeding` but it's not doing what you want.

# Who is involved with this project?

- g2p project owner: [Aidan Pine](https://aidanpine.ca)
- Author: Eric Joanis

# What is needed to replicate the content in the post?

To reproduce the examples below, you will need to install `g2p` on your own machine by following the instructions on [GitHub/g2p](https://github.com/roedoejet/g2p) and make sure the `g2p convert` command line tool works.

# What are the motivations behind this project/technology/tip?

In an advanced g2p mapping scenario, our collaborators (Q: name them???) found themselves writing rules where, as soon as one rule matched some text, no further rules should touch that text.

Imagine I use a g2p mapping to modify some spelling rules, and the same sequence of letters might get mapped differently depending on the context it is found in. The real use case for this was more complex, but let's simplify it to replace "in" by something else depending on the context:
 - when the string "atin" occurs, it should be replaced by "etin", and "in" should not be further modified;
 - when "in" occurs before "a" or "e", it should remain as "in";
 - otherwise, "in" should be changed to "an".

With these rules, the word "intinatin" should get changed to "antinetin" because the third "in" is part of "atin", the second "in" is followed by "a", and the first in falls on the "otherwise" clause above.

# Solving this situation with prevent-feeding

## The obvious solution, which does not work.

We can almost solve this by using `prevent_feeding`, but not quite.

Let's say you write the rules as follows:

`in-mapping.csv`:
```
atin,etin,,
in,in,,[ae]
in,an,,
```

and use this config file: `in-config.yaml`:
```
display name: in mapping example with prevent feeding
mapping: in-mapping.csv
in_lang: in
out_lang: out
case_sensitive: false
prevent_feeding: true
```

When you run `g2p convert --config in-config.yaml intinatin in out`, you will get "antanetin" as output instead of "antinetin".

**What's the error?** (I know, it's subtle...) The middle "in" should have matched the second rule, since it was followed by "a" before the first rule is applied, and is still followed by "e" after the first rule is applied. That should have blocked the application of the third rule, but it didn't.

**Why is this happening?** We need to talk about how `prevent_feeding` is implemented to answer that question. The point of the prevent-feeding option is to make sure that the output of a rule is never matched again as the input of any other rule. To accomplish that, we actually map the output of each rule temporarily to characters in the Supplementary Private Use Area in the Unicode standard, and map them back to the real output when all rules have been applied. Those characters are intended for internal ("private") use within software, but should never be printed, so they were perfect to solve the prevent feeding problem: they could never occur in the input of any rules, and so there would never unintended feeding between rules.

The problem is that those private characters are also inaccessible to the `context_before` and `context_after` parts of your rules. So `prevent_feeding` not only blocks the characters from being matched as the input of other rules, it also blocks them from being matched in their contexts.

## Three step prevent-feeding solution

The work-around we propose in this blog post is the following.

Instead of defining one mapping with prevent feeding enabled, we'll define three mappings applied one after the other, and we'll create our own temporary representation for previously mapped characters:
 - mapping 1: lowercase all input text
 - mapping 2: in a **case-sensitive** mapping, make the input of each rule lowercase, the output of each rule uppercase, and the context of each rule mixed case, so contexts match before and after the application of other rules
 - mapping 3: lowercase all output text

The result exists as a test case in the g2p repo: `g2p/g2p/tests/public/mappings/case-feed` but we'll show it here too, a bit simplified.

`casefeed-mapping.csv`:
```
atin,ETIN,,
in,IN,,[aAeE]
in,AN,,
```

`casefeed-config.yaml`:
```
mappings:
  - display name: case-feed input lowercaser
    mapping: empty.csv
    in_lang: in
    out_lang: in-lc
    case_sensitive: false
  - display_name: case-feed main mapping in is lc, out is uc, thus no feeding
    mapping: casefeed-mapping.csv
    in_lang: in-lc
    out_lang: out-uc
    case_sensitive: true
  - display name: case-feed output lowercaser
    mapping: empty.csv
    in_lang: out-uc
    out_lang: out
    case_sensitive: false
```

Now, when you run `g2p convert --config casefeed-config.yaml intinatin in out`, you get the expected "antinetin" output because for the middle "in", the second rule see that "E" in the context, even though the first rule has already been applied.

## What if my mapping is case sensitive?

OK, so this solution actually depends on the fact that if your mapping is case insensitive, all input gets dropped to lower case before mapping starts, so distinctions of case in the input were not meaningful. This allowed us to use upper case characters as that temporary intermediate representation that could not be matched as the input of other rules.

If your mapping has to be case sensitive, then you cannot use this solution. Instead, you would have to carefully choose your own temporary representation to block feeding via your rule design, while still being able to place that temporary representation in the context of other rules. But make sure you use characters that cannot be valid input in the language you're working with!

