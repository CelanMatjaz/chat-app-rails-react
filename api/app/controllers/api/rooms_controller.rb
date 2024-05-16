class Api::RoomsController < ApplicationController
  include CurrentUserConcern

  def get_all_added
    unless @current_user
      render_json(401, nil, ['Unauthorized'])
      return
    end

    res = @current_user.rooms_users.joins(:room).select('rooms.*')

    render_json(200, res)
  end

  def get_all_created
    unless @current_user
      render_json(401, nil, ['Unauthorized'])
      return
    end

    render_json(200, @current_user.rooms.where(user_id: @current_user.id))
  end

  def get_single
    unless @current_user
      render_json(401, nil, ['Unauthorized'])
      return
    end

    room = @current_user.rooms.find_by(id: single_room_params)

    if room
      render_json(200, room)
    else
      render_json(404)
    end
  end

  def create
    unless @current_user
      render_json(401, nil, ['Unauthorized'])
      return
    end

    room = @current_user.rooms.new(name: new_room_params['name'], image_url: '/temp.png')

    if room.save
      @current_user.rooms_users.create(room_id: room.id)
      render_json(200, room)
    else
      render_json(422, nil, [room.errors.full_messages])
    end
  end

  def update
    unless @current_user
      render_json(401, nil, ['Unauthorized'])
      return
    end

    room = Room.find_by(id: id_param, user_id: @current_user.id)

    room.name = update_room_params['name']

    if room.save
      render_json(200, room)
    else
      render_json(500, nil, ['Internal server error'])
    end
  end

  def delete
    unless @current_user
      render_json(401, nil, ['Unauthorized'])
      return
    end

    room = Room.find_by(id: id_param, user_id: @current_user.id)

    if room
      room.destroy
      render_json(200)
    else
      render_json(404)
    end
  end

  private

  def single_room_params
    params.require(:id)
  end

  def new_room_params
    params.require(:room).permit(:name)
  end

  def update_room_params
    new_room_params
  end
end
