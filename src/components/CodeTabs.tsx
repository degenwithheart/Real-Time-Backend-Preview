import { useState, useEffect } from 'react';
import '../App.css';

const codeSamples: Record<string, string> = {
  JavaScript: `import axios from 'axios';
axios.get('/api/user').then(res => console.log(res.data));`,

  TypeScript: `import axios from 'axios';
(async () => {
  const { data } = await axios.get('/api/user');
  console.log(data);
})();`,

  Python: `import requests
print(requests.get("http://real-time-backend-preview.vercel.app/api/user").json())`,

  Java: `import java.net.*;
import java.io.*;
public class Main {
  public static void main(String[] args) throws Exception {
    URL url = new URL("http://real-time-backend-preview.vercel.app/api/user");
    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
    String inputLine;
    while ((inputLine = in.readLine()) != null)
        System.out.println(inputLine);
    in.close();
  }
}`,

  'C#': `using System;
using System.Net.Http;
using System.Threading.Tasks;
class Program {
  static async Task Main() {
    var client = new HttpClient();
    var response = await client.GetStringAsync("http://real-time-backend-preview.vercel.app/api/user");
    Console.WriteLine(response);
  }
}`,

  Go: `package main
import ("fmt"; "net/http"; "io/ioutil")
func main() {
  resp, _ := http.Get("http://real-time-backend-preview.vercel.app/api/user")
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(string(body))
}`,

  PHP: `<?php
echo file_get_contents("http://real-time-backend-preview.vercel.app/api/user");
?>`,

  Ruby: `require 'net/http'
puts Net::HTTP.get(URI('http://real-time-backend-preview.vercel.app/api/user'))`,

  Rust: `use reqwest;
#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let res = reqwest::get("http://real-time-backend-preview.vercel.app/api/user").await?;
    println!("{}", res.text().await?);
    Ok(())
}`,

  Kotlin: `import java.net.URL
fun main() {
  val response = URL("http://real-time-backend-preview.vercel.app/api/user").readText()
  println(response)
}`
};

const apiEndpoints = {
  'Authentication': [
    { name: 'Login', endpoint: '/api/auth?endpoint=login', method: 'POST' },
    { name: 'Register', endpoint: '/api/auth?endpoint=register', method: 'POST' },
    { name: 'Profile', endpoint: '/api/auth?endpoint=profile', method: 'GET' },
    { name: 'Permissions', endpoint: '/api/auth?endpoint=permissions', method: 'GET' }
  ],
  'Commerce': [
    { name: 'Orders', endpoint: '/api/commerce?endpoint=orders', method: 'GET' },
    { name: 'Inventory', endpoint: '/api/commerce?endpoint=inventory', method: 'GET' },
    { name: 'Transactions', endpoint: '/api/commerce?endpoint=transactions', method: 'GET' },
    { name: 'Customers', endpoint: '/api/commerce?endpoint=customers', method: 'GET' }
  ],
  'Communication & Content': [
    { name: 'Messages', endpoint: '/api/communication-content?endpoint=messages', method: 'GET' },
    { name: 'Notifications', endpoint: '/api/communication-content?endpoint=notifications', method: 'GET' },
    { name: 'Emails', endpoint: '/api/communication-content?endpoint=emails', method: 'GET' },
    { name: 'Contacts', endpoint: '/api/communication-content?endpoint=contacts', method: 'GET' },
    { name: 'Posts', endpoint: '/api/communication-content?endpoint=posts', method: 'GET' },
    { name: 'Comments', endpoint: '/api/communication-content?endpoint=comments', method: 'GET' },
    { name: 'Media', endpoint: '/api/communication-content?endpoint=media', method: 'GET' },
    { name: 'Categories', endpoint: '/api/communication-content?endpoint=categories', method: 'GET' }
  ],
  'Analytics': [
    { name: 'Analytics', endpoint: '/api/analytics?endpoint=analytics', method: 'GET' },
    { name: 'Events', endpoint: '/api/analytics?endpoint=events', method: 'GET' },
    { name: 'Reports', endpoint: '/api/analytics?endpoint=reports', method: 'GET' },
    { name: 'Logs', endpoint: '/api/analytics?endpoint=logs', method: 'GET' }
  ],
  'Financial': [
    { name: 'Accounts', endpoint: '/api/financial?endpoint=accounts', method: 'GET' },
    { name: 'Transactions', endpoint: '/api/financial?endpoint=transactions', method: 'GET' },
    { name: 'Cryptocurrencies', endpoint: '/api/financial?endpoint=cryptocurrencies', method: 'GET' },
    { name: 'Stocks', endpoint: '/api/financial?endpoint=stocks', method: 'GET' }
  ],
  'HR & Location': [
    { name: 'Employees', endpoint: '/api/hr-location?endpoint=employees', method: 'GET' },
    { name: 'Departments', endpoint: '/api/hr-location?endpoint=departments', method: 'GET' },
    { name: 'Schedules', endpoint: '/api/hr-location?endpoint=schedules', method: 'GET' },
    { name: 'Tasks', endpoint: '/api/hr-location?endpoint=tasks', method: 'GET' },
    { name: 'Locations', endpoint: '/api/hr-location?endpoint=locations', method: 'GET' },
    { name: 'Weather', endpoint: '/api/hr-location?endpoint=weather', method: 'GET' },
    { name: 'Maps', endpoint: '/api/hr-location?endpoint=maps', method: 'GET' },
    { name: 'Geocoding', endpoint: '/api/hr-location?endpoint=geocoding', method: 'GET' }
  ],
  'Social & Gaming': [
    { name: 'Posts', endpoint: '/api/social-gaming?endpoint=posts', method: 'GET' },
    { name: 'Followers', endpoint: '/api/social-gaming?endpoint=followers', method: 'GET' },
    { name: 'Hashtags', endpoint: '/api/social-gaming?endpoint=hashtags', method: 'GET' },
    { name: 'Stories', endpoint: '/api/social-gaming?endpoint=stories', method: 'GET' },
    { name: 'Players', endpoint: '/api/social-gaming?endpoint=players', method: 'GET' },
    { name: 'Matches', endpoint: '/api/social-gaming?endpoint=matches', method: 'GET' },
    { name: 'Leaderboards', endpoint: '/api/social-gaming?endpoint=leaderboards', method: 'GET' },
    { name: 'Achievements', endpoint: '/api/social-gaming?endpoint=achievements', method: 'GET' }
  ],
  'IoT': [
    { name: 'Devices', endpoint: '/api/iot?endpoint=devices', method: 'GET' },
    { name: 'Sensors', endpoint: '/api/iot?endpoint=sensors', method: 'GET' },
    { name: 'Telemetry', endpoint: '/api/iot?endpoint=telemetry', method: 'GET' },
    { name: 'Alerts', endpoint: '/api/iot?endpoint=alerts', method: 'GET' }
  ],
  'Healthcare': [
    { name: 'Patients', endpoint: '/api/healthcare?endpoint=patients', method: 'GET' },
    { name: 'Appointments', endpoint: '/api/healthcare?endpoint=appointments', method: 'GET' },
    { name: 'Medications', endpoint: '/api/healthcare?endpoint=medications', method: 'GET' },
    { name: 'Vitals', endpoint: '/api/healthcare?endpoint=vitals', method: 'GET' }
  ]
};

