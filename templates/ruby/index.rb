require 'net/http'

begin
  uri = URI('http://localhost:3001/api/user')
  user_response = Net::HTTP.get(uri)
  puts "User: #{user_response}"

  uri2 = URI('http://localhost:3001/api/product')
  product_response = Net::HTTP.get(uri2)
  puts "Product: #{product_response}"
rescue => e
  puts "Error: #{e.message}"
end