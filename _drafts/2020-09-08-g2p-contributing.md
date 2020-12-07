---
layout: post
title:  "Tutorial: Contributing a new mapping to g2p for everyone to use"
author: AidanPine
categories: []
tags: [ tutorial, explanation, tech-showcase ]
image: assets/images/bonjour-g2p.png
description: "Tutorial: Contributing a new mapping to g2p for everyone to use"
featured: false
hidden: false
---

TODO: Eddie to elaborate, and maybe submit to [Hacktoberfest](https://hacktoberfest.digitalocean.com/)?

## Advanced: contributing your rules to the main `g2p` library

You've written some cool rules and you want to contribute, that's awesome! There are lots of benefits to contributing your mapping to `g2p`. First of all, once your mapping is accepted, you'll have it available and live on [G2P Studio](https://g2p-studio.herokuapp.com). Second, once the next version of `g2p` is released with your mapping, it will be automatically built in to the [Convertextract](#convertextract) library. Third, if your mapping is between a language's writing system and the IPA, you can also get ReadAlongs support for your language.

So, you write your mapping once, and you get three things for free (G2P studio, convertextract and readalongs). Here's how:

1. Fork g2p, see <https://docs.github.com/en/github/getting-started-with-github/fork-a-repo> for more details
2. Add a folder for your language using the appropriate [ISO 639.3 code](https://en.wikipedia.org/wiki/List_of_ISO_639-3_codes) to `g2p/mappings/langs`
3. Add a `config.yaml` file as described [here](#mapping-configuration)
4. Add your mapping in that same folder (`g2p/mappings/langs/<yourlang>`)
5. If your mapping is for an IPA mapping, you can optionally run `g2p update` to update your mapping into `g2p` and then [generate the mapping](#generate-your-mapping-between-your-languages-ipa-and-english-ipa) between your language and English IPA.
6. Run `g2p update` to add your mapping to `g2p`
7. Add some test data to `g2p/tests/public/data`. 
8. Submit your changes by creating a [pull request](https://github.com/roedoejet/g2p/compare)

Finally, either myself, or somebody else will review the changes, and you will get credit for those mappings and be added to the [list of contributors](https://github.com/roedoejet/g2p/graphs/contributors)

### Adding tests

This is done by adding either a CSV/TSV/PSV file with 4 columns to `g2p/tests/public/data`. The name of the file should be just the input language code, for example `fra.psv` for the French tests. The first column in the file is for the input language code, the second is for the output language code, the third is for the input text and the fourth is for the asserted output of that mapping and input. Here is an example between French (fra) and French IPA (fra-ipa) asserting that 'manger' results in 'mɑ̃ʒe':

```psv
fra|fra-ipa|manger|mɑ̃ʒe
fra|fra-ipa|écoutons|ekutɔ̃
```

There is a test running script at the root of the `g2p` project called `run_tests.py`. You can run all of the tests here using the following:

```python
python run_tests.py all
```

or just run the language assertions including your tests like shown above using:

```python
python run_tests.py langs
```