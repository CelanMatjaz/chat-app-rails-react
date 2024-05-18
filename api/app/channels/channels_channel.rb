class ChannelsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "channel_on_room_#{params[:id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
