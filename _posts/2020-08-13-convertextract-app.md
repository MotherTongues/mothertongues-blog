---
layout: post
title:  "How to use the new Convertextract application for 'quality control' of ELAN annotations"
author: fineen
categories: [ Tutorial, Blog ]
tags: [ basic ]
image: assets/images/gui.png
description: "How to install and use the new Convertextract app for 'quality control' purposes"
featured: false
hidden: false
---

# TL;DR

Have you ever wanted to *NOT* spend hours tediously checking that **k + '** is written as **k̓** and not **k'**?
If you said **YES!**, *Convertextract* is the app for you. With minimal technical knowledge, you can now systemically make your [ELAN](https://archive.mpi.nl/tla/elan) annotations consistent.

# What you need to know to understand this post

I assume that you know some background about the [g2p library](https://github.com/roedoejet/g2p).
For the purposes of using these tools, a library is a collection of code and documentation, but if you would like to dig deeper you can check out this [Wikipedia article](https://en.wikipedia.org/wiki/Library_(computing)) 
The g2p library uses existing and custom mappings (i.e. arbitrary input->output conversions). For example, you might want **k'** (input) to be converted to **k̓** (output). The Mapping is the roadmap for converting.
These conversions are **arbitrary**, so depending on your use case you may need to create new mappings. Most of the existing mappings convert *Graphemes* (a character in the writing system of a language) to *Phonemes* (their equivalent sound in the language), hence the name 'g2p'. 
To keep this post simple, I will not explain how to add new g2p mappings. The documentation for adding mappings is [here](https://github.com/roedoejet/g2p#writing-mapping-files)

# Who is involved with this project?

- Kwak̓wala Corpus Collection group

	Sara Child [saratlilinukw@gmail.com](mailto:saratlilinukw@gmail.com)
	Daisy Rosenblum [daisy.rosenblum@ubc.ca](mailto:daisy.rosenblum@ubc.ca)
	Caroline Running Wolf [caroline.oldcoyote@gmail.com](mailto:caroline.oldcoyote@gmail.com)

- App developer: [Aidan Pine](aidanpine.ca)

- Support for adding mappings/parsers: [Fineen](fineen.davis@gmail.com)


# What is needed to replicate the content in the post?

- [g2p](https://github.com/roedoejet/g2p) Mappingof the desired conversions
- Language text to be converted
- [Convertextract](https://github.com/roedoejet/convertextract/) app (read the post for installation!) 

# What are the motivations behind this technology?

As a Student Intern on the NRC's [Indigenous Language Technology (ILT) project](https://nrc.canada.ca/en/research-development/research-collaboration/programs/canadian-indigenous-languages-technology-project), I was approached by the Kwak̓wala Corpus Collection group to help create a systemic way to streamline the quality control process for their ELAN annotation data. Having many different people with many different orthographic conventions (i.e. different ways of writing the same thing) all working on annotating Kwak̓wala language data had resulted in inconsistencies. 

For example, there was four ways that people were writing **t̓s**:
- **t's**, **t̕s**, **ts̓**, **ts'**

So, I added mappings in the g2p library that took the alternative forms and *streamlined* them therefore producing only one form in the output.Then I added support for ELAN files in the Convertextract library, so that the process became automated. Aidan Pine then turned Convertextract into an app!

# How to use the new Convertextract app for 'quality control' of ELAN annotations

[Convertextract](https://github.com/roedoejet/convertextract), created by Aidan Pine, is a `python` library which extracts text data and finds/replaces specific text based on arbitrary correspondences. 
Until now, only basic [CLI](https://en.wikipedia.org/wiki/Command-line_interface) (Command Line Interface) was supported. Using Convertextract in the CLI allowed the user to convert a file based on pre-existing Mappings in the [g2p library](https://github.com/roedoejet/g2p/tree/master/g2p/mappings/langs) or based on a custom Mapping (not described here). However, the downside is that some programming knowledge is needed to use the CLI.
The latest update now includes a [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) (Graphical User Interface) in the form of an app (for Mac computers **only**). The app makes Convertextract more accessible for non-programmers.

### 1. G2P mapping

*Convertextract* will carry out the streamlining for you, but it has to know what to convert. The g2p Mapping is this roadmap. See the previous section *What you need to know to understand this post* for more information on how to see if your language is supported. 

### 2. Language data

You language data must be in one of the supported file formats. The most recent addition is `.eaf` files, which allows ELAN annotations to be used!
For a full list of supported file types click [here](https://github.com/roedoejet/convertextract/tree/master/convertextract/parsers).

### 3. Convertextract application

#### Installation

**IMPORTANT** The app works on **Mac only!!!**

To download the app: <https://github.com/roedoejet/convertextract/releases>

In your downloads folder, find the .zip file and double click on it to unzip.
- Downloads>**convertextract**

Right-click on the application in the dist folder and select *Open*.
- Downloads>convertextract>dist>**Convertextract**

*Note: If you try to double click to open the app, you will get a security message. Right-clicking to open will allow you to override the security message.*

#### Using the app

This is what the app looks like when you open it.

{% picture gui.png -alt convertextract GUI %}

All you have to do is add your language data, choose the encoding (usually 'utf-8' should suffice), and pick your g2p mapping!
The output will be exported as a copy of the input file + *_converted.ext* in the filename.

##### Example case

When typing, there is more than one way to write **k̓** in the Kwak̓wala language. Convertextract takes all of these possibilities and generates *one* output for the sake of consistency.

I used the following inputs for *Convertextract*:

 - Encoding: `utf-8` 
 - Input_language: `kwk-umista `
 - Output_language: `kwk-umista-con`

Performing '*quality control*'

|| Input language |Output language|
|---|--|--|
|Language code|kwk-umista|kwk-umista-con|
|Sample text|*kwak'wala* |*kwak̓wala*|
||*kwak]wala* |*kwak̓wala*|



If you need help setting up the app or have any questions at all, please feel free to comment below or send me an email!

