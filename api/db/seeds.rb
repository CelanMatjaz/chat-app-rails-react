# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'faker'

def get_display_name
  "#{Faker::Name.first_name} #{Faker::Name.last_name}"
end

user = User.create!(email: 'test@test.com', password: 'password', password_confirmation: 'password',
                    display_name: get_display_name)

channels = []
rooms = []

%w[Room1 Room2 Room3].each do |room_name|
  room = user.rooms.create!(name: room_name, image_url: '/temp.png')
  rooms.push(room.id)

  user.rooms_users.create!(room_id: room.id)

  (0..3).each do |_|
    c = room.channels.create!(name: Faker::Name.initials(number: 4))
    channels.push(c.id)
  end
end

users = []

(0..6).each do |i|
  u = User.create!(email: "test#{i}@test.com", password: 'password', password_confirmation: 'password',
                   display_name: get_display_name)
  users.push(u.id)
  rooms.each do |id|
    u.rooms_users.create!(room_id: id)    
  end
end

(0..50).each do |_i|
  Message.create!(text: Faker::Lorem.sentence(word_count: 20), channel_id: channels.sample, user_id: users.sample)
end
