---
layout: post
title:  "Getting from 'a' to 'b' with g2p - why g2p exists and will let you do awesome things"
author: AidanPine
categories: []
tags: [ tutorial, explanation, tech-showcase, g2p ]
image: assets/images/bonjour-g2p.png
description: "Getting from 'a' to 'b' with g2p - why g2p exists and will let you do awesome things"
featured: false
hidden: false
---

This is the first blog post in a seven-part series about a software tool called `g2p`. This post describes some of the background context for *why* `g2p` was created, and subsequent posts will go into more detail about how to use `g2p`. `g2p` is a tool for systematically converting certain characters[^1] into other ones. This sounds fairly simple, but it can actually be incredibly powerful and useful! For example, maybe you want to [get the pronunciation from a word's spelling](#use-case-1-getting-the-pronunciation-from-a-words-spelling), `g2p` can help with that! Or maybe a language you're learning or teaching has different writing systems and you want to [convert between them](#use-case-2-a-language-with-multiple-writing-systems). Or, maybe your language has an historic or legacy way of writing and you want to [convert it to the new writing system](#use-case-3-converting-from-legacy-writing-systems). There are also other uses for `g2p` which I'll explain in following posts - keep reading to learn the basics of `g2p`.

### G2P Blog Series Index

- Background
- [How to write a basic mapping in G2P Studio]({{ "g2p-basic-mappings-gui" | absolute_url }})
- [Writing mappings on your computer]({{ "g2p-basic-mappings-local" | absolute_url }})
- [Advanced mappings]({{ "g2p-advanced-mappings" | absolute_url }})
- [ReadAlong Studio & Other Applications]({{ "g2p-applications" | absolute_url }})
- [Preprocessing mappings]({{ "g2p-preprocess" | absolute_url }})
- [Contributing]({{ "g2p-contributing" | absolute_url }})

# Who is involved with this project?

- Maintainer (i.e. the person to bug with questions): [Aidan Pine](https://aidanpine.ca)
- Lots of [other contributors](https://github.com/roedoejet/g2p/graphs/contributors)

# What are the motivations behind G2P?

There are many reasons why you might want to systematically convert between different characters. Here are a few possible use cases:

### Use Case #1: Getting the pronunciation from a word's spelling

Sometimes you want to convert between a language's writing system (also known as *orthography*) and its pronunciation. This is a very common task in [natural language processing](https://en.wikipedia.org/wiki/Natural_language_processing) and is essential in the creation of text-to-speech and automatic speech recognition systems. In [another post in this series]({{ "g2p-applications" | absolute_url }}), I will describe the usefulness of `g2p` specifically with a project called "ReadAlongs".

"Letters" in a writing system are usually referred to as "graphemes" and their corresponding meaningful sounds are referred to as "phonemes"; hence "g2p" or "grapheme-to-phoneme". It gets a little more complicated than that though, because sometimes a grapheme is made of more than one character, as with the *digraph* "th" which can be pronounced *[unvoiced](https://www.thoughtco.com/voiced-and-voiceless-consonants-1212092#:~:text=Voiceless%20consonants%20do%20not%20use,as%20in%20%22thing%22)* as in 'thin' or *[voiced](https://www.thoughtco.com/voiced-and-voiceless-consonants-1212092#:~:text=Voiced%20Consonants,-Your%20vocal%20cords&text=As%20you%20pronounce%20a%20letter,W%2C%20Y%2C%20and%20Z.)* as in 'that'. The [International Phonetic Alphabet](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet) (IPA) is not so ambiguous! In IPA, the 'th' in 'thin' is written as **θ** and the 'th' in 'that' is written as **ð**.

### Use Case #2: A language with multiple writing systems

Some languages have two (or more!) different writing systems. Take Cree for example, where you can either write a word in *Standard Roman Orthography* like "ê-wêpâpîhkêwêpinamâhk" or in *Syllabics* like **ᐁᐍᐹᐲᐦᑫᐍᐱᐊᒫᕽ**. My colleague [Eddie](https://eddieantonio.ca) has a great blog post about a tool he created to convert between the two [here]({{ "why-a-new-cree-syllabics-converter" | absolute_url }}). `g2p` can help with this kind of transformation between writing systems.

### Use Case #3: Converting from legacy writing systems

Some languages historically used “font hacks” to render the characters in their writing system before they were supported on computers. There's a longer discussion to be had here, but the tldr version is that when computers were gaining widespread use among speakers of Indigenous languages, they weren't typically able to *render* (i.e., display) characters outside of the 128 characters supported by the [American Standard Code for Information Interchange (ASCII)](https://en.wikipedia.org/wiki/ASCII) or even any of the extensions to ASCII that provide a total of 256 character (e.g., [Latin-1](https://en.wikipedia.org/wiki/ISO/IEC_8859-1) for Western European languages). To get around this, language communities would come up with their own custom fonts (often referred to as “font hacks” or “font encodings”) where they would **override** the display of a characters like “©” which existed in Latin-1, as 'ǧ' instead (example taken from the Heiltsuk Doulos font). For more information on this topic, please check out ['Seeing the Heiltsuk Orthography from Font Encoding through to Unicode'](https://aidanpine.ca/static/cv/pdfs/Pine-Turin-Convertextract-2018.pdf) or ['Applications and innovations in typeface design for North American Indigenous languages'](https://markturin.sites.olt.ubc.ca/files/2020/06/Schillo_Turin_typeface_2020.pdf).

# Using g2p studio

If you want to use `g2p` to convert some text in one of the supported languages[^2], simply visit the [G2P Studio](https://g2p-studio.herokuapp.com), select a language from the dropdown, and type in your text, as shown below. That's all there is to it! To learn how to add support for other languages and use `g2p` for other cool things, go on to [the next part of the series](https://thislinkis.dead)!

{% picture studio-basic.png %}

### Footnotes

[^1]: Because the word 'letter' usually refers to a character within a specific alphabet or writing system, instead of 'letter', I'm going to use the word 'character' throughout this post. Similarly, despite the name of this tool being 'Grapheme-to-Phoneme', in reality `g2p` can be used to convert any characters to any other characters, not just graphemes (contrastive units of a writing system) to phonemes (contrastive units of a sound system).
[^2]: At time of writing, this includes the following list along with their [ISO-639-3](https://en.wikipedia.org/wiki/ISO_639-3) codes) [alq - Anishinàbemiwin](https://en.wikipedia.org/wiki/Algonquin_language), [atj - Atikamekw](https://en.wikipedia.org/wiki/Atikamekw_language), [crg - Michif](https://en.wikipedia.org/wiki/Michif), [crj - Southern & Northern East Cree](https://en.wikipedia.org/wiki/East_Cree), [crx - Plains Cree](https://en.wikipedia.org/wiki/Plains_Cree_language), [crm - Moose Cree](https://en.wikipedia.org/wiki/Moose_Cree_language), [csw - Swampy Cree](https://en.wikipedia.org/wiki/Swampy_Cree_language), [ctp - Western Highland Chatino](https://en.wikipedia.org/wiki/Highland_Chatino), [dan - Danish](https://en.wikipedia.org/wiki/Danish_language), [fra - French](https://en.wikipedia.org/wiki/French_language), [git - Gitksan](https://en.wikipedia.org/wiki/Gitxsan_language), [gla - Scottish Gaelic](https://en.wikipedia.org/wiki/Scottish_Gaelic), [gwi - Gwich'in](https://en.wikipedia.org/wiki/Gwich%CA%BCin_language), [haa - Hän](https://en.wikipedia.org/wiki/H%C3%A4n_language), [ikt - Inuinnaqtun](https://en.wikipedia.org/wiki/Inuinnaqtun), [iku - Inuktitut](https://en.wikipedia.org/wiki/Inuktitut), [Kaska](https://en.wikipedia.org/wiki/Kaska_language), [kwk - Kwak'wala](https://en.wikipedia.org/wiki/Kwak%CA%BCwala), [lml - Raga](https://en.wikipedia.org/wiki/Raga_language), [mic - Mi'kmaq](https://en.wikipedia.org/wiki/Mi%EA%9E%8Ckmaq_language), [moh - Kanien'kéha](https://en.wikipedia.org/wiki/Mohawk_language), [oji - Anishinaabemowin](https://en.wikipedia.org/wiki/Ojibwe_language), [see - Seneca](https://en.wikipedia.org/wiki/Seneca_language), [srs - Tsuut'ina](https://en.wikipedia.org/wiki/Tsuut%CA%BCina_language), [tau - Upper Tanana](https://en.wikipedia.org/wiki/Upper_Tanana_language), [tce - Southern Tutchone](https://en.wikipedia.org/wiki/Tutchone_language), [ttm - Northern Tutchone](https://en.wikipedia.org/wiki/Tutchone_language), [tgx - Tagish](https://en.wikipedia.org/wiki/Tagish_language), [tli - Tlingit](https://en.wikipedia.org/wiki/Tlingit_language)