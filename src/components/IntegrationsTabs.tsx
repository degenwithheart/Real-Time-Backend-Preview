import { useState, useEffect } from 'react';
import '../App.css';

const templates: Record<string, { readmePath: string }> = {
  JavaScript: {
    readmePath: '/templates/javascript/README.md'
  },
  TypeScript: {
    readmePath: '/templates/typescript/README.md'
  },
  Python: {
    readmePath: '/templates/python/README.md'
  },
  Java: {
    readmePath: '/templates/java/README.md'
  },
  'C#': {
    readmePath: '/templates/csharp/README.md'
  },
  Go: {
    readmePath: '/templates/go/README.md'
  },
  PHP: {
    readmePath: '/templates/php/README.md'
  },
  Ruby: {
    readmePath: '/templates/ruby/README.md'
  },
  Rust: {
    readmePath: '/templates/rust/README.md'
  },
  Kotlin: {
    readmePath: '/templates/kotlin/README.md'
  }
};

// Simple markdown to HTML converter for basic formatting
const parseMarkdown = (markdown: string) => {
  let html = markdown;
  
  // First, handle code blocks (must be done before other processing)
  html = html.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (_, lang, code) => {
    const language = lang || 'text';
    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    return `<pre class="code-block"><code class="language-${language}" data-lang="${language}">${escapedCode}</code></pre>`;
  });
  
  // Handle inline code
  html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  
  // Split by lines for processing
  const lines = html.split('\n');
  const processedLines = lines.map(line => {
    // Skip if line is inside a pre block
    if (line.includes('<pre>') || line.includes('</pre>') || line.includes('<code class="language-')) {
      return line;
    }
    
    // Headers
    if (line.match(/^# /)) {
      return line.replace(/^# (.*)/, '<h1>$1</h1>');
    }
    if (line.match(/^## /)) {
      return line.replace(/^## (.*)/, '<h2>$1</h2>');
    }
    if (line.match(/^### /)) {
      return line.replace(/^### (.*)/, '<h3>$1</h3>');
    }
    
    // List items
    if (line.match(/^- /)) {
      return line.replace(/^- (.*)/, '<li>$1</li>');
    }
    
    // Bold and italic
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Links
    line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Regular paragraphs (if not empty and not a header/list item/code block)
    if (line.trim() && 
        !line.includes('<h') && 
        !line.includes('<li>') && 
        !line.includes('<pre>') && 
        !line.includes('</pre>') && 
        !line.includes('<code class="language-')) {
      return `<p>${line}</p>`;
    }
    
    return line;
  });
  
  return processedLines.join('\n')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/<ul>(<li>)/g, '<ul>$1')
    .replace(/(<\/li>)<\/ul>/g, '$1</ul>');
};

export default function IntegrationsTabs() {
  const [activeLang, setActiveLang] = useState('JavaScript');
  const [readmeContent, setReadmeContent] = useState('Loading...');

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        setReadmeContent('Loading...');
        const response = await fetch(templates[activeLang].readmePath);
        if (response.ok) {
          const content = await response.text();
          setReadmeContent(content);
        } else {
          setReadmeContent('Failed to load README content.');
        }
      } catch (error) {
        console.error('Error fetching README:', error);
        setReadmeContent('Error loading README content.');
      }
    };

    fetchReadme();
  }, [activeLang]);

  return (
    <div className="integrations-tabs">
      <div className="tab-bar">
        {Object.keys(templates).map(lang => (
          <button
            key={lang}
            className={activeLang === lang ? 'active' : ''}
            onClick={() => setActiveLang(lang)}
          >
            {lang}
          </button>
        ))}
      </div>
      <div className="integration-content">
        <div className="content-main">
          <h3>{activeLang} API Integration</h3>
          <p className="location-info">
            Template is located in <code>templates/{activeLang.toLowerCase()}</code>
          </p>
          <div 
            className="readme-content"
            style={{
              fontFamily: 'inherit',
              lineHeight: '1.6',
              maxWidth: '100%',
              background: '#ffffff',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            {readmeContent === 'Loading...' || readmeContent.startsWith('Failed') || readmeContent.startsWith('Error') ? (
              <p style={{ color: '#6b7280', fontStyle: 'italic' }}>{readmeContent}</p>
            ) : (
              <div 
                dangerouslySetInnerHTML={{ __html: parseMarkdown(readmeContent) }}
                style={{ 
                  fontSize: '15px', 
                  color: '#374151'
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}