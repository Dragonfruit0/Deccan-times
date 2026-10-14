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

### Admin panel login (email + password)

Editors log in with an email address and password. They do **not** need GitHub accounts. This uses Netlify Identity and Git Gateway.

1. In Netlify, open your site and go to **Project configuration → Identity**, then click **Enable Identity**.
2. Under **Registration**, choose **Invite only**, so strangers can't sign up.
3. Under **Services → Git Gateway**, click **Enable Git Gateway**. This lets the admin panel save stories to GitHub on the editors' behalf.
4. Go to the **Identity** tab and click **Invite users**, then enter each editor's email.
5. Each editor gets an email, clicks the link, and sets a password. After that they log in at `https://<your-site>/admin/`.

Removing an editor: **Identity** tab → click the user → **Delete user**.
Forgotten password: on the login box, click **Forgot password?**.

> Note: Netlify says Git Gateway still works but won't get new features. If it is ever switched off, the admin panel can move to another login service (e.g. DecapBridge) by changing the `backend` section of `src/admin/config.yml`; the site and stories stay the same.

## Publishing a story (for editors)

1. Go to `/admin/` and log in with your email and password.
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

## Where things are stored (no database)

The site has no database. Everything is kept as files in this GitHub repository:

- **Stories:** one text (Markdown) file each in `src/articles/`
- **Photos uploaded in the admin:** `src/images/uploads/`
- **Editor logins:** Netlify Identity (passwords are stored by Netlify, not in the repo)
- **Contact form messages:** Netlify Forms (**Netlify → Forms**, with email notifications available)

Publishing a story saves a file to GitHub. Netlify sees the change, rebuilds the site and puts it online. Every change is kept in GitHub's history, so a deleted or edited story can always be recovered.

**Tips:** keep photos under about 500 KB (resize to ~1600px wide before uploading). GitHub repositories work best below about 1 GB in total, which is roughly 2,000–3,000 news photos at that size.

## Files

```
src/_data/site.json        site name, social links, sections
src/_includes/             page layouts (base, article) and partials
src/css/style.css          newspaper styling
src/js/main.js             mobile menu, search, share buttons
src/articles/*.md          news stories (written by the admin panel)
src/admin/                 Decap CMS admin panel
```
