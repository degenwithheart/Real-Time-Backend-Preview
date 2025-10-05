require 'net/http'

begin
  uri = URI('http://localhost:3001/api/user')
  response = Net::HTTP.get(uri)
  puts "User: #{response}"
rescue => e
  puts "Error: #{e.message}"
end