class Message < ApplicationRecord
  paginates_per 25

  validates :text, presence: true, length: { minimum: 1, maximum: 1024 }

  belongs_to :channel
  belongs_to :user
end
