# Urban Arts website — editing and maintenance guide

This is the source for the new Urban Arts static website. It is intentionally small: project information and page text live in one file, photographs live in one folder, and a build command creates the finished website.

## The three rules to remember

1. **Do not edit anything inside `dist/`.** It is generated automatically and is erased every time the site is rebuilt.
2. Edit project information and page wording in **`build.mjs`**.
3. Add the web-ready versions of photographs to **`public/images/`**, then rebuild and inspect the site before publishing.

## Where everything is

| Location | What it contains | Edit when… |
| --- | --- | --- |
| `build.mjs` | Projects, page text, menus, footer and page generation | Changing words, adding/removing/reordering projects or photographs |
| `public/images/` | Full-size and small WebP photographs | Adding or replacing website imagery |
| `src/style.css` | Colours, fonts, spacing and layouts | Changing the visual design |
| `src/site.js` | Mobile menu and external-link behaviour | Changing site behaviour |
| `public/urban-arts-logo.png` | Urban Arts logo | Replacing the logo |
| `scripts/process_images.py` | Converts listed original images into website images | Preparing or reprocessing photographs |
| `dist/` | Finished website produced by the build | Never edit manually |

## Preview the website locally

Open Terminal and run:

```sh
cd "/Users/data/Pictures/Portfolio/urbanarts-launch"
./scripts/site.sh build
./scripts/site.sh serve
```

Then visit <http://127.0.0.1:4173/>.

Leave the Terminal window running while reviewing the site. Press `Control-C` in that window to stop the preview server.

After every edit to `build.mjs`, `src/style.css` or `src/site.js`, run:

```sh
./scripts/site.sh build
```

These commands do not require `npm`. The helper uses an ordinary Node.js installation when one is available, or the Node.js copy bundled with Codex on this Mac.

Reload the browser. If an older stylesheet appears, use a hard refresh or increment `assetVersion` near the top of `build.mjs`, for example from `20260929-21` to `20260929-22`.

## Edit an existing project

Open `build.mjs` in a text editor and search for the project title, such as:

```js
title: "Kompally Residence",
```

A project is stored as an object like this:

```js
{
  slug: "example-residence",
  title: "Example Residence",
  eyebrow: "Residence · Interiors · Hyderabad",
  status: "Completed",
  role: "Design + build",
  scope: "Architecture · Interiors · Turnkey implementation",
  intro: "A short introduction shown at the top of the project page.",
  note: "The longer project note shown below the lead photograph.",
  images: ["example-01", "example-02", "example-03"],
  alt: [
    "Exterior of Example Residence",
    "Living room with timber cabinetry",
    "Dining room opening to the garden",
  ],
},
```

Important details:

- `slug` becomes the address: `/projects/example-residence/`. Use lowercase words separated by hyphens. Avoid changing an existing slug after launch unless a redirect is also added.
- The **first** item in `images` is the lead photograph and card thumbnail.
- Remaining images appear in the project gallery.
- Every image must have a matching description in `alt`, in the same order.
- `intro` and `note` are also used to describe the project to search engines.
- Only claim awards, project roles or design authorship when they have been confirmed.

After editing, save `build.mjs`, run `./scripts/site.sh build`, and inspect both desktop and mobile views.

## Replace a photograph on an existing page

Each photograph normally has two files:

```text
example-03.webp
example-03-small.webp
```

- The normal version should be no more than about **2,200 pixels wide**.
- The `-small` version should be about **900 pixels wide**.
- Use WebP, sRGB colour and good photographic quality.
- Do not crop away architecture merely to fit the website. Project pages preserve the original proportions.

### Recommended method

1. Give the replacement a new, simple name, for example `example-04`.
2. Export both versions into `public/images/`: `example-04.webp` and `example-04-small.webp`.
3. In the project’s `images` list, replace the old name with `"example-04"`.
4. Update the corresponding sentence in `alt`.
5. If the new photograph is portrait-oriented, add its name to the `portraitAssets` list in `build.mjs`. This makes it display at a more appropriate width.
6. Rebuild and inspect the page.

Using a new image name is preferable to overwriting an old file because browsers and hosting services may cache the old photograph.

### Reusing the image-processing script

For repeated work, add an entry to the `IMAGES` list in `scripts/process_images.py`:

```python
"example-04": COMPLETED / "Example Project/Chosen Photo.jpg",
```

Then run:

```sh
./scripts/site.sh images
./scripts/site.sh build
```

The image command uses Codex’s bundled image tools on this Mac, so no separate Python package installation is needed. It creates the normal and `-small` WebP files. Check that the source path exists before running it.

