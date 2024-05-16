class RoomUser < ApplicationRecord
  has_one :user, primary_key: 'user_id', foreign_key: 'id'
  has_one :room, primary_key: 'room_id', foreign_key: 'id'
end
