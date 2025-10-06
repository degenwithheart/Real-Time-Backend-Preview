import { useState } from 'react';
import axios from 'axios';
import './App.css';
import CodeTabs from './components/CodeTabs';
import IntegrationsTabs from './components/IntegrationsTabs';

interface UserData {
  id: number;
  name: string;
  email: string;
  address: string;
  company: string;
  avatar: string;
  phone: string;
  createdAt: string;
}

interface ProductData {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  inStock: boolean;
  rating: string;
  createdAt: string;
}

interface ApiResponse<T = UserData | ProductData> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('demo');
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching user data from:', '/api/user');
      const res = await axios.get('/api/user');
      console.log('User response:', res);
      setData(res.data);
    } catch (err: any) {
      console.error('User fetch error:', err);
      console.error('Error response:', err.response);
      const errorMsg = err.response?.data || err.message || 'Unknown error occurred';
      setError(`Failed to fetch user data: ${typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg)}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching product data from:', '/api/product');
      const res = await axios.get('/api/product');
      console.log('Product response:', res);
      setData(res.data);
    } catch (err: any) {
      console.error('Product fetch error:', err);
      console.error('Error response:', err.response);
      const errorMsg = err.response?.data || err.message || 'Unknown error occurred';
      setError(`Failed to fetch product data: ${typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🌀 Real-Time Backend Preview</h1>
      <div className="tabs">
        <button className={activeTab === 'demo' ? 'active' : ''} onClick={() => setActiveTab('demo')}>API Demo</button>
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
          
          <div className="api-endpoints">
            <div className="endpoint-card">
              <div className="endpoint-info">
                <h3>👤 User Data</h3>
                <p>Get random user profile information</p>
                <code className="endpoint-url">GET /api/user</code>
              </div>
              <button 
                className="endpoint-button user-button" 
                onClick={fetchUser} 
                disabled={loading}
              >
                {loading ? '⏳ Loading...' : '🎲 Generate User'}
              </button>
            </div>
            
            <div className="endpoint-card">
              <div className="endpoint-info">
                <h3>📦 Product Data</h3>
                <p>Get random product information</p>
                <code className="endpoint-url">GET /api/product</code>
              </div>
              <button 
                className="endpoint-button product-button" 
                onClick={fetchProduct} 
                disabled={loading}
              >
                {loading ? '⏳ Loading...' : '🛍️ Generate Product'}
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">❌</span>
              <span className="error-text">{error}</span>
            </div>
          )}
          
          {data && (
            <div className="result-section">
              <h3 className="result-title">📋 API Response</h3>
              <pre className="data-box">{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
      {activeTab === 'code' && <CodeTabs />}
      {activeTab === 'integrations' && <IntegrationsTabs />}
    </div>
  );
}

export default App;