## Add, remove or reorder photographs

Change the project’s `images` list and its matching `alt` list:

```js
images: ["example-01", "example-04", "example-02"],
alt: [
  "Exterior of Example Residence",
  "New kitchen photograph",
  "Living room with timber cabinetry",
],
```

The two lists must always contain the same number of items in the same order.

For a rendering rather than a completed photograph, also list its name in `renderImages`:

```js
renderImages: ["example-render-01"],
```

This adds the “Design visualisation” label. Custom labels can be supplied using a `captions` list aligned with the `images` list.

To remove a photograph from a page, remove its name and matching `alt` description. The physical WebP file can remain in `public/images/`; unused files do not appear on the website.

## Add a new residential project

1. Prepare the normal and small WebP files in `public/images/`.
2. In `build.mjs`, find `const residential = [`.
3. Copy an existing residential project object and paste it inside that list.
4. Change every field and image name. The `slug` must be unique.
5. Find `const residentialProjects = [`.
6. Add the new slug at the desired position:

```js
const residentialProjects = [
  "kompally-residence",
  "new-residence",
  "brr-residence",
  // …
]
```

The order in this list controls the order on the Home and Work pages. The individual project page is generated automatically.

## Add a Wider Practice project

Find:

```js
const wider = [
```

Copy an existing project object, paste it at the desired position, and replace all its information. Items in this list automatically appear under Wider Practice on the Home and Work pages.

If the number of wider-practice projects changes, also review any nearby wording that mentions an exact number, such as “Four wider-practice projects”.

## Add an ongoing project

Use the `janwadaFarmhouse` object as the model, then add the new object to:

```js
const ongoing = [janwadaFarmhouse, newProject];
```

For design renders, include every render name in `renderImages` so the images are honestly identified as visualisations.

## Remove or reorder projects

- Residential order is controlled by `residentialProjects`.
- Wider Practice order is the order of objects inside `wider`.
- Ongoing-project order is controlled by `ongoing`.
- Removing a project from those lists removes its card. Remove its object as well if the page should no longer be generated.

After launch, do not simply delete a published project address. Add a redirect from its former address to the most relevant remaining page.

## Edit the main pages

Search `build.mjs` for these names:

- `const home` — homepage wording and homepage sections
- `const workPage` — Work page headings
- `const ongoingPage` — Presently Ongoing page
- `const practicePage` — Practice, team, services, experience and awards
- `const contactPage` — Contact and careers wording
- `const footer` — footer text, address and links
- `const header` — masthead and navigation

Contact telephone numbers also appear in `tel:` links. When changing a displayed number, update the link as well:

```html
<a href="tel:+919494454393">+91 94944 54393</a>
```

## Change colours, type or spacing

Edit `src/style.css`. The main colours are variables near the top:

```css
:root {
  --ink: #242728;
  --heading: #4c5b49;
  --deep: #29372d;
  --paper: #f8f8f6;
  --paper-2: #ebe6dd;
  --muted: #76736f;
  --accent: #c69f73;
}
```

Change these cautiously and test several pages. The responsive rules for tablets and phones are at the bottom of the stylesheet.

## Before publishing

Check at least the following:

- Home, Work, Practice, Contact and Ongoing pages
- The new or edited project page
- Desktop and narrow/mobile widths
- No duplicate, blurred or incorrectly oriented photographs
- No completed photograph incorrectly labelled as a render—or vice versa
- Correct project role and design authorship
- Correct spelling of client/project names
- All telephone, email, WhatsApp and map links
- External links open in a separate tab
- `./scripts/site.sh build` completes without an error

The finished deployable website is the contents of `dist/`.

## Publishing status

This is presently a **local build**. The repository’s current `origin` points to the earlier local website checkout, not directly to a confirmed GitHub/Hostinger production destination. Do not push or replace the live site until the deployment branch and Hostinger configuration have been deliberately checked.

At launch, choose and document one deployment method:

1. Configure Hostinger/GitHub to build the source and publish `dist/`, or
2. Commit the generated contents of `dist/` to the branch/folder Hostinger serves.

Create a recoverable backup of the existing live site before the first replacement deployment.

## If something goes wrong

- A change is missing: run `./scripts/site.sh build` and reload the page.
- An image is missing: check spelling and confirm that both WebP files exist in `public/images/`.
- A portrait image is much too large: add its name to `portraitAssets`.
- The local address does not open: start `./scripts/site.sh serve` and keep that Terminal window running.
- A build error names a line in `build.mjs`: check nearby commas, quotation marks, square brackets and braces.
- Never repair a problem by editing `dist/`; fix the source and rebuild.
