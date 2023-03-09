---
layout: post
title: "Language revitalization with Mozilla's Common Voice"
author: nigel
categories: [ Blog ]
tags: [explanation, common-voice]
image: assets/images/common-voice--site.jpg
description: "Supporting Indigenous language revitalization with technology"
featured: false
hidden: false
---

# TL;DR

The National Research Council and Ursa Creative have adapted Mozilla’s CommonVoice tool to help streamline recording and data management for Indigenous language revitalization.

# What you need to know to understand this post

- If you’re not familiar with [Mozilla's Common Voice](https://commonvoice.mozilla.org), check it out!

# Who is involved with this project?

- Nigel Decontie - Developer at [Ursa Creative](https://ursacreative.ca)
- Aidan Pine - Technical Director for NRC Speech Generation for Indigenous Language Education project

# What are the motivations behind this project?

Indigenous language revitalization is a movement that seeks to promote the use of the languages spoken by Indigenous peoples around the world. Many Indigenous languages are endangered, due to over a century of colonial policies against their use. The loss of these languages not only erases cultural and linguistic diversity but also undermines the cultural identity and well-being of Indigenous communities. Revitalization efforts can involve a range of strategies, including language immersion programs, community-based language learning initiatives, and the development of language documentation and preservation projects. Indigenous language revitalization is critical for the preservation of cultural heritage, and is an important step towards building a more inclusive and equitable society.

# Language revitalization with Mozilla's Common Voice

In an effort to support Indigenous language revitalization efforts, the National Research Council has developed their own custom version of an open-source language collection tool. They brought us on board to build a reproducible deployment process and assist in hosting the application. With this process in place, there is an opportunity for other organizations to have their own instances of the application created.

## About the NRC's custom Common Voice

Common Voice is an open-source project that aims to create a freely available database of human voices that can be used to train machine learning models for speech technology. The project is designed to help increase the diversity of voices available for these models, particularly for underrepresented languages and accents - something that could be vital in supporting Indigenous languages, who see fewer and fewer native speakers each year. Common Voice invites individuals to record and donate their voices to the project's database, allowing for a diverse range of voices to be collected. The project also includes tools for verifying and validating voice contributions, ensuring the accuracy and quality of the dataset. Common Voice is intended to be a collaborative effort, with individuals and organizations contributing their time and resources to help improve the accuracy and inclusivity of speech recognition technology.

The National Research Council (NRC) is currently involved in a [three-year research project](https://nrc.canada.ca/en/research-development/research-collaboration/programs/speech-generation-indigenous-language-education) on speech synthesis (text-to-speech) technology and have modified Mozilla’s Common Voice to suit the needs of the recording workflow of the project. Namely, by creating a separate instance of Common Voice, communities involved in the project are able to determine their own data management policy instead of adopting Mozilla’s policy to make all voices freely available. In addition, this ‘fork’ – or adaptation - of Common Voice also allows users to configure recording quality settings like encoding format and sampling rate.

## Who is Ursa Creative?

{% picture common-voice--ursa-logo.png --alt Ursa Creative logo %}

Ursa Creative is an Indigenous technology company based on the traditional territories of the WSÁNEĆ and Lək̓ʷəŋən-speaking Songhees, Esquimalt peoples. We began making simple websites to help Indigenous organizations in community build their online presence. There was so much interest that it quickly became a full-time job, and we expanded our team to create new systems, websites, and consulting services. We are now fortunate enough to work with both Indigenous and non-Indigenous organizations across Canada.

For NRC's Common Voice, we were brought on board to assist with the hosting and deployment of the project. One of the goals for this project was to create a streamlined deployment process to allow anyone to request their own instance of the software.

## How to get set up with your own instance

If you have any questions or are interested in having your own instance set up, you can find us at [ursacreative.ca](https://ursacreative.ca) or reach out directly to [contact@ursacreative.ca](mailto:contact@ursacreative.ca). We would love to hear from you!