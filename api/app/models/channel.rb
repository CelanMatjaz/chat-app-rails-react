class Channel < ApplicationRecord
  validates :name, presence: true, length: { minimum: 4, maximum: 20 }

  belongs_to :room
  has_many :message, dependent: :delete_all
end
