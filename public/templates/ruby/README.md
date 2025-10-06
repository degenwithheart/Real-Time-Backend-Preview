# Ruby API Integration

## Live Mock API Endpoints
- GET https://real-time-backend-preview.vercel.app/api/user
- GET https://real-time-backend-preview.vercel.app/api/product

## Basic Net::HTTP Usage

```ruby
require 'net/http'
require 'json'
require 'uri'

class ApiClient
  BASE_URL = 'https://real-time-backend-preview.vercel.app'
  
  def self.fetch_user
    uri = URI("#{BASE_URL}/api/user")
    response = Net::HTTP.get_response(uri)
    
    if response.code == '200'
      user_data = JSON.parse(response.body)
      puts "User Data: #{JSON.pretty_generate(user_data)}"
      user_data
    else
      puts "Error fetching user: #{response.code}"
      nil
    end
  rescue StandardError => e
    puts "Error: #{e.message}"
    nil
  end
  
  def self.fetch_product
    uri = URI("#{BASE_URL}/api/product")
    response = Net::HTTP.get_response(uri)
    
    if response.code == '200'
      product_data = JSON.parse(response.body)
      puts "Product Data: #{JSON.pretty_generate(product_data)}"
      product_data
    else
      puts "Error fetching product: #{response.code}"
      nil
    end
  rescue StandardError => e
    puts "Error: #{e.message}"
    nil
  end
end

# Usage
user = ApiClient.fetch_user
product = ApiClient.fetch_product
```

## Rails Integration

```ruby
class MockDataController < ApplicationController
  MOCK_API_URL = 'https://real-time-backend-preview.vercel.app'
  
  def user
    response = fetch_from_api('/api/user')
    render json: response
  end
  
  def product
    response = fetch_from_api('/api/product')
    render json: response
  end
  
  private
  
  def fetch_from_api(endpoint)
    uri = URI("#{MOCK_API_URL}#{endpoint}")
    response = Net::HTTP.get_response(uri)
    
    if response.code == '200'
      JSON.parse(response.body)
    else
      { error: 'Failed to fetch data' }
    end
  rescue StandardError => e
    { error: e.message }
  end
end
```

## Sinatra Integration

```ruby
require 'sinatra'
require 'net/http'
require 'json'

MOCK_API_URL = 'https://real-time-backend-preview.vercel.app'

get '/api/user' do
  content_type :json
  uri = URI("#{MOCK_API_URL}/api/user")
  response = Net::HTTP.get_response(uri)
  response.body
end

get '/api/product' do
  content_type :json
  uri = URI("#{MOCK_API_URL}/api/product")
  response = Net::HTTP.get_response(uri)
  response.body
end
```# Ruby API Connection

This template demonstrates how to connect to the mock API using Ruby.

## API Endpoints

- `GET https://real-time-backend-preview.vercel.app/api/user` - Returns random user data
- `GET https://real-time-backend-preview.vercel.app/api/product` - Returns random product data

## Usage

Run the examples:

```bash
ruby user.rb
ruby product.rb
```

## Building Frontend Apps

Use this mock API to prototype your frontend while the real backend is being developed.

Example: Fetch and display user data.

```ruby
require 'net/http'
require 'json'

uri = URI('https://real-time-backend-preview.vercel.app/api/user')
response = Net::HTTP.get(uri)
user = JSON.parse(response)
puts "User: #{user}"
# Use user data in your Rails or Sinatra app
```

Replace the mock API URL with your production API when ready.