---
layout: post
title: "Tutorial: Choosing the right fonts to show syllabics on your website"
author: _eddieantonio
categories: [ Tutorial ]
tags: [ intermediate, syllabics, Cree, fonts, html, css ]
image: assets/images/tutorial-syllabics-fonts--hero.png
description: "Use these HTML/CSS snippets to choose the right fonts to display syllabics reliably for visitors to your website"
featured: false
---

<abbr title="too long; didn't read">**tl;dr**</abbr>: Use this
`font-family` CSS declaration to successfully display syllabics for most
visitors to your website:

```css
font-family: Gadugi, Euphemia, 'Euphemia UCAS', 'Aboriginal Sans', 'Noto Sans Canadian Aboriginal', sans-serif;
```

Include the following line to your website's `<head>` to automatically download
a syllabics font if there are no appropriate fonts are installed on your
smartphone/computer/device:

```html
<link rel="stylesheet" href="//fonts.googleapis.com/earlyaccess/notosanscanadianaboriginal.css">
```

Read the rest of this article to learn more about syllabics fonts on the
web and advanced techniques for inclusion!

## What you need to know to understand this post

You will need to know how to:

 * how to edit your website's <abbr title="Cascading Stylesheets">CSS</abbr>
 * how to add a `<link>` element to your HTML's `<head>`

If you've ever added a custom font from [Google Fonts][] to your
website, you know enough to follow this post!

It's also helpful to know the [difference between serif and sans-serif
fonts][serif-vs-sans-serif].

[Google Fonts]: https://fonts.google.com/
[serif-vs-sans-serif]: https://about.easil.com/support/serif-vs-sans-serif/

## Let's get started!

Have you ever wanted to display **syllabics** on your website, but
when you tried, all you got was [tofu]:

> □□□ □□□□□□! □□□□□□□□□□ □□□□□ «□ □□□□□□□□□»□

[tofu]: https://english.stackexchange.com/a/331483

Tofu no longer! Let's discuss the various syllabics fonts that exist out
there, where they are commonly found, and let's create a **font stack**:
a list of fonts that your web browser tries in order such that it finds
a font that displays syllabics correctly.

## Common syllabics fonts

I am aware of the following fonts:

 - **Aboriginal Sans** and **Aboriginal Serif**
 - **Euphemia**
 - **Gadugi**
 - **Noto Sans Canadian Aboriginal**

I made an **interactive demonstration** of these fonts that you can play
with. Go ahead and type any text in (western) Cree into the box and it
will be converted to syllabics and displayed in the appropriate font, if
it's available on your system:

