require 'net/http'

begin
  uri = URI('https://real-time-backend-preview.vercel.app/api/product')
  response = Net::HTTP.get(uri)
  puts "Product: #{response}"
rescue => e
  puts "Error: #{e.message}"
end