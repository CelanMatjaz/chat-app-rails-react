class Message < ApplicationRecord
  paginates_per 25

  validates :text, presence: true, length: { minimum: 1, maximum: 1024 }

  belongs_to :channel
  belongs_to :user

  after_create_commit { broadcast_message }

  def as_json_msg(_options = {})
    {
      id:,
      text:,
      channel_id:,
      user_id:,
      username: user.display_name,
      created_at:,
      updated_at:
    }
  end

  private

  def broadcast_message
    ActionCable.server.broadcast("channel_#{channel_id}", { message: as_json_msg })
  end
end
