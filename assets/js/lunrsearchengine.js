
var documents = [{
    "id": 0,
    "url": "https://blog.mothertongues.org/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "https://blog.mothertongues.org/about",
    "title": "",
    "body": "Welome to the Mother Tongues Blog. "
    }, {
    "id": 2,
    "url": "https://blog.mothertongues.org/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "https://blog.mothertongues.org/",
    "title": "Home",
    "body": "      Featured:                                                                                                                       Welcome                              :               Welcome to the Mother Tongues official blog!:                                                                                                                                                                       Aidan                                17 Mar 2020                                                                                                                            All Stories:                                                                                                             Why I made yet another Cree syllabics converter              :       The Western Cree languages—Plains Cree, Woods Cree, and Swampy Cree—are written using two systems: one with letters borrowed from the English alphabet, in a system known as the standard Roman. . . :                                                                               Eddie                                07 Aug 2020                                                                    Standard post template              :       This blog post describes what a basic template for a post on this blog should look like. Feel free to just copy past the headers into your post and replace. . . :                                                                               Aidan                                31 Jul 2020                                                                    Write a post              :       Here’s a short tutorial on how to write your first blog post on the official Mother Tongues Blog. This tutorial assumes you’ve already signed up to become an author. :                                                                               Aidan                                17 Mar 2020                                                                                                                                             Become an author              :       Do you have a tip you’d like to share? Have you pulled your hair out fixing a bug only to find out that the reason the bug exists is because. . . :                                                                               Aidan                                17 Mar 2020                                            "
    }, {
    "id": 4,
    "url": "https://blog.mothertongues.org/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 5,
    "url": "https://blog.mothertongues.org/why-a-new-cree-syllabics-converter/",
    "title": "Why I made yet another Cree syllabics converter",
    "body": "2020/08/07 - The Western Cree languages—Plains Cree, Woods Cree, and Swampy Cree—are written using two systems: one with letters borrowed from theEnglish alphabet, in a system known as the standard Roman orthography (SRO), and ᓀᐦᐃᔭᐏ ᒐᐦᑭᐯᐦᐃᑲᓇ (Cree syllabics). SRO is relatively easy to type on a modern computer, but syllabics are more difficult, because of the lack of a well-established syllabics input layout. It’s easier to just use a converter which, given Cree text in SRO, produces Cree text in syllabics. In this post, I describe my criticisms of the converters that existed prior to July 2018, and introduce syllabics. app—a syllabics converter that I developed in reaction to the former converters. What you need to know to understand this post: For the latter part of this blog post, where I discuss using theconverter in your own project, I assume you know how to use:  npm for installing JavaScript packages; or pip for installing Python packagesIf you don’t care about embedding my converter in your coding project,then there’s no prior technical knowledge needed! What are the freely available transliterators?: A quick Google search will net you at least the following SRO to syllabics transliterators.  The Maskwacîs Plains Cree Syllabic Converter1 The Algonquian Linguistic Atlas Cree Syllabics Converter Syllabics. net’s Plains Cree Syllabics ConverterHowever, none of these transliterators are perfect. The issues: Word final “hk”: In syllabics, a word that ends with an “hk”—or «ᐠ» in syllabics—aresupposed end with «ᕽ» instead. However, this replacement can never occur in the middle of a word. For example, the word “ê-wêpâpîhkêwêpinamâhk” (we (and not you) are setting it swinging), contains both a final “hk” and a “hk” cluster in the middle of the word. Its syllabic transcription is ᐁᐍᐹᐲᐦᑫᐍᐱᐊᒫᕽ. The Algonquian Linguistic Atlas’s converter and syllabics. net’s converter both handle the conversion of “hk” to «ᐠ», without erroneously converting the sequence in the middle of a word. Notably, the community of Maskwacîs does not follow this convention. Therefore, the Maskwacîs Converter produces ᐁ ᐁᐧᐸᐱᐦᑫᐁᐧᐱᓇᒪᐦᐠ, unlike what is expected in other Cree communities. Transliterating non-Cree words: Some transliterators attempt to convert every Latin character, even if it doesn’t make sense. Take the case of “Maskêkosihk Trail”—a road that goes from Edmonton to Enoch Cree Nation. The City of Edmonton unveiled the street sign, and, in the process, they unveiled an embarrassment:     “Maskêkosihk trail” erroneously converted as «ᒪᐢᑫᑯᓯᐦᐠ ᐟrᐊᐃl»   Image source: CBC   Not only does the syllabics transliteration of the sign contain the “hk”cluster as mentioned above,2 but it half-transliterates the English word “trail” into syllabics. The result is that “trail” is rendered as «ᐟrᐊᐃl», which contains Latin characters in the transliteration! In my opinion, an SRO to syllabics transliterator should refuse to transliterate words that do not have the structure of a Cree word. However, all three of the mentioned transliterators do attempt to transliterate “trail” with differing results:3       Maskwacîs Cree Dictionary   ᐟrᐊᐃl       Algonquian Linguistic Atlas   ᐟᕒᐊᐃᐪ       Syllabics. net   ᐟᕒᐊᐃᓬ   Long vowels: Long vowels (êîôâ) are distinct from short vowels (ioa) in Cree. Long vowels are written with a dot above in syllabics. The exception is for “ê” because it is always long; as a result, some writers also drop the diacritic when writing “e” in SRO as well. It’s important to differentiate between long and short vowels, because it makes distinctions between words. For example, nipiy/ᓂᐱᕀ means “water” while nîpiy/ᓃᐱᕀ means “leaf”. However, there is such a thing as “plain” script, where the vowel dots are omitted, and pointed script where the vowels have all dots. Another complication is that the “standard” Roman orthography in practice has multiple conventions for writing long vowels: using a macron (◌̄) and using a circumflex (◌̂). 4 How do the various converters handle long vowel diacritics? The Maskwacîs converter does not produce dots for long vowels at all, however it accepts both macrons and circumflexes as input. The Algonquian Lingustic Atlas’s converter not only produces dots, but supports input in either macrons or circumflexes. The syllabics. net converter does worst of all, handling only macrons for long vowels. It simply spits out characters written with circumflexes. Additionally, it does not handle “ê” without an diacritics, which all other converters do. Other odds and ends: Other issues for syllabics converters include how they deal with dashes, how they deal with combining diacritics, rather than pre-composed characters, and whether they produce the correct Unicode characters for the syllabics rather than very convincing look-alikes. There’s also the sandhi orthographic rule, but honestly, I’m not sure I fully comprehend how to apply this rule myself. Summary: Here’s a breakdown of the previous issues, and whether each transliterator can handle it correctly.           Word-final “hk”   Non-Cree words   Long vowels         Maskwacîs Cree Dictionary   *   ❌   ❌       Algonquian Linguistic Atlas   ✅   ❌   ✅       Syllabics. net   ✅   ❌   ❌   Where’s the source code?: The most pressing issue to me personally is that I cannot find source code for any of these converters! This means that if other people want to incorporate a converter into their own app without an active internet connection, they can’t. They have to either reverse-engineer the converters online, or write their own code to do the conversion. cree-sro-syllabics: an open-source Python and JavaScript library for syllabics conversion: My solution was to create a code library that is free and open source. It is available both for Python and JavaScript, and you can try it out right now! It handles all the issues previously mentioned. Try it with the following test cases:  Maskekosihk trail êwêpâpîhkêwêpinamahk ēwēpâpīhkēwēpinamahk ewepapihkewepinamahkThe source code for cree-sro-syllabics can be found on their respective GitHub repositories:  cree-sro-syllabics for Python cree-sro-syllabics for JavaScriptBut it can also be seamlessly incorporated into a Python project that uses pip by installing it with: 1pip install cree-sro-syllabicsOr, you can use npm to install cree-sro-syllabics in your JavaScript project: 1npm install cree-sro-syllabics --saveOr you can copy-paste the . js file to your project. Use cases: Most folks will just use syllabics. app to convert a few words orsentences of Cree. However, software developers can embed the converter in clever ways in their application. For example, I’ve used the converter in itwêwina — the Plains Cree dictionary. Although the underlying dictionary content is written entirely in SRO, we can present all Cree text in syllabics. In addition, we support searches in syllabics by using cree-sro-syllabics to convert the search string to SRO first, then search our dictionary content. How can you use cree-sro-syllabics?  Note: This blog post has been adapted from a post on Eddie’s blog.       This is the same converter bundled in the Cree Dictionary app.  &#8617;        This may not be a mistake; they could be using Maskwacîs’s conventions, but I’m really not sure.  &#8617;        I strongly suspect the sign designer used the Maskwacîs transliterator to get this result.  &#8617;        Anecdotally, I find that most writers near Edmonton and Maskwacîs prefer circumflexes to macrons; however noted Algonquian linguist Arok Wolvengrey prefers macrons. Heck, Jean Okimāsis writes her surname with a macron! &#8617;    "
    }, {
    "id": 6,
    "url": "https://blog.mothertongues.org/g2p/",
    "title": "Getting from 'a' to 'b' with the 'g2p'",
    "body": "2020/08/07 - This blog post describes the background context for a software tool called ‘g2p’ which is shorthand for ‘Grapheme-to-Phoneme’, but if you don’t know those terms, don’t worry, this post will explain it. Essentially, it is a tool for converting between two types of text, whether you want to convert between a writing system and the phonetic alphabet, between two writing systems for the same language, or between a legacy ‘font-hacked’ writing system and its current Unicode-supported version. What you need to know to understand this post To understand the advanced section, you will need to know some pythonWho is involved with this project? Maintainer (i. e. the person to bug with questions): Aidan Pine Lots of other contributorsWhat are the motivations behind this project/technology/tip?There are many reasons why you might want to systematically convert between different ‘letters’ referred to in computer science typically as ‘characters’. Here are a few use cases: Use Case #1: Getting the pronunciation from a word’s spelling: Sometimes you want to convert between a language’s writing system (also known as orthography) and its pronunciation. “Letters” in a writing system are usually referred to as “graphemes” and their corresponding meaningful sounds are referred to as “phonemes”; hence “g2p” or “grapheme-to-phoneme”. It gets a little more complicated than that though, because sometimes a grapheme is made of more than one character, as in “th” which can be pronounced unvoiced. ) as in ‘thin’ or voiced as in ‘that’. The International Phonetic Alphabet is not so ambiguous, and writes the ‘th’ in ‘thin’ as θ and the ‘th’ in ‘that’ as ð. Knowing how to convert between the written and spoken form of a language is useful in a variety of computational tasks, but I will describe the usefulness specifically with a project called “ReadAlongs” below Use Case #2: A language with multiple writing systems: Some languages have two (or more!) different writing systems. Take Cree for example, where you can either write a word in Standard Roman Orthography like “ê-wêpâpîhkêwêpinamâhk” or in Syllabics like ᐁᐍᐹᐲᐦᑫᐍᐱᐊᒫᕽ. My colleague Eddie has a great blog post about a tool he created to convert between the two here. Use Case #3: Converting from legacy writing systems: Some languages historically used ‘font hacks’ to render the characters in their writing system before they were supported standardly on computers. There’s a longer discussion to be had here, but the coles’ notes version is that when computers were gaining popularity, they weren’t typically able to render (ie display) characters outside of the 128 characters supported by the American Standard Code for Information Interchange (ASCII). To get around this, language communities would come up with their own custom fonts (often referred to as ‘font hacks’ or ‘font encodings’) where they would render things characters like ‘©’ which existed in ASCII as ‘ǧ’ instead (example taken from the Heiltsuk Doulos font). For more information on this topic, please check out ‘Seeing the Heiltsuk Orthography from Font Encoding through to Unicode’ or ‘Applications and innovations in typeface design for North American Indigenous languages’. How to get from ‘a’ to ‘b’ (or ‘a’ to ‘æ’) with g2p…more to come… "
    }, {
    "id": 7,
    "url": "https://blog.mothertongues.org/post-template/",
    "title": "Standard post template",
    "body": "2020/07/31 - This blog post describes what a basic template for a post on this blog should look like. Feel free to just copy past the headers into your post and replace the text! The instructions for each section are italicized, and the answers for this specific blog post are following the italicized text. TL;DRWe recommend having a section at the top that gives an extremely short summary of the post (ideally 2 or 3 sentences). This should be high-level, and shouldn’t assume any technical knowledge. This is a template of a blog post to follow when writing other blog posts - how meta! What you need to know to understand this postYour post should have a list of technical skills that you think are needed to understand the blog post. This will help the reader know if they’ll be able to benefit from reading it or whether they should study up on something first.  Knowledge of writing markdownWho is involved with this project?Beyond the author’s information which will be part of this post, there should be a list of everybody involved with the technology discussed in the post, if applicable. The list of contacts should be clear  Author/Blog Maintainer: Aidan PineWhat is needed to replicate the content in the post?Is the technology or tip you’re describing reproducible? If so, what are the requirements? For example, is it available for any language, given 20 hours of audio data? You will need to follow the steps of becoming an author and writing a post before using this template. What are the motivations behind this project/technology/tip?Was this project funded? By whom? What were the explicit goals of the technology in question, or are they left unstated? Mother Tongues was created to release open-source software for language revitalization and includes tools for dictionaries and [orthography converters][https://github. com/roedoejet/convertextract]. Please read the About section for more information. Main Post &lt;– replace titleHere is where the main post should go - because this is just a template, there’s nothing here! How to add an image to your post:    Place your image in assets/images/. I recommend prefixing your image name with your post title, followed by two dashes. For example, the post title for this very post you are reading right now is post-template. I have an image called ime-development. jpg, so I’ll copy it as assets/images/post-template--ime-development. jpg.     Embed your picture using the {% picture %} tag. In your post,where you want your image, embed it as follows:  1{% picture post-template--ime-development. jpg --alt An early draft storyboard of how to use the IME %}It will produce the following image: The text after the --alt is the text that will show up if the imagedoesn’t load, or the text that screenreader users will hear whenlistening to the blog post. "
    }, {
    "id": 8,
    "url": "https://blog.mothertongues.org/write-a-post/",
    "title": "Write a post",
    "body": "2020/03/17 - Here’s a short tutorial on how to write your first blog post on the official Mother Tongues Blog. This tutorial assumes you’ve already signed up to become an author. Posts on the Mother Tongues Blog are written in Markdown. In order to write a new post, follow the following steps.  In your fork of the Mother Tongues Blog Respository, make sure you’re in the dev. author branch and add a new post to the _posts folder. Your post file name must by slugified. It must start with the date (yyyy-mm-dd) and then the blog post name, 2020-01-15-this-is-a-sample. md.  Add some meta data about the post at the top:  1234567891011---layout: posttitle:  Become an author author: aidancategories: [ Tutorial, Blog ]tags: [ intermediate ]image: assets/images/01. jpgdescription:  Write your own articles for the Mother Tongues Blog featured: falsehidden: false---    Write the content of your post in Markdown. Please have a look at the template for writing accessible posts! When you’re happy with it, Submit a pull requestThanks for contributing! "
    }, {
    "id": 9,
    "url": "https://blog.mothertongues.org/welcome/",
    "title": "Welcome",
    "body": "2020/03/17 - Welcome to the Mother Tongues official blog! Mother Tongues is an organization that releases free and open source tools for language revitalization. Here you’ll find blog posts, tips, tricks and tutorials for developing language technology with a focus on Indigenous languages. Be sure to sign up to our mailing list to keep track of new blog posts and any events. If you’re interested in becoming an author, and you have a GitHub account, please checkout how to become an author and after you’ve signed up, learn how to write a post. "
    }, {
    "id": 10,
    "url": "https://blog.mothertongues.org/become-an-author/",
    "title": "Become an author",
    "body": "2020/03/17 - Do you have a tip you’d like to share? Have you pulled your hair out fixing a bug only to find out that the reason the bug exists is because many mainstream platforms don’t consider less-resourced languages? The Mother Tongues blog is the place to share your tips, tricks, and tutorials for all things related to technology for less-resourced languages. To become an author, you’ll need a GitHub account1. Then, follow these steps:  Fork the Mother Tongues Blog Respository Checkout to the dev. author branch Edit the file labelled _config. yml. * denotes a required value.   1234567891011121314151617authors: AidanPine:  name: Aidan  display_name: Aidan  gravatar: 7623fd3eeb0acbe1084fecc20c3093ae   email: hello@aidanpine. ca  web: https://aidanpine. ca  twitter: https://twitter. com/aidanpine  description:  Lead developer of Mother Tongues.   yourname*:       # This should be your twitter handle   name: YourName*   display_name: YourName*   email: your@email. com*   gravatar: YourGravatarID # this is an md5 hash of your email that you used to sign up for https://en. gravatar. com/ you can either calculate this on the command line, or use an online generator like https://www. md5hashgenerator. com/   web: yoursite. com   twitter: https://twitter. com/yourhandle   description:  Guest Author. YourDescriptionHere     Submit a pull requestThat’s it! Start writing your posts.   Footnotes: 1: Any suggestions for good GitHub tutorials? Leave them in the comments below! "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});