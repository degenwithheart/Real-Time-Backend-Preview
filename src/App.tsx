import { useState } from 'react';
import axios from 'axios';
import './App.css';
import CodeTabs from './components/CodeTabs';
import DownloadsTabs from './components/DownloadsTabs';

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
        <button className={activeTab === 'downloads' ? 'active' : ''} onClick={() => setActiveTab('downloads')}>Downloads</button>
      </div>
      {activeTab === 'demo' && (
        <div>
          <p>Mock API preview with Faker-powered random data generation.</p>
          <div className="buttons">
            <button onClick={fetchUser} disabled={loading}>
              {loading ? 'Loading...' : 'Get Random User'}
            </button>
            <button onClick={fetchProduct} disabled={loading}>
              {loading ? 'Loading...' : 'Get Random Product'}
            </button>
          </div>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
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
