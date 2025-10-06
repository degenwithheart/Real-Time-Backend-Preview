import { useState, useEffect } from 'react';
import '../App.css';

// Language categories for better organization
const languageCategories: Record<string, { name: string; path: string; }[]> = {
  'Popular': [
    { name: 'JavaScript', path: '/templates/javascript/README.md' },
    { name: 'TypeScript', path: '/templates/typescript/README.md' },
    { name: 'Python', path: '/templates/python/README.md' },
    { name: 'Java', path: '/templates/java/README.md' },
    { name: 'C#', path: '/templates/csharp/README.md' },
    { name: 'Go', path: '/templates/go/README.md' },
    { name: 'PHP', path: '/templates/php/README.md' },
    { name: 'Ruby', path: '/templates/ruby/README.md' },
    { name: 'Rust', path: '/templates/rust/README.md' },
    { name: 'Swift', path: '/templates/swift/README.md' }
  ],
  'Mobile & Web': [
    { name: 'Kotlin', path: '/templates/kotlin/README.md' },
    { name: 'Dart', path: '/templates/dart/README.md' },
    { name: 'Objective-C', path: '/templates/objective-c/README.md' },
    { name: 'Node.js', path: '/templates/nodejs/README.md' },
    { name: 'Bun', path: '/templates/bun/README.md' },
    { name: 'CoffeeScript', path: '/templates/coffeescript/README.md' },
    { name: 'LiveScript', path: '/templates/LiveScript/README.md' }
  ],
  'Systems': [
    { name: 'C', path: '/templates/c/README.md' },
    { name: 'C++', path: '/templates/cpp/README.md' },
    { name: 'Assembly', path: '/templates/assembly/README.md' },
    { name: 'Zig', path: '/templates/zig/README.md' },
    { name: 'V', path: '/templates/v/README.md' },
    { name: 'Odin', path: '/templates/Odin/README.md' },
    { name: 'Carbon', path: '/templates/Carbon/README.md' },
    { name: 'CUDA', path: '/templates/cuda/README.md' }
  ],
  'Functional': [
    { name: 'Haskell', path: '/templates/haskell/README.md' },
    { name: 'Elixir', path: '/templates/elixir/README.md' },
    { name: 'Erlang', path: '/templates/erlang/README.md' },
    { name: 'Clojure', path: '/templates/clojure/README.md' },
    { name: 'F#', path: '/templates/fsharp/README.md' },
    { name: 'OCaml', path: '/templates/ocaml/README.md' },
    { name: 'Scheme', path: '/templates/scheme/README.md' },
    { name: 'Racket', path: '/templates/racket/README.md' },
    { name: 'Elm', path: '/templates/elm/README.md' },
    { name: 'PureScript', path: '/templates/purescript/README.md' },
    { name: 'ReScript', path: '/templates/rescript/README.md' },
    { name: 'Reason', path: '/templates/reason/README.md' }
  ],
  'JVM Languages': [
    { name: 'Scala', path: '/templates/scala/README.md' },
    { name: 'Groovy', path: '/templates/groovy/README.md' },
    { name: 'Kotlin', path: '/templates/kotlin/README.md' }
  ],
  'Scientific': [
    { name: 'R', path: '/templates/r/README.md' },
    { name: 'Julia', path: '/templates/julia/README.md' },
    { name: 'MATLAB', path: '/templates/matlab/README.md' },
    { name: 'Fortran', path: '/templates/fortran/README.md' }
  ],
  'Scripting': [
    { name: 'Bash', path: '/templates/bash/README.md' },
    { name: 'Shell', path: '/templates/shell/README.md' },
    { name: 'PowerShell', path: '/templates/powershell/README.md' },
    { name: 'Perl', path: '/templates/perl/README.md' },
    { name: 'AWK', path: '/templates/awk/README.md' },
    { name: 'Tcl', path: '/templates/tcl/README.md' },
    { name: 'Vim Script', path: '/templates/vim/README.md' }
  ],
  'Enterprise': [
    { name: 'COBOL', path: '/templates/cobol/README.md' },
    { name: 'Pascal', path: '/templates/pascal/README.md' },
    { name: 'Delphi', path: '/templates/delphi/README.md' },
    { name: 'Visual Basic', path: '/templates/vb/README.md' },
    { name: 'Ada', path: '/templates/ada/README.md' },
    { name: 'VHDL', path: '/templates/vhdl/README.md' }
  ],
  'Emerging': [
    { name: 'Crystal', path: '/templates/crystal/README.md' },
    { name: 'Nim', path: '/templates/nim/README.md' },
    { name: 'Gleam', path: '/templates/gleam/README.md' },
    { name: 'Mojo', path: '/templates/Mojo/README.md' },
    { name: 'Grain', path: '/templates/Grain/README.md' },
    { name: 'Chapel', path: '/templates/Chapel/README.md' },
    { name: 'Ballerina', path: '/templates/Ballerina/README.md' }
  ],
  'Specialized': [
    { name: 'Solidity', path: '/templates/solidity/README.md' },
    { name: 'WebAssembly', path: '/templates/WebAssembly/README.md' },
    { name: 'Lua', path: '/templates/lua/README.md' },
    { name: 'Raku', path: '/templates/raku/README.md' },
    { name: 'Prolog', path: '/templates/prolog/README.md' },
    { name: 'Smalltalk', path: '/templates/smalltalk/README.md' },
    { name: 'Forth', path: '/templates/Forth/README.md' },
    { name: 'Factor', path: '/templates/Factor/README.md' }
  ],
  'Unique & Niche': [
    { name: 'ActionScript', path: '/templates/ActionScript/README.md' },
    { name: 'AppleScript', path: '/templates/AppleScript/README.md' },
    { name: 'ColdFusion', path: '/templates/ColdFusion/README.md' },
    { name: 'GDScript', path: '/templates/GDScript/README.md' },
    { name: 'Hack', path: '/templates/hack/README.md' },
    { name: 'Haxe', path: '/templates/haxe/README.md' },
    { name: 'D', path: '/templates/d/README.md' },
    { name: 'Vala', path: '/templates/vala/README.md' },
    { name: 'Red', path: '/templates/red/README.md' },
    { name: 'Ring', path: '/templates/Ring/README.md' },
    { name: 'Io', path: '/templates/Io/README.md' },
    { name: 'J', path: '/templates/J/README.md' },
    { name: 'Q', path: '/templates/Q/README.md' },
    { name: 'KDB+', path: '/templates/kdb/README.md' },
    { name: 'TLA+', path: '/templates/TLA+/README.md' },
    { name: 'Common Lisp', path: '/templates/commonlisp/README.md' },
    { name: 'Idris', path: '/templates/Idris/README.md' },
    { name: 'Koka', path: '/templates/Koka/README.md' },
    { name: 'F*', path: '/templates/F-Star/README.md' },
    { name: 'Clean', path: '/templates/Clean/README.md' },
    { name: 'Curry', path: '/templates/Curry/README.md' },
    { name: 'Eiffel', path: '/templates/Eiffel/README.md' },
    { name: 'Felix', path: '/templates/Felix/README.md' },
    { name: 'Fantom', path: '/templates/Fantom/README.md' },
    { name: 'Harbour', path: '/templates/Harbour/README.md' },
    { name: 'Ladder Logic', path: '/templates/ladder/README.md' },
    { name: 'Neko', path: '/templates/Neko/README.md' },
    { name: 'Beef', path: '/templates/Beef/README.md' },
    { name: 'Cone', path: '/templates/Cone/README.md' },
    { name: 'Halo', path: '/templates/Halo/README.md' },
    { name: 'S-Lang', path: '/templates/S/README.md' },
    { name: 'X10', path: '/templates/X10/README.md' },
    { name: 'Yak', path: '/templates/Yak/README.md' },
    { name: 'IoJS', path: '/templates/iojs/README.md' }
  ]
};

