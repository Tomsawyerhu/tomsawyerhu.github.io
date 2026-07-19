# Haichuan Hu - Academic Homepage

Personal academic website built with [al-folio](https://github.com/alshedivat/al-folio) v0.16.3. The content is based on `Haichuan_Hu_Academic_CV.pdf`.

## Local preview

The most reproducible option is Docker:

```bash
docker compose up
```

Then open <http://localhost:8080/>.

Alternatively, with Ruby 3.3 and Bundler installed:

```bash
bundle install
bundle exec jekyll serve
```

## Main content files

- `_pages/about.md` - homepage biography and research interests
- `_bibliography/papers.bib` - publications and source links
- `_data/cv.yml` - structured CV shown on the website
- `_data/socials.yml` - email, GitHub, Google Scholar, and CV links
- `_config.yml` - identity, deployment URL, and site-wide settings

## Deployment

The included GitHub Actions workflow builds and deploys the site to GitHub Pages at:

<https://tomsawyerhu.github.io>
