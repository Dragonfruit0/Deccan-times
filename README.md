# The Deccan Times — website

A newspaper-style news website for **The Deccan Times** (Hyderabad), with an admin panel so the team can publish stories without touching code.

- **Site:** [Eleventy](https://www.11ty.dev/) static site. Every story becomes its own page with WhatsApp/Facebook preview tags.
- **Admin panel:** [Decap CMS](https://decapcms.org/) at `/admin`.
- **Hosting:** Netlify (free plan). The site rebuilds automatically each time a story is published.

## Pages

| Page | URL |
|---|---|
| Front page | `/` |
| Story | `/articles/<story-name>/` |
| Section | `/category/hyderabad/`, `/category/sports/`, … |
| About / Contact | `/about/`, `/contact/` (the contact form uses Netlify Forms) |
| Search | `/search/?q=...` |
| Admin | `/admin/` |

## Run it on your computer

```bash
npm install
npm start          # opens http://localhost:8080
npm run build      # outputs the finished site to _site/
```

## Go live on Netlify (one time)

1. Merge this branch into `main` on GitHub (the admin panel publishes to `main`).
2. In [Netlify](https://app.netlify.com/): **Add new site → Import an existing project → GitHub → dragonfruit0/deccan-times**. Netlify reads the build settings from `netlify.toml`.
3. Optional: under **Domain management**, rename the site or connect your own domain (e.g. `deccantimes.in`). Then update `url` in `src/_data/site.json` and `site_url` in `src/admin/config.yml`.

### Admin panel login (GitHub)

The admin panel logs editors in with GitHub:

1. On GitHub, go to **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - Homepage URL: your site URL
   - Authorization callback URL: `https://api.netlify.com/auth/done`
2. Copy the Client ID and generate a Client Secret.
3. In Netlify: **Site configuration → Access & security → OAuth → Install provider → GitHub**, then paste both values.
4. Add each editor as a collaborator on the GitHub repo (**Settings → Collaborators**). Every editor needs a free GitHub account.

Editors then open `https://<your-site>/admin/` and click **Login with GitHub**.

## Publishing a story (for editors)

1. Go to `/admin/` and log in.
2. Click **New Story**.
3. Fill in the headline, summary and section, upload a photo, and write the story.
4. Tick **Lead story** to put it big on the front page. Tick **Breaking news** to add it to the red ticker.
5. Click **Publish → Publish now**. The story appears on the site in about a minute.

## Change the basics

Edit `src/_data/site.json` to change:

- the Instagram and Facebook links (**update these first; they are placeholders**)
- the contact email, tagline, city, and the list of sections

If you add or rename a section, also update the `category` options in `src/admin/config.yml`.

## Sample stories

The stories in `src/articles/` are samples. Each one shows a "Sample story" label. Delete them from the admin panel once real news is published.

## Files

```
src/_data/site.json        site name, social links, sections
src/_includes/             page layouts (base, article) and partials
src/css/style.css          newspaper styling
src/js/main.js             mobile menu, search, share buttons
src/articles/*.md          news stories (written by the admin panel)
src/admin/                 Decap CMS admin panel
```
