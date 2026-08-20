# OpenQuotes

OpenQuotes is an open-source, multilingual quotation project built around structured quote data, authors, translations, tags and sources.

## Website

The repository includes a GitHub Pages showcase with a fresh featured quote on each page refresh, English/Persian switching, dark/light mode, copy and random-quote actions, and a developer-focused data/API section.

After GitHub Pages is enabled for **GitHub Actions**, the site is published automatically from `master`.

## Developer access

The current public showcase dataset is available as raw JSON:

```text
https://raw.githubusercontent.com/aliaslany/wikiquote-parser/master/data/showcase-quotes.json
```

Example:

```js
const quotes = await fetch(
  'https://raw.githubusercontent.com/aliaslany/wikiquote-parser/master/data/showcase-quotes.json'
).then(r => r.json());

const random = quotes[Math.floor(Math.random() * quotes.length)];
console.log(random.en, random.author);
```

The hosted API is planned to expose stable endpoints such as:

- `GET /quotes/random` — one random quote with author and translations
- `GET /quotes?search=einstein` — search quotes, authors and tags
- `GET /authors/{slug}` — author metadata and quotations
- `GET /languages` — supported languages and coverage
- `GET /tags` — available quote topics
- `GET /daily` — deterministic daily quote

The API will use the same normalized identifiers and data model as the repository dataset. Until the hosted API is released, developers should use the raw dataset or clone the repository.

## Data model

The long-term canonical model separates:

- authors
- quotes
- translations
- tags
- professions
- sources
- languages

This keeps author metadata and multilingual translations reusable instead of duplicating them inside every quote record.

## Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## License and attribution

Quote data can inherit licensing and attribution requirements from upstream sources. Always preserve the applicable source attribution and license notices when redistributing data. The project code and individual datasets may have different licensing terms.
