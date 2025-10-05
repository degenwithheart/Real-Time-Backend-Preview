# Ruby API Template

This template demonstrates how to connect to the mock API using Ruby.

## API Endpoints

- `GET https://real-time-backend-preview.vercel.app/api/user` - Returns random user data
- `GET https://real-time-backend-preview.vercel.app/api/product` - Returns random product data

## Prerequisites

Ensure the backend is running:

```bash
cd ../../backend
npm install
npm start
```

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