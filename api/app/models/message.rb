class Message < ApplicationRecord
  paginates_per 25

  validates :text, presence: true, length: { minimum: 1, maximum: 1024 }

  belongs_to :channel
  belongs_to :user

  after_create_commit { broadcast_message_created }
  after_update_commit { broadcast_message_updated }
  after_destroy_commit { broadcast_message_deleted }

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

  def broadcast_message_created
    ActionCable.server.broadcast("channel_#{channel_id}", { message: as_json_msg, status: 'created' })
  end

  def broadcast_message_updated
    ActionCable.server.broadcast("channel_#{channel_id}", { message: as_json_msg, status: 'updated' })
  end

  def broadcast_message_deleted
    ActionCable.server.broadcast("channel_#{channel_id}", { message: as_json_msg, status: 'deleted' })
  end
end
