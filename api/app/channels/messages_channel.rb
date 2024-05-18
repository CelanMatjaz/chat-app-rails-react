class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "message_on_channel_#{params[:id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
