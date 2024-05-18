class Channel < ApplicationRecord
  validates :name, presence: true, length: { minimum: 4, maximum: 20 }

  belongs_to :room
  has_many :message, dependent: :delete_all

  after_create_commit { broadcast_channel_created }
  after_update_commit { broadcast_channel_updated }
  after_destroy_commit { broadcast_channel_deleted }

  private

  def broadcast_channel_created
    ActionCable.server.broadcast("channel_on_room_#{room_id}", { channel: as_json, status: 'created' })
  end

  def broadcast_channel_updated
    ActionCable.server.broadcast("channel_on_room_#{room_id}", { channel: as_json, status: 'updated' })
  end

  def broadcast_channel_deleted
    ActionCable.server.broadcast("channel_on_room_#{room_id}", { channel: as_json, status: 'deleted' })
  end
end
