# The Deccan Times — website

A newspaper-style news website for **The Deccan Times** (Hyderabad), with an admin panel so the team can publish stories without touching code.

- **Site:** [Eleventy](https://www.11ty.dev/) static site. Every story becomes its own page with WhatsApp/Facebook preview tags.
- **Admin panel:** [Decap CMS](https://decapcms.org/) at `/admin`.
- **Hosting:** [Vercel](https://vercel.com/). The site rebuilds automatically each time a story is published.
- **Editor logins:** [DecapBridge](https://decapbridge.com/) (email + password, no GitHub account needed).
- **Contact form:** [Web3Forms](https://web3forms.com/) (messages are emailed to you).

## Pages

| Page | URL |
|---|---|
| Front page | `/` |
| Story | `/articles/<story-name>/` |
| Section | `/category/hyderabad/`, `/category/sports/`, … |
| About / Contact | `/about/`, `/contact/` (contact form via Web3Forms) |
| Search | `/search/?q=...` |
| Admin | `/admin/` |

## Run it on your computer

```bash
npm install
npm start          # opens http://localhost:8080
npm run build      # outputs the finished site to _site/
```

## Go live on Vercel (one time)

1. Merge this branch into `main` on GitHub. The admin panel saves stories to `main`, and Vercel publishes `main`.
2. On [vercel.com](https://vercel.com/), sign in with GitHub, then **Add New → Project → Import `dragonfruit0/deccan-times`**.
3. Leave the settings as they are (they come from `vercel.json`) and click **Deploy**. Your site will be live at something like `https://deccan-times.vercel.app`.
4. If the address Vercel gives you is different, update `url` in `src/_data/site.json`, and `site_url` and `display_url` in `src/admin/config.yml`.
5. Optional custom domain (e.g. `deccantimes.in`): **Vercel → Project → Settings → Domains**. Update the same `url` values afterwards.

> **Vercel plan:** the free Hobby plan is for personal, non-commercial sites. If Deccan Times earns money from the website (ads, sponsored posts), Vercel's terms require the Pro plan.

### Admin panel login (email + password via DecapBridge)

1. Go to [decapbridge.com](https://decapbridge.com/) and sign up.
2. **Add a site:** choose the `dragonfruit0/deccan-times` repo, and enter your Vercel address followed by `/admin/` as the CMS URL.
3. Install the DecapBridge GitHub app on that repo when asked. This lets it save stories on your editors' behalf.
4. DecapBridge shows a config snippet with your **site ID**. In `src/admin/config.yml`, replace both `YOUR-DECAPBRIDGE-SITE-ID` placeholders with that ID, then commit.
5. In DecapBridge, **invite each editor by email**. They get a link, set a password, and then log in at `https://<your-site>/admin/`.

Remove editors from the DecapBridge dashboard. Each story's GitHub commit records which editor published it.

### Contact form (Web3Forms)

1. Go to [web3forms.com](https://web3forms.com/), enter the email address that should receive messages, and copy the **access key** they send you.
2. Paste it into `web3formsKey` in `src/_data/site.json` and commit.

Until a key is added, the Contact page shows your email address and Instagram link instead of the form.

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
- **Editor logins:** DecapBridge (passwords are stored by DecapBridge, not in the repo)
- **Contact form messages:** emailed to you by Web3Forms (nothing is stored on the site)

Publishing a story saves a file to GitHub. Vercel sees the change, rebuilds the site and puts it online. Every change is kept in GitHub's history, so a deleted or edited story can always be recovered.

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
