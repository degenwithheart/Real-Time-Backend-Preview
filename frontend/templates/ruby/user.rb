require 'net/http'

begin
  uri = URI('https://real-time-backend-preview.vercel.app/api/user')
  response = Net::HTTP.get(uri)
  puts "User: #{response}"
rescue => e
  puts "Error: #{e.message}"
end