<p class="codepen" data-height="500" data-theme-id="light" data-default-tab="result" data-user="eddieantonio" data-slug-hash="GRZOBYY" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Syllabics font playground">
  <span>See the Pen <a href="https://codepen.io/eddieantonio/pen/GRZOBYY">
  Syllabics font playground</a> by Eddie Antonio Santos (<a href="https://codepen.io/eddieantonio">@eddieantonio</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

---

But **where** do these fonts come from? Where should you **expect these fonts to be
available**?


### Aboriginal Sans and Aboriginal Serif

As the names suggest, they have both serif and sans-serif variants for
writing in Latin script (e.g., English, French, etc.).

#### Who created these fonts?

These fonts were created by the Language Geek himself, [Chris Harvey][].

#### Where can I find these fonts?

As far as I know, no system has Aboriginal Sans or Aboriginal Serif
pre-installed, so you have to [download them yourself from his
website][languagegeek-fonts]. Sometimes, they are bundled with certain
[Keyman][] keyboard layouts.

If you've tried getting syllabics to work on your computer, chances are,
you've downloaded either of these fonts!

[Languagegeek.com][languagegeek-fonts] has many other fonts that
display syllabics.

[Chris Harvey]: http://www.languagegeek.com/
[languagegeek-fonts]: http://www.languagegeek.com/font/fontdownload.html
[Keyman]: https://keyman.com/


### Gadugi

This is a modern font that displays both syllabics and Cherokee.
“Gadugi” is a Cherokee word that means “[cooperative
labour][gadugi-def]”.

#### Who created this font?

I believe Microsoft commissioned this font.

#### Where can I find this font?

Gadugi has been included in [**all versions of Windows since Windows
8**][gadugi-availability]. [It's also available as a “Cloud
font”][gadugi-office] on Microsoft Office products.

[gadugi-def]: https://archive.org/details/cherokeeenglishd0000feel/page/92/mode/2up?q=gadugi
[gadugi-availability]: https://docs.microsoft.com/en-us/typography/font-list/gadugi#products-that-supply-this-font
[gadugi-office]: https://support.microsoft.com/en-us/office/cloud-fonts-in-office-f7b009fe-037f-45ed-a556-b5fe6ede6adb?ui=en-us&rs=en-us&ad=us#text:~:text=gadugi.ttf


### Euphemia

**Euphemia** or **Euphemia UCAS**[^1] is a sleek font for syllabics. It also
includes glyphs for Latin (e.g., English/French) characters.

[^1]: UCAS, or "Unified Canadian Aboriginal Syllabics", the name of [the Unicode block](https://unicode.org/charts/PDF/U1400.pdf) that this font covers.

#### Who created this font?

[Tiro Typeworks created Euphemia][tiro].

[tiro]: https://www.tiro.com/syllabics/resources/index.html

#### Where can I find this font?

Euphemia is distributed on [**Windows Vista and newer**][euphemia-ms].
It is currently distributed as **Euphemia UCAS** on Apple systems
(**macOS**/**iOS**).

[euphemia-ms]: https://docs.microsoft.com/en-us/typography/font-list/euphemia#products-that-supply-this-font


### Noto Sans Canadian Aboriginal

Noto is Google's project to [eliminate tofu (□) for all languages of the
world][noto], hence _noto_ (“**no** more **to**fu”).

As far as I'm aware, Google does not have a "Noto Serif Canadian
Aboriginal".

#### Who created this font?

As mentioned, [Google created Noto Sans][noto-embed]!

#### Where can I find this font?

Noto Sans Canadian Aboriginal can be found on Google products, such as
**Android phones**, **Android tablets**, and **Chromebooks**.

Importantly, Google allows website authors to **[embed Noto on your
website][noto-embed]**, just as you can embed other fonts via their [Google Fonts][]
service.

[noto]: https://www.google.com/get/noto/
[noto-embed]: https://fonts.google.com/earlyaccess#Noto+Sans+Canadian+Aboriginal

## How to get the right fonts to appear on your webpage

Now that we know about what fonts are out there, lets construct
a `font-family` declaration that will support syllabics on as many
devices as possible.

Recall that the `font-family` declaration is a list of fonts that the
web browser **will try in order**. The first font in the list that is
installed will be used.

Let's start with the **fallbacks** first. Let's say our users' device
does not have a font that supports syllabics installed on their
computer. Since Google allows **Noto Sans Canadian Aboriginal** to be
automatically downloaded on your website when needed, let's start with
this `font-family` declaration:

```css
body {
  font-family: 'Noto Sans Canadian Aboriginal', sans-serif;
}
```

To get your browser to download the appropriate fonts, add this to your
website's `<head>`:

```html
<link rel="stylesheet" href="//fonts.googleapis.com/earlyaccess/notosanscanadianaboriginal.css">
```

### Add support for Aboriginal Sans

Perhaps your reader has installed **Aboriginal Sans** to their computer.
Update your `font-family` declaration as follows:

```css
body {
  font-family: 'Aboriginal Sans', 'Noto Sans Canadian Aboriginal', sans-serif;
}
```

This way, the web browser will try using Aboriginal Sans if it's
installed, and _then_ attempt to download Noto Sans.

### Add support for Mac/iPhone/iPad users

Now let's support users of Apple devices. Prepend **Euphemia UCAS** to
the `font-family` declaration:

```css
body {
  font-family: 'Euphemia UCAS', 'Aboriginal Sans', 'Noto Sans Canadian Aboriginal', sans-serif;
}
```

### Add support for Windows Users

Recall that earlier versions of Windows include **Euphemia**; later
versions support **Gadugi**. Prepend the following rules to try using
Gadugi first.

```css
body {
  font-family: Gadugi, Euphemia, 'Euphemia UCAS', 'Aboriginal Sans', 'Noto Sans Canadian Aboriginal', sans-serif;
}
```


### Finally, specify your Latin fonts

If you're displaying Latin text (e.g., English, French, Cree SRO, etc.),
then this font goes **first**. Recall that many of the syllabics fonts
contain glyphs for Latin characters, so we will have to list
our preferred Latin font **first**.

For this example, say I want to use **Open Sans** (which you can
download from [Google Fonts][]). Prepend **Open Sans** to the front of
the list:

```css
body {
  font-family: 'Open Sans', Gadugi, Euphemia, 'Euphemia UCAS', 'Aboriginal Sans', 'Noto Sans Canadian Aboriginal', sans-serif;
}
```


You're done! You're ready to display syllabics on the web!

## Finished!

With these declarations, you should be able to display syllabics on your
website, and be reasonably confident that everybody can read it.

Here's a complete example that uses our syllabics font stack in
addition to a few fonts from Google Fonts to round things out:

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="css,result" data-user="eddieantonio" data-slug-hash="mdPqoxK" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Syllabics font stack complete example">
  <span>See the Pen <a href="https://codepen.io/eddieantonio/pen/mdPqoxK">
  Syllabics font stack complete example</a> by Eddie Antonio Santos (<a href="https://codepen.io/eddieantonio">@eddieantonio</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
