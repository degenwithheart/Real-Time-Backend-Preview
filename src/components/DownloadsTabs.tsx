import { useState } from 'react';
import '../App.css';

// Function to download template as ZIP
const downloadTemplate = async (templateName: string) => {
  try {
    const response = await fetch(`/api/download-template?template=${templateName}`);
    if (!response.ok) {
      throw new Error('Failed to download template');
    }
    
    const data = await response.json();
    if (data.success && data.downloadUrl) {
      // Download the entire repository ZIP
      const downloadResponse = await fetch(data.downloadUrl);
      const blob = await downloadResponse.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${templateName}-template.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      throw new Error('Invalid API response');
    }
  } catch (error) {
    console.error('Download failed:', error);
    // Fallback to direct GitHub download
    window.open(`https://github.com/degenwithheart/Real-Time-Backend-Preview/archive/refs/heads/main.zip`, '_blank');
  }
};

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
          <button 
            onClick={() => downloadTemplate(activeLang.toLowerCase())}
            className="download-btn"
          >
            📦 Download ZIP
          </button>
          <a href={current.readme} target="_blank" rel="noopener noreferrer">
            📖 README
          </a>
        </div>
      </div>
    </div>
  );
}