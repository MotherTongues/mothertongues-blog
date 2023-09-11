---
layout: post
title:  "G2P Part 7: Contributing a new mapping to g2p for everyone to use"
author: AidanPine
categories: []
tags: [ tutorial, explanation, tech-showcase, g2p ]
description: "Tutorial: Contributing a new mapping to g2p for everyone to use"
featured: false
hidden: false
---

This is the last part of the seven-part series on g2p. In this part, we'll discuss how to contribute your mappings to the main g2p library.

### G2P Blog Series Index

- [Background]({{ "g2p-background" | absolute_url }})
- [How to write a basic mapping in G2P Studio]({{ "g2p-basic-mappings-gui" | absolute_url }})
- [Writing mappings on your computer]({{ "g2p-basic-mappings-local" | absolute_url }})
- [Advanced mappings]({{ "g2p-advanced-mappings" | absolute_url }})
- [ReadAlong Studio & Other Applications]({{ "g2p-applications" | absolute_url }})
- [Preprocessing mappings]({{ "g2p-preprocess" | absolute_url }})
- Contributing

## NOTE!

As of September 2023, there is a new version of `g2p` available: 2.0 - the instructions in this blog were originally written for version 1.x. If you already have `g2p` installed, we recommend that you upgrade your installation before continuing on with this post.

## Advanced: contributing your rules to the main `g2p` library

So, you've written some cool rules and you want to contribute, that's awesome! There are lots of benefits to contributing your mapping to `g2p`. First of all, once your mapping is accepted, you'll have it available and live on [G2P Studio](https://g2p-studio.herokuapp.com). Second, once the next version of `g2p` is released with your mapping, it will be automatically built in to the [Convertextract]({{ "convertextract-app" | absolute_url }}) library. Third, if your mapping is between a language's writing system and the IPA, you can also get [ReadAlongs]({{ "g2p-applications" | absolute_url }}) support for your language.

So, you write your mapping once, and you get three things for free (G2P studio, convertextract and readalongs). Here's how:

1. Fork g2p, see <https://docs.github.com/en/github/getting-started-with-github/fork-a-repo> for more details
2. Add a folder for your language using the appropriate [ISO 639.3 code](https://en.wikipedia.org/wiki/List_of_ISO_639-3_codes) to `g2p/mappings/langs`, i.e., create the folder `g2p/mapping/langs/<yourlangcode>/`
3. Add a `config-g2p.yaml` file as described [here]({{ "g2p-basic-mappings" | absolute_url }}) in that folder
4. Add your mapping in that same folder
5. If your mapping is for an IPA mapping, you can optionally run `g2p update` to update your mapping into `g2p` and then generate the mapping as described in the [ReadAlongs post]({{ "g2p-applications" | absolute_url }}) between your language and English IPA.
6. Run `g2p update` to add your mapping to `g2p`
7. Add some test data to `g2p/tests/public/data`. 
8. Submit your changes by creating a [pull request](https://github.com/roedoejet/g2p/compare)

Finally, either myself, or somebody else will review the changes, and you will get credit for those mappings and be added to the [list of contributors](https://github.com/roedoejet/g2p/graphs/contributors)

### Adding tests

Testing your work is a really important part of software engineering. It lets us make changes to code and be confident that new features don't break the expected functionality of `g2p`. In order to add tests for your mapping, you can add a CSV/TSV/PSV file with 4 columns to `g2p/tests/public/data`. The name of the file should be just the input language code, for example `fra.psv` for the French tests. The first column in the file is for the input language code, the second is for the output language code, the third is for the input text and the fourth is for the expected output of that mapping and input. Here is an example between French (fra) and French IPA (fra-ipa) asserting that 'manger' results in 'mɑ̃ʒe':

```psv
fra|fra-ipa|manger|mɑ̃ʒe
fra|fra-ipa|écoutons|ekutɔ̃
```

There is a script for running tests at the root of the `g2p` project called `run_tests.py`. You can run all of the tests here using the following:

```python
python run_tests.py all
```

or just run the language assertions including your tests like shown above using:

```python
python run_tests.py langs
```

Writing g2p mappings that handle all the special cases can be quite tricky, especially when there are potential interactions between rules. To be confident that your g2p mappings work as you think, you should add a bunch of different words covering most of the spelling phenomena of the language you're working on, with their expected IPA mapping. Ideally, you should also add some test cases to eng-ipa and eng-arpabet, to make sure the generated mapping works correctly. If you run into difficulties, feel free to post comments on this blog post or on the g2p library GitHub issues page!