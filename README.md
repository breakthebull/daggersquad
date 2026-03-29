# Dagger Squad Terminal | Helldivers 2 Clan Website
<a href="https://jekyll-themes.com/breakthebull/daggersquad">
  <img
    src="https://img.shields.io/badge/featured%20on-JT-red.svg"
    height="20"
    alt="Jekyll Themes Shield"
  />
</a>

| Home Dashboard | Intel Dossier |
| :---: | :---: |
| ![Home Page Preview](https://github.com/breakthebull/daggersquad/blob/main/home.png) | ![Intel Page Preview](https://github.com/breakthebull/daggersquad/blob/main/intel.png) |

| Comms Terminal | Enlistment Form |
| :---: | :---: |
| ![Comms Page Preview](https://github.com/breakthebull/daggersquad/blob/main/comms.png) | ![Enlist Page Preview](https://github.com/breakthebull/daggersquad/blob/main/enlist.png) |

A high-performance, static website built with **Jekyll** for the **Dagger Squad** Helldivers 2 clan.

Features a holographic "Super Earth" UI, dynamic data-driven content, live Twitch integration, and automated recruitment forms.

**Theme:** Managed Democracy / Sci-Fi Terminal

---

## Features

*   **Dynamic Data System:** All squad info (Leaders, Stats, Loadouts, Story) is stored in a single YAML file. No coding required to update content.
*   **Live Twitch Integration:** Dedicated "Live Feed" page with auto-detecting embed.
*   **Recruitment Terminal:** Contact form powered by Formspree (no backend required).
*   **Responsive Design:** Fully optimized for mobile, tablet, and desktop.
*   **High-Performance Graphics:** GPU-accelerated particle background (Canvas API) for smooth 60fps animations.
*   **RSS News Feed:** Automatically pulls latest Helldivers 2 updates from Steam.

---

## Tech Stack

*   **Generator:** Jekyll (Static Site Generator)
*   **Styling:** SCSS / Sass
*   **Hosting:** NixiHost (Standard Shared Hosting)
*   **Forms:** Formspree
*   **Video:** Twitch Embed API

---

## Project Structure

```text
/
├── _config.yml           # Site settings (Title, Twitch, Discord links)
├── _data/
│   └── squad.yml         # ⭐ EDIT THIS FILE TO UPDATE CONTENT ⭐
├── _layouts/
│   └── default.html      # Master template (Header, Nav, Footer)
├── _sass/                # SCSS stylesheets
├── assets/
│   ├── css/              # Compiled CSS (Auto-generated)
│   ├── js/               # JavaScript (Particles, RSS, Twitch)
│   └── img/              # Images (Leaders, Stratagems, Backgrounds)
├── index.html            # Home Page
├── about.md              # Intel Page
├── join.md               # Enlist Page
├── contact.md            # Comms Page
└── watch.md              # Live Feed Page
