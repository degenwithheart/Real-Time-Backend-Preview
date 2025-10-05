import { useState } from 'react';
import '../App.css';

const downloads: Record<string, { demo: string; user: string; product: string; readme: string }> = {
  JavaScript: {
    demo: '/templates/javascript/index.html',
    user: '/templates/javascript/user.html',
    product: '/templates/javascript/product.html',
    readme: '/templates/javascript/README.html'
  },
  TypeScript: {
    demo: '/templates/typescript/index.html',
    user: '/templates/typescript/user.html',
    product: '/templates/typescript/product.html',
    readme: '/templates/typescript/README.html'
  },
  Python: {
    demo: '/templates/python/index.html',
    user: '/templates/python/user.html',
    product: '/templates/python/product.html',
    readme: '/templates/python/README.html'
  },
  Java: {
    demo: '/templates/java/index.html',
    user: '/templates/java/user.html',
    product: '/templates/java/product.html',
    readme: '/templates/java/README.html'
  },
  'C#': {
    demo: '/templates/csharp/index.html',
    user: '/templates/csharp/user.html',
    product: '/templates/csharp/product.html',
    readme: '/templates/csharp/README.html'
  },
  Go: {
    demo: '/templates/go/index.html',
    user: '/templates/go/user.html',
    product: '/templates/go/product.html',
    readme: '/templates/go/README.html'
  },
  PHP: {
    demo: '/templates/php/index.html',
    user: '/templates/php/user.php',
    product: '/templates/php/product.php',
    readme: '/templates/php/README.html'
  },
  Ruby: {
    demo: '/templates/ruby/index.html',
    user: '/templates/ruby/user.html',
    product: '/templates/ruby/product.html',
    readme: '/templates/ruby/README.html'
  },
  Rust: {
    demo: '/templates/rust/index.html',
    user: '/templates/rust/user.html',
    product: '/templates/rust/product.html',
    readme: '/templates/rust/README.html'
  },
  Kotlin: {
    demo: '/templates/kotlin/index.html',
    user: '/templates/kotlin/user.html',
    product: '/templates/kotlin/product.html',
    readme: '/templates/kotlin/README.html'
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
        <div className="content-main">
          <h3>{activeLang} Templates</h3>
          <p>Ready-made templates with integrated API for building frontend apps.</p>
          <p className="location-info">
            Templates are located in <code>templates/{activeLang.toLowerCase()}</code>
          </p>
        </div>
        <div className="links">
          <a href={current.demo} target="_blank" rel="noopener noreferrer">
            🚀 Demo
          </a>
          <a href={`https://github.com/degenwithheart/Real-Time-Backend-Preview/tree/main/templates/${activeLang.toLowerCase()}`} target="_blank" rel="noopener noreferrer">
            📦 Download
          </a>
          <a href={current.readme} target="_blank" rel="noopener noreferrer">
            📖 README
          </a>
        </div>
      </div>
    </div>
  );
}