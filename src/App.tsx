import { useState } from 'react';
import './App.css';
import CodeTabs from './components/CodeTabs';
import IntegrationsTabs from './components/IntegrationsTabs';

function App() {
  const [activeTab, setActiveTab] = useState('demo');

  return (
    <div className="app">
      <h1>🌀 Real-Time Backend Preview</h1>
      <div className="tabs">
        <button className={activeTab === 'demo' ? 'active' : ''} onClick={() => setActiveTab('demo')}>API Information</button>
        <button className={activeTab === 'code' ? 'active' : ''} onClick={() => setActiveTab('code')}>Code Examples</button>
        <button className={activeTab === 'integrations' ? 'active' : ''} onClick={() => setActiveTab('integrations')}>Integrations</button>
      </div>
      {activeTab === 'demo' && (
        <div className="demo-section">
          <div className="demo-header">
            <h2>🚀 Live API Demo</h2>
            <p className="demo-description">
              Test our mock API endpoints with real-time generated data powered by Faker.js
            </p>
          </div>

          <div className="welcome-tiles">
            <div className="demo-header">
              <h2>🌟 Welcome to Real-Time Backend Preview</h2>
              <p className="demo-description">
                Explore our comprehensive API platform with 12 different endpoint categories:
                <br /><br />
                🔐 Authentication & Authorization<br />
                🛒 E-Commerce & Shopping<br />
                💬 Communication & Content Management<br />
                📊 Analytics & Reporting<br />
                💰 Financial & Trading Data<br />
                👥 HR & Location Services<br />
                🎮 Social Media & Gaming<br />
                🔌 IoT & Device Management<br />
                🏥 Healthcare & Medical Data
              </p>
            </div>
            
            <div className="demo-header">
              <h2>🚀 Getting Started</h2>
              <p className="demo-description">
                Navigate to the <strong>Code Examples</strong> tab to:
                <br /><br />
                📝 View code samples in 10+ programming languages<br />
                🧪 Test live API endpoints with our interactive dashboard<br />
                📋 Copy ready-to-use code snippets
              </p>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'code' && <CodeTabs />}
      {activeTab === 'integrations' && <IntegrationsTabs />}
    </div>
  );
}

export default App;