// Flatten all languages into a single object for easy lookup
const templates: Record<string, { readmePath: string }> = {};
Object.values(languageCategories).forEach((category: { name: string; path: string; }[]) => {
  category.forEach((lang: { name: string; path: string; }) => {
    templates[lang.name] = { readmePath: lang.path };
  });
});

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
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [readmeContent, setReadmeContent] = useState('Loading...');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter languages based on search term
  const filteredLanguages = searchTerm 
    ? Object.keys(templates).filter((lang: string) => 
        lang.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : languageCategories[activeCategory as keyof typeof languageCategories].map((lang: { name: string; path: string; }) => lang.name);

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

  const totalLanguages = Object.keys(templates).length;

  return (
    <div className="integrations-tabs">
      <div className="language-selector">
        <div className="selector-header">
          <h3>Choose Your Language</h3>
          <p className="language-count">{totalLanguages} languages supported</p>
        </div>
        
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search languages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="language-search"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="clear-search"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Category Tabs */}
        {!searchTerm && (
          <div className="category-tabs">
            {Object.keys(languageCategories).map((category: string) => (
              <button
                key={category}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
                <span className="category-count">
                  ({languageCategories[category as keyof typeof languageCategories].length})
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Language Grid */}
        <div className="languages-grid">
          {filteredLanguages.length === 0 ? (
            <p className="no-results">No languages found matching "{searchTerm}"</p>
          ) : (
            filteredLanguages.map((lang: string) => (
              <button
                key={lang}
                className={`language-button ${activeLang === lang ? 'active' : ''}`}
                onClick={() => setActiveLang(lang)}
              >
                {lang}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="integration-content">
        <div className="content-main">
          <div className="content-header">
            <h3>{activeLang} API Integration</h3>
            <p className="location-info">
              Documentation for integrating our API with {activeLang}
            </p>
          </div>
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