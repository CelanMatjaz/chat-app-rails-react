class Api::MessagesController < ApplicationController
  include CurrentUserConcern

  def get_from_channel
    unless @current_user
      render_json(401, nil, ['Unauthorized'])
      return
    end

    page = pagination_params['page'] || 1
    messages = Message
               .joins(:user)
               .where(channel_id: params['channel_id'])
               .select('messages.*, users.display_name AS username')
               .order(created_at: :desc)
               .page(page)

    render_json_paginated(200, messages, page, messages.next_page, messages.total_pages)
  end

  def create
    unless @current_user
      render_json(401, nil, ['Unauthorized'])
      return
    end

    message = @current_user.messages.new(text: new_message_params['text'], channel_id: new_message_params['channel_id'])

    if message.save
      render_json(200, message)
    else
      render_json(422, nil, [message.errors.full_messages])
    end
  end

  def update
    unless @current_user
      render_json(401, nil, ['Unauthorized'])
      return
    end

    message = Message.find_by(id: id_param, user_id: @current_user.id)

    unless message
      render_json(404)
      return
    end

    message.update(update_message_params)

    if message.save
      render_json(200, message)
    else
      render_json(500, nil, ['Internal server error'])
    end
  end

  def delete
    unless @current_user
      render_json(401, nil, ['Unauthorized'])
      return
    end

    message = @current_user.messages.find_by(id: id_param)

    if message
      message.destroy
      render_json(200)
    else
      render_json(404)
    end
  end

  private

  def new_message_params
    params.require(:message).permit(:text, :channel_id)
  end

  def update_message_params
    new_message_params
  end
end