function ApiTestingDashboard() {
  const [selectedCategory, setSelectedCategory] = useState('Authentication');
  const [selectedEndpoint, setSelectedEndpoint] = useState(apiEndpoints['Authentication'][0]);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestParams, setRequestParams] = useState({ count: '5', page: '1' });

  const testEndpoint = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL(window.location.origin + selectedEndpoint.endpoint);
      Object.entries(requestParams).forEach(([key, value]) => {
        if (value) url.searchParams.set(key, value);
      });

      const fetchOptions: RequestInit = {
        method: selectedEndpoint.method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (selectedEndpoint.method === 'POST') {
        fetchOptions.body = JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        });
      }

      const res = await fetch(url.toString(), fetchOptions);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${data.error || 'Unknown error'}`);
      }

      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSelectedEndpoint(apiEndpoints[selectedCategory as keyof typeof apiEndpoints][0]);
  }, [selectedCategory]);

  return (
    <div className="api-testing-dashboard">
      <div className="api-controls">
        <div className="control-group">
          <label>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {Object.keys(apiEndpoints).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Endpoint:</label>
          <select
            value={selectedEndpoint.endpoint}
            onChange={(e) => {
              const endpoint = apiEndpoints[selectedCategory as keyof typeof apiEndpoints]
                .find(ep => ep.endpoint === e.target.value);
              if (endpoint) setSelectedEndpoint(endpoint);
            }}
          >
            {apiEndpoints[selectedCategory as keyof typeof apiEndpoints].map(endpoint => (
              <option key={endpoint.endpoint} value={endpoint.endpoint}>
                {endpoint.method} {endpoint.name}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Parameters:</label>
          <div className="params">
            <input
              type="number"
              placeholder="count"
              value={requestParams.count}
              onChange={(e) => setRequestParams(prev => ({ ...prev, count: e.target.value }))}
              min="1"
              max="50"
            />
            <input
              type="number"
              placeholder="page"
              value={requestParams.page}
              onChange={(e) => setRequestParams(prev => ({ ...prev, page: e.target.value }))}
              min="1"
            />
          </div>
        </div>

        <button
          className="test-button"
          onClick={testEndpoint}
          disabled={loading}
        >
          {loading ? 'Testing...' : 'Test API'}
        </button>
      </div>

      <div className="api-response">
        <div className="response-header">
          <span>Response</span>
          {response && (
            <button
              className="copy-response"
              onClick={() => navigator.clipboard.writeText(JSON.stringify(response, null, 2))}
              title="Copy response"
            >
              📋
            </button>
          )}
        </div>
        <div className="response-content">
          {error && <div className="error">{error}</div>}
          {response && (
            <pre>{JSON.stringify(response, null, 2)}</pre>
          )}
          {!response && !error && !loading && (
            <div className="placeholder">Click "Test API" to see the response</div>
          )}
          {loading && <div className="loading">Loading...</div>}
        </div>
      </div>
    </div>
  );
}

export default function CodeTabs() {
  const [activeTab, setActiveTab] = useState("Code Examples");

  const tabs = ["Code Examples", "API Testing"];

  return (
    <div className="code-tabs">
      <div className="tab-bar">
        {tabs.map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Code Examples" ? (
        <CodeExamplesTab />
      ) : (
        <ApiTestingDashboard />
      )}
    </div>
  );
}

function CodeExamplesTab() {
  const [activeLang, setActiveLang] = useState("JavaScript");

  return (
    <>
      <div className="tab-bar secondary">
        {Object.keys(codeSamples).map(lang => (
          <button
            key={lang}
            className={activeLang === lang ? "active" : ""}
            onClick={() => setActiveLang(lang)}
          >
            {lang}
          </button>
        ))}
      </div>
      <div className="code-container">
        <div className="code-header">
          <span className="code-title">{activeLang} Example</span>
          <button
            className="copy-button"
            onClick={() => navigator.clipboard.writeText(codeSamples[activeLang])}
            title="Copy to clipboard"
          >
            📋
          </button>
        </div>
        <pre className="code-block">
          {codeSamples[activeLang]}
        </pre>
      </div>
    </>
  );
}