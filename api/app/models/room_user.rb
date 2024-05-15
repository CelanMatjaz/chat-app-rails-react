class RoomUser < ApplicationRecord
  has_one :user
  has_one :room
end
