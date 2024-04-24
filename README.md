# Art Museum

## Description

Artwork application to list, see more details and add artwork to your favorites list.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Contact](#contact)

## Installation

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Features

This art museum app has the following features:

- Homepage is the listing page with the artworks;
- The artwork list is a request to the [https://data.rijksmuseum.nl] API;
- Each artwork card opens up a modal with the image, title, description, and actions section (Add to favorites / View details);
- This modal fetches the single artwork information;
- Artwork actions explained:
  - When clicking on "Add to favorites" a bunch of thing happens:
    1. The item is added to localstorage and it updates the "favorites" state withing the application;
    2. The button then passes from "Add to favorites" to "Remove from favorites";
    3. The "favorites counter" on the nav is updated as well as the favorites dropdown list (adding/removing the item from the list);
  - When clicking on the View Details link:
    1. The information on the page is fetched from the API;
    2. The router changes to the single artwork view (which is a dinamic page), showing the button to go back to the listing page, image, title, description, artwork types (category?) and the button "Add to favorites";
    3. The button "Add to favorites" is up to date with the actual favorites state, meaning: if the item is already added to favorites the button would be "Remove from favorites";
- The nav component has a logo and the favorites counter
  - The favorites counter is a button that triggers a dropdown with a list of items added to favorites;
  - The favorites dropdown list updates as soon as an item is added/removed from favorites;
  - Each item on the favorites dropdown is a link to the single artwork view, it contains the image, short title and the button to remove it from favorites;

## Contact

Email: `alves.williamsilva@gmail.com`
