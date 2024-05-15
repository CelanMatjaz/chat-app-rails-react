# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

user = User.create!(email: 'test@test.com', password: 'password', password_confirmation: 'password',
                    display_name: 'Test User')

%w[Room1 Room2 Room3].each do |room_name|
  room = user.rooms.create!(name: room_name, image_url: '/temp.png')

  user.room_user.create!(room_id: room.id)

  %w[Channel1 Channel2 Channel3].each do |channel_name|
    room.channels.create!(name: channel_name)
  end
end
