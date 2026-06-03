# Florent Tariolle Academic Pages Site

This is a concise Academic Pages / Jekyll personal academic website for Florent Tariolle.

## Local preview

Install Ruby and Bundler, then run:

```bash
bundle install
bundle exec jekyll serve
```

The site is configured for GitHub Pages at:

```text
https://tariolle.github.io
```

## Content

- `_pages/about.md`: home page and short bio.
- `_pages/publications.html`: publication listing.
- `_pages/projects.md`: selected research and open-source projects.
- `_pages/cv.md`: concise CV page with a link to the latest PDF built by `Tariolle/curriculum-vitae`.
- `_publications/`: structured Academic Pages publication entries.

## CV PDF update flow

The website intentionally does not store a local copy of the CV PDF. The CV page links to:

```text
https://github.com/Tariolle/curriculum-vitae/raw/master/main.pdf
```

The `Tariolle/curriculum-vitae` repository should build and commit `main.pdf` on every push to `master`, so updates to `main.tex` are reflected on the website without rebuilding this site.
