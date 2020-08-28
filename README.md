# Mother Tongues Blog

Welcome to the Mother Tongues Blog repository.

## Guide

To contribute to the site, please have a read through the purpose of the Git branches:

- review (default): Create and continue to work on new posts here. You can spin off extra branches if you want, but you must merge them into `review` before merging to `publish` and pushing a new release.
- publish: Changes made here will build and push to `gh-pages`.
- gh-pages: This branch is auto generated from the `publish` branch. Do **not** edit this directly, as edits will be overwritten.

## Local devlopment

You must have ruby on your machine and bundler.

Then, clone the repo:

`git clone https://github.com/roedoejet/mothertongues-blog.git`

Install all the things:

`cd mothertongues-blog && bundle install`

Then start the server:

`bundle exec jekyll serve`

If you want to test out the `/admin` panel, you *must* go to `admin/config.yml` and comment out the three lines under `backend` and un-comment the three lines that are commented. So, your config.yml in local development should look like this:

```yaml
backend:
  local_backend: true
  name: proxy
  proxy_url: http://localhost:8082/api/v1
  # name: github
  # repo: MotherTongues/mothertongues-blog
  # branch: review # Branch to update (optional; defaults to master)
```

Don't forget to change this back before you push to the site.

Then, run the proxy server for Netlify CMS:

`cd ~/mothertongues-blog && npx netlify-cms-proxy-server`

Then, you can start the blog server `bundle exec jekyll serve` and edit posts in the CMS!

### Copyright

Copyright Blog (C) 2020 Aidan, https://aidanpine.ca

Copyright Theme (C) 2019 Sal, https://www.wowthemes.net

Posts are copyrighted by authors!

### Contribute

1. [Fork the repo](https://github.com/roedoejet/mothertongues-blog).
2. Clone a copy of your fork on your local
3. Create a branch off of master and give it a meaningful name (e.g. my-new-mediumish-feature).
4. Make necessary changes, commit, push and open a pull request on GitHub.

### Acknowledgements

This blog was created from a fork of the fantastic [WowThemes Mediumish theme](https://wowthemesnet.github.io/mediumish-theme-jekyll/)

Thank you!
