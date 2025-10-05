require 'net/http'

begin
  uri = URI('https://real-time-backend-preview.vercel.app/api/user')
  user_response = Net::HTTP.get(uri)
  puts "User: #{user_response}"

  uri2 = URI('https://real-time-backend-preview.vercel.app/api/product')
  product_response = Net::HTTP.get(uri2)
  puts "Product: #{product_response}"
rescue => e
  puts "Error: #{e.message}"
end