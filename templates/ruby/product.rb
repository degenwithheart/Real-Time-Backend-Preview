require 'net/http'

begin
  uri = URI('http://localhost:3001/api/product')
  response = Net::HTTP.get(uri)
  puts "Product: #{response}"
rescue => e
  puts "Error: #{e.message}"
end