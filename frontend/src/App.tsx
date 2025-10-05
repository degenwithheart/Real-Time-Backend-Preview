import { useState } from 'react';
import axios from 'axios';
import './App.css';
import CodeTabs from './components/CodeTabs';
import DownloadsTabs from './components/DownloadsTabs';

function App() {
  const [activeTab, setActiveTab] = useState('demo');
  const [data, setData] = useState<any>(null);

  const fetchUser = async () => {
    const res = await axios.get('/api/user');
    setData(res.data);
  };

  const fetchProduct = async () => {
    const res = await axios.get('/api/product');
    setData(res.data);
  };

  return (
    <div className="app">
      <h1>🌀 Real-Time Backend Preview</h1>
      <div className="tabs">
        <button className={activeTab === 'demo' ? 'active' : ''} onClick={() => setActiveTab('demo')}>API Demo</button>
        <button className={activeTab === 'code' ? 'active' : ''} onClick={() => setActiveTab('code')}>Code Examples</button>
        <button className={activeTab === 'downloads' ? 'active' : ''} onClick={() => setActiveTab('downloads')}>Downloads</button>
      </div>
      {activeTab === 'demo' && (
        <div>
          <p>Mock API preview with Faker-powered random data generation.</p>
          <div className="buttons">
            <button onClick={fetchUser}>Get Random User</button>
            <button onClick={fetchProduct}>Get Random Product</button>
          </div>
          {data && (
            <pre className="data-box">{JSON.stringify(data, null, 2)}</pre>
          )}
        </div>
      )}
      {activeTab === 'code' && <CodeTabs />}
      {activeTab === 'downloads' && <DownloadsTabs />}
    </div>
  );
}

export default App;
