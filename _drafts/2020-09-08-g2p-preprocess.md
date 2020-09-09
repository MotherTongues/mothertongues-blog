---
layout: post
title:  "Tutorial: Solve inconsistencies in your text with a g2p pre-processing mapping"
author: AidanPine
categories: []
tags: [ tutorial, explanation, tech-showcase ]
image: assets/images/bonjour-g2p.png
description: "Tutorial: Solve inconsistencies in your text with a g2p pre-processing mapping"
featured: false
hidden: false
---

TODO:

    "I would make "adding a pre-processing" mapping its own, standalone blog post. Something like "Making language text consistent with g2p pre-processing mappings" and it could link to Fineen's convertextract post!" - Eddie

## Adding a 'pre-processing' mapping

It's often not sufficient to just write a mapping between the characters in a language's orthography and the IPA. As seen in [use case #2](#use-case-2-a-language-with-multiple-writing-systems) and [use case #3](#use-case-3-converting-from-legacy-writing-systems), real-world text input is pretty messy, and if we want ReadAlongs or Convertextract - or any other tool that uses `g2p` - to work properly, we need to account for as much of that messiness as possible. Generally speaking, solving this kind of messiness is usually called 'Text Normalization'.[^n] This 'normalization' can either be about ensuring that the same Unicode characters are used consistently, or it can also be about converting symbols into their pronounced form, like & or 123. 

[^n]: not to be confused with Unicode Normalization, which is different usage of the same term!

For example, maybe your language uses underlines in its orthography. There are two commonly confusable Unicode characters here: U+0331 COMBING MACRON BELOW and U+0332 COMBINING LOW LINE, and they look almost identical (cf. g̱ (U+0331) vs g̲ (U+0332)). So, let's 'normalize' to consistently use U+0331.

| in | out | context_before | context_after |
|---|---|---|---|
| \u0332 | \u0331 | |  |

Second, maybe we have a text that has a lot of puncutation like '&' in it. We could write a mapping here for that as well (example in Danish):

| in | out | context_before | context_after |
|---|---|---|---|
| & | og | |  |

How do we link this up with the rest of our mappings? We recommend calling these mappings `<yourlang>-norm`. When you run `g2p update`, `g2p` creates a [directed graph](https://mathinsight.org/definition/directed_graph#:~:text=A%20directed%20graph%20is%20graph,digraph%20or%20a%20directed%20network.) between all possible mappings. Consider we have a `g2p` pipeline from 'dan' to 'eng-arpabet' that goes through the `g2p` graph like so, 'dan' → 'dan-ipa' → 'eng-ipa' → 'eng-arpabet'. We basically want to add one more conversion along this path that does this normalization step. So, we [configure a mapping](#mapping-configuration) for a mapping from 'dan' → 'dan-norm' containing our normalizations, then we rename the existing mapping to 'dan-norm' → 'dan-ipa'. Then, we `g2p update` and the next time we run a mapping from 'dan' → 'eng-arpabet', it will pass through the normalization mapping too.
