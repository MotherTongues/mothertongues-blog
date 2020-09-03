---
layout: post
title: "Tutorial: Choosing the right fonts to show syllabics on your website"
author: _eddieantonio
categories: [ tutorial ]
tags: [ intermediate ]
image: false
description: "Use these HTML/CSS snippets to choose the right fonts to display syllabics reliably for visitors to your website"
featured: false
---

<abbr title="too long; didn't read">**tl;dr**</abbr>: Use this
`font-family` CSS declaration to successfully display syllabics for most
visitors to your website:

```css
font-family: Gadugi, Euphemia, 'Euphemia UCAS', 'Noto Sans Canadian Aboriginal', sans-serif;
```

Add the following include in your `<head>` to automatically download
a syllabics font, if there are no appropriate fonts installed on your
phone/computer/device:

```html
<link href="//fonts.googleapis.com/earlyaccess/notosanscanadianaboriginal.css" rel="stylesheet">
```

Read the rest of this article to learn more about syllabics fonts on the
web and advanced techniques for inclusion.

## What you need to know to understand this post

You will need to know how to:

 * how to edit your website's <abbr title="Cascading Stylesheets">CSS</abbr>
 * how to add a `<link>` element to your HTML's `<head>`

If you've ever added a custom font from [Google Fonts][] to your
website, you know enough to follow this post!

[Google Fonts]: https://fonts.google.com/

## Tutorial

Have you ever wanted to display **syllabics** on your website, but
when you tried, all you got was [tofu]:

<output style="font-family: Merriweather">
□□□ □□□□□□! □□□□□□□□□□ □□□□□ «□ □□□□□□□□□»□
</output>

[tofu]: https://english.stackexchange.com/a/331483

<!-- TODO: write the rest of the article! -->
