---
layout: post
title:  "Standard post template"
author: AidanPine
categories: [ Tutorial, Blog ]
tags: [ basic, contributing ]
image: false
description: "How to write a basic blog post"
featured: false
hidden: false
---

This blog post describes what a basic template for a post on this blog should look like. Feel free to just copy past the headers into your post and replace the text! The instructions for each section are italicized, and the answers for this specific blog post are following the italicized text.

# TL;DR

*We recommend having a section at the top that gives an extremely short summary of the post (ideally 2 or 3 sentences). This should be high-level, and shouldn't assume any technical knowledge.*

This is a template of a blog post to follow when writing other blog posts - how meta!

# What you need to know to understand this post

*Your post should have a list of technical skills that you think are needed to understand the blog post. This will help the reader know if they'll be able to benefit from reading it or whether they should study up on something first.*

- Knowledge of writing [markdown](https://www.markdowntutorial.com/)

# Who is involved with this project?

*Beyond the author's information which will be part of this post, there should be a list of everybody involved with the technology discussed in the post, if applicable. The list of contacts should be clear*

- Author/Blog Maintainer: [Aidan Pine](https://aidanpine.ca)

# What is needed to replicate the content in the post?

*Is the technology or tip you're describing reproducible? If so, what are the requirements? For example, is it available for any language, given 20 hours of audio data?*

You will need to follow the steps of [becoming an author]({{ "become-an-author" | absolute_url }}) and [writing a post]({{ "write-a-post" | absolute_url }}) before using this template.

# What are the motivations behind this project/technology/tip?

*Was this project funded? By whom? What were the explicit goals of the technology in question, or are they left unstated?*

[Mother Tongues](https://mothertongues.org) was created to release open-source software for language revitalization and includes tools for [dictionaries](https://docs.mothertongues.org) and [orthography converters](https://github.com/roedoejet/convertextract). Please read the [About section]({{ "about" | absolute_url }}) for more information.

# Main Post <-- replace title

*Here is where the main post should go - because this is just a template, there's nothing here!*

## How to add an image to your post

 1. Place your image in `assets/images/`. I recommend prefixing your image
  name with your post title, followed by two dashes. For example, the post title for this very
  post you are reading right now is `post-template`. I have an image
  called `ime-development.jpg`, so I'll copy it as
  `assets/images/post-template--ime-development.jpg`.

 2. Embed your picture using the `{{ "{% picture " }}%}` tag. In your post,
    where you want your image, embed it as follows:

```
{{ "{% picture " }}post-template--ime-development.jpg --alt An early draft storyboard of how to use the IME %}
```

It will produce the following image:

{% picture post-template--ime-development.jpg --alt An early draft storyboard of how to use the IME %}

The text after the `--alt` is the text that will show up if the image
doesn't load, or the text that screenreader users will hear when
listening to the blog post.
