import { useState } from 'react';
import '../App.css';

const downloads: Record<string, { demo: string; user: string; product: string; readme: string }> = {
  JavaScript: {
    demo: '/templates/javascript/index.html',
    user: '/templates/javascript/user.html',
    product: '/templates/javascript/product.html',
    readme: '/templates/javascript/README.md'
  },
  TypeScript: {
    demo: '/templates/typescript/index.html',
    user: '/templates/typescript/user.html',
    product: '/templates/typescript/product.html',
    readme: '/templates/typescript/README.md'
  },
  Python: {
    demo: '/templates/python/index.html',
    user: '/templates/python/user.html',
    product: '/templates/python/product.html',
    readme: '/templates/python/README.md'
  },
  Java: {
    demo: '/templates/java/index.html',
    user: '/templates/java/user.html',
    product: '/templates/java/product.html',
    readme: '/templates/java/README.md'
  },
  'C#': {
    demo: '/templates/csharp/index.html',
    user: '/templates/csharp/user.html',
    product: '/templates/csharp/product.html',
    readme: '/templates/csharp/README.md'
  },
  Go: {
    demo: '/templates/go/index.html',
    user: '/templates/go/user.html',
    product: '/templates/go/product.html',
    readme: '/templates/go/README.md'
  },
  PHP: {
    demo: '/templates/php/index.php',
    user: '/templates/php/user.php',
    product: '/templates/php/product.php',
    readme: '/templates/php/README.md'
  },
  Ruby: {
    demo: '/templates/ruby/index.html',
    user: '/templates/ruby/user.html',
    product: '/templates/ruby/product.html',
    readme: '/templates/ruby/README.md'
  },
  Rust: {
    demo: '/templates/rust/index.html',
    user: '/templates/rust/user.html',
    product: '/templates/rust/product.html',
    readme: '/templates/rust/README.md'
  },
  Kotlin: {
    demo: '/templates/kotlin/index.html',
    user: '/templates/kotlin/user.html',
    product: '/templates/kotlin/product.html',
    readme: '/templates/kotlin/README.md'
  }
};

export default function DownloadsTabs() {
  const [activeLang, setActiveLang] = useState('JavaScript');
  const current = downloads[activeLang];
  return (
    <div className="downloads-tabs">
      <div className="tab-bar">
        {Object.keys(downloads).map(lang => (
          <button
            key={lang}
            className={activeLang === lang ? 'active' : ''}
            onClick={() => setActiveLang(lang)}
          >
            {lang}
          </button>
        ))}
      </div>
      <div className="download-content">
        <h3>{activeLang} Templates</h3>
        <p>Ready-made templates with integrated API for building frontend apps.</p>
        <div className="links">
          <a href={current.demo} target="_blank" rel="noopener noreferrer">View Demo Page</a>
          <a href={current.user} target="_blank" rel="noopener noreferrer">View User Page</a>
          <a href={current.product} target="_blank" rel="noopener noreferrer">View Product Page</a>
          <a href={current.readme} target="_blank" rel="noopener noreferrer">View README</a>
        </div>
        <p>Templates are located in <code>templates/{activeLang.toLowerCase()}</code></p>
      </div>
    </div>
  );
}