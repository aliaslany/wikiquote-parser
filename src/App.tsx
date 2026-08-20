import { useEffect, useMemo, useState } from 'react';
import './styles.css';
import quotes from '../data/showcase-quotes.json';

type Quote = { id: string; author: string; role: string; en: string; fa: string; tags: string[] };

const allQuotes = quotes as Quote[];

function getInitialQuote() {
  const key = 'openquotes-refresh-quote';
  const last = sessionStorage.getItem(key);
  let index = Math.floor(Math.random() * allQuotes.length);
  if (allQuotes.length > 1 && String(index) === last) index = (index + 1) % allQuotes.length;
  sessionStorage.setItem(key, String(index));
  return index;
}

export default function App() {
  const [index, setIndex] = useState(getInitialQuote);
  const [lang, setLang] = useState<'en' | 'fa'>('en');
  const [dark, setDark] = useState(true);
  const [copied, setCopied] = useState(false);
  const quote = allQuotes[index];
  const text = lang === 'fa' ? quote.fa : quote.en;

  useEffect(() => document.documentElement.dataset.theme = dark ? 'dark' : 'light', [dark]);
  const apiExample = useMemo(() => `fetch('https://raw.githubusercontent.com/aliaslany/wikiquote-parser/master/data/showcase-quotes.json')\n  .then(r => r.json())\n  .then(quotes => console.log(quotes));`, []);

  function nextQuote() { setIndex(Math.floor(Math.random() * allQuotes.length)); }
  async function copyQuote() {
    await navigator.clipboard?.writeText(`${text}\n— ${quote.author}`);
    setCopied(true); setTimeout(() => setCopied(false), 1400);
  }

  return <div className="app">
    <header className="nav container">
      <a className="brand" href="#top"><span className="brand-mark">❝</span><span>OpenQuotes</span></a>
      <nav><a href="#quote">Quote</a><a href="#developers">Developers</a><a href="https://github.com/aliaslany/wikiquote-parser" target="_blank">GitHub ↗</a></nav>
      <div className="actions">
        <button className="icon-button" onClick={() => setLang(lang === 'en' ? 'fa' : 'en')} aria-label="Switch language">{lang === 'en' ? 'فا' : 'EN'}</button>
        <button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? '☼' : '☾'}</button>
      </div>
    </header>

    <main id="top">
      <section className="hero container">
        <div className="eyebrow">OPEN · STRUCTURED · MULTILINGUAL</div>
        <h1>Ideas worth <span>remembering.</span></h1>
        <p className="hero-copy">OpenQuotes is an open-source knowledge base for quotations, authors, translations and provenance — built for people and developers.</p>
        <div className="hero-buttons"><a className="primary" href="#quote">Explore a quote ↓</a><a className="secondary" href="#developers">Build with the data</a></div>
      </section>

      <section id="quote" className="quote-section container">
        <div className="quote-card">
          <div className="quote-top"><span>FEATURED QUOTE</span><span>{String(index + 1).padStart(2, '0')} / {String(allQuotes.length).padStart(2, '0')}</span></div>
          <blockquote dir={lang === 'fa' ? 'rtl' : 'ltr'}>{text}</blockquote>
          <div className="author"><div className="avatar">{quote.author.split(' ').map(x => x[0]).slice(0,2).join('')}</div><div><strong>{quote.author}</strong><small>{quote.role}</small></div></div>
          <div className="tags">{quote.tags.map(t => <span key={t}>#{t}</span>)}</div>
          <div className="quote-actions"><button onClick={nextQuote}>↻ New quote</button><button onClick={copyQuote}>{copied ? '✓ Copied' : 'Copy quote'}</button></div>
        </div>
      </section>

      <section className="stats container"><div><b>{allQuotes.length}+</b><span>showcase quotes</span></div><div><b>2</b><span>languages</span></div><div><b>∞</b><span>ready to expand</span></div></section>

      <section id="developers" className="developers container">
        <div className="section-label">FOR DEVELOPERS</div>
        <h2>Use OpenQuotes in your next project.</h2>
        <p>Our public data is designed to be simple to consume. Start with the raw JSON dataset today; the API layer will grow around the same stable data model.</p>
        <div className="api-grid">
          <article><span className="method">GET</span><h3>Random quote</h3><code>/quotes/random</code><p>Return one quote, with author and available translations.</p></article>
          <article><span className="method">GET</span><h3>Search</h3><code>/quotes?search=einstein</code><p>Search quote text, authors and tags.</p></article>
          <article><span className="method">GET</span><h3>Author</h3><code>/authors/{'{slug}'}</code><p>Retrieve an author's metadata and quotations.</p></article>
        </div>
        <div className="code-card"><div className="code-head"><span>JavaScript</span><span>raw dataset</span></div><pre><code>{apiExample}</code></pre></div>
        <div className="developer-note"><strong>Build against stable data.</strong> The canonical dataset is being normalized into authors, quotes, translations, tags and sources. When the hosted API is released, the same identifiers and response model will be used.</div>
      </section>

      <section className="cta container"><div><div className="section-label">OPEN SOURCE</div><h2>Help us make every quote traceable.</h2><p>Contribute parsers, translations, metadata, verification and developer tooling.</p></div><a className="primary" href="https://github.com/aliaslany/wikiquote-parser" target="_blank">View repository ↗</a></section>
    </main>
    <footer className="container footer"><span>OpenQuotes · Open-source multilingual quotations</span><span>Built with data, not noise.</span></footer>
  </div>;
}
