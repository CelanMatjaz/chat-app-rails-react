class Api::ChannelsController < ApplicationController
  include CurrentUserConcern

  def get_from_room
    unless @current_user
      render_json(401, nil, ['Unauthorized'])
      return
    end

    render_json(200, Channel.where(room_id: id_param))
  end

  def create
    unless @current_user
      render_json(401, nil, ['Unauthorized'])
      return
    end

    params = new_channel_params

    unless @current_user.rooms.find_by(id: params['room_id'])
      render_json(403, nil, ['Forbidden'])
      return
    end

    channel = Room.find_by(id: params['room_id']).channels.new(name: params['name'])

    if channel.save
      render_json(200, channel)
    else
      render_json(422, nil, [room.errors.full_messages])
    end
  end

  def update
    unless @current_user
      render_json(401, nil, ['Unauthorized'])
      return
    end

    channel = Channel.find_by(id: id_param, room_id: update_channel_params['room_id'])

    channel.name = update_channel_params['name']

    if channel.save
      render_json(200, channel)
    else
      render_json(500, nil, ['Internal server error'])
    end
  end

  def delete
    unless @current_user
      render_json(401, nil, ['Unauthorized'])
      return
    end

    channel = Channel.find_by(id: id_param)

    if channel
      channel.destroy
      render_json(200)
    else
      render_json(404)
    end
  end

  private

  def new_channel_params
    params.require(:channel).permit(:room_id, :name)
  end

  def update_channel_params
    new_channel_params
  end
end
