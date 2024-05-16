class Room < ApplicationRecord
  validates :name, presence: true, length: { minimum: 4, maximum: 20 }
  validates :image_url, presence: true

  belongs_to :user
  has_many :channels, dependent: :delete_all
  has_many :rooms_users, dependent: :delete_all
end
