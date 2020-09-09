---
layout: post
title:  "Getting from 'a' to 'b' with g2p - why g2p exists and will let you do awesome things"
author: AidanPine
categories: []
tags: [ tutorial, explanation, tech-showcase ]
image: assets/images/bonjour-g2p.png
description: "Getting from 'a' to 'b' with g2p - why g2p exists and will let you do awesome things"
featured: false
hidden: false
---

TODO:
    - Make this more awesome. Get people stoked.

This is the first blog post in a series about a software tool called `g2p`. This post describes some of the background context for *why* `g2p` was created, and subsequent posts will go into more detail about how to use `g2p`. `g2p` is a tool for systematically converting certain characters[^1] into other ones. Common use cases include [getting the pronunciation from a word's spelling](#use-case-1-getting-the-pronunciation-from-a-words-spelling), as well as [converting text for a language with multiple writing systems](#use-case-2-a-language-with-multiple-writing-systems), and [converting text from legacy writing systems](#use-case-3-converting-from-legacy-writing-systems).

# Who is involved with this project?

- Maintainer (i.e. the person to bug with questions): [Aidan Pine](https://aidanpine.ca)
- Lots of [other contributors](https://github.com/roedoejet/g2p/graphs/contributors)

# What are the motivations behind G2P?

There are many reasons why you might want to systematically convert between different characters. Here are a few possible use cases:

### Use Case #1: Getting the pronunciation from a word's spelling

Sometimes you want to convert between a language's writing system (also known as *orthography*) and its pronunciation. This is a very common task in [natural language processing](https://en.wikipedia.org/wiki/Natural_language_processing) and is essential in the creation of text-to-speech and automatic speech recognition systems. In [another post in this series](https://thislinkis.dead), I will describe the usefulness of `g2p` specifically with a project called "ReadAlongs".

"Letters" in a writing system are usually referred to as "graphemes" and their corresponding meaningful sounds are referred to as "phonemes"; hence "g2p" or "grapheme-to-phoneme". It gets a little more complicated than that though, because sometimes a grapheme is made of more than one character, as with the *digraph* "th" which can be pronounced *[unvoiced](https://www.thoughtco.com/voiced-and-voiceless-consonants-1212092#:~:text=Voiceless%20consonants%20do%20not%20use,as%20in%20%22thing%22)* as in 'thin' or *[voiced](https://www.thoughtco.com/voiced-and-voiceless-consonants-1212092#:~:text=Voiced%20Consonants,-Your%20vocal%20cords&text=As%20you%20pronounce%20a%20letter,W%2C%20Y%2C%20and%20Z.)* as in 'that'. The [International Phonetic Alphabet](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet) (IPA) is not so ambiguous! In IPA, the 'th' in 'thin' is written as **θ** and the 'th' in 'that' is written as **ð**.

### Use Case #2: A language with multiple writing systems

Some languages have two (or more!) different writing systems. Take Cree for example, where you can either write a word in *Standard Roman Orthography* like "ê-wêpâpîhkêwêpinamâhk" or in *Syllabics* like **ᐁᐍᐹᐲᐦᑫᐍᐱᐊᒫᕽ**. My colleague [Eddie](https://eddieantonio.ca) has a great blog post about a tool he created to convert between the two [here]({{ "why-a-new-cree-syllabics-converter" | absolute_url }}).

### Use Case #3: Converting from legacy writing systems

Some languages historically used “font hacks” to render the characters in their writing system before they were supported on computers. There's a longer discussion to be had here, but the Coles notes version is that when computers were gaining widespread use among speakers of Indigenous languages, they weren't typically able to *render* (i.e., display) characters outside of the 128 characters supported by the [American Standard Code for Information Interchange (ASCII)](https://en.wikipedia.org/wiki/ASCII) or even any of the extensions to ASCII that provide a total of 256 character (e.g., [Latin-1](https://en.wikipedia.org/wiki/ISO/IEC_8859-1) for Western European languages). To get around this, language communities would come up with their own custom fonts (often referred to as “font hacks” or “font encodings”) where they would **override** the display of a characters like “©” which existed in Latin-1, as 'ǧ' instead (example taken from the Heiltsuk Doulos font). For more information on this topic, please check out ['Seeing the Heiltsuk Orthography from Font Encoding through to Unicode'](http://aidanpine.ca/static/cv/pdfs/Pine-Turin-Convertextract-2018.pdf) or ['Applications and innovations in typeface design for North American Indigenous languages'](https://markturin.sites.olt.ubc.ca/files/2020/06/Schillo_Turin_typeface_2020.pdf).

# How to get from 'a' to 'b' (or 'a' to 'æ') with g2p

`g2p` is a Python library[^2] that helps you convert between different characters based on user-defined rules. The inspiration for how to write these rules was mostly taken from the notion of [phonological rewrite rules](https://en.wikipedia.org/wiki/Phonological_rule), which is a common way of describing *multilevel* phonological changes in linguistics. *Multilevel* changes is the idea that a word, like 'cats' or 'dogs' can have multiple 'levels' of representation. For example, you might think of the way that those words are written in English orthography (writing system) as one level. Then, you might think of a general pronunciation for those words, written in the phonetic alphabet, as another level. You could also separate that level into more than one level by having a level each for [narrow and broad transcriptions](https://en.wikipedia.org/wiki/Phonetic_transcription#Narrow_versus_broad_transcription:~:text=orthography.-,Narrow%20versus%20broad%20transcription).

| Level Name |  Word #1   |  Word #2  | Word # 3 |
|---|---|---|---|
| Level 1 (orthography) | cat | dog | back |
| Level 2 (broad IPA) | kæt | dɑɡ | bæk |
| Level 3 (narrow IPA) | kʰæt | dɑɡ | bæk |

Now, just by looking at these three levels, you can probably see some fairly systematic rules here that you could imagine would get you from one level to the next, even if you don't know the phonetic alphabet by heart and even if you don't really know much about English phonology (sound patterns and systems).

One possible hypothesis would be that all 'a' characters in level one turn to 'æ', so we might want a rule to express that all instances of 'a' turn to /æ/. And, for another example, it looks like between levels 2 and 3, /k/ turns into either [k] or [kʰ] depending on whether it occurs before or after /æ/[^3]. 

So, with these hypotheses about the rules to transform from one level to another, how do we start translating this into rules for `g2p`? Get started by having a look at the blog post on [writing basic rules]({{ "g2p-basic-mappings" | absolute_url }}) for more info!

### Footnotes

[^1]: Because the word 'letter' usually refers to a character within a specific alphabet or writing system, instead of 'letter', I'm going to use the word 'character' throughout this post. Similarly, despite the name of this tool being 'Grapheme-to-Phoneme', in reality `g2p` can be used to convert any characters to any other characters, not just graphemes (contrastive units of a writing system) to phonemes (contrastive units of a sound system).
[^2]: A Python 'library' is a collection of code
[^3]: Orthographic characters are circumfixed with apostrophes like 'a', broad IPA typically uses forward slashes like /k/ and narrow IPA typically uses square brackets like [kʰ]