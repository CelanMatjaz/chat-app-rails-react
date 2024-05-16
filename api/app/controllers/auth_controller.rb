class AuthController < ApplicationController
  include CurrentUserConcern

  def register
    user = User.new(auth_params)

    if user.save
      render_json(200)
    else
      render_json(422, nil, user.errors.full_messages)
    end
  end

  def login
    user = User.find_by(email: auth_params['email'])

    unless user
      render_json(401, nil, ['User with provided email does not exist'])
      return
    end

    authenticated = user.try(:authenticate, auth_params['password'])

    unless authenticated
      render_json(401, nil, ['Invalid password'])
      return
    end

    session[:user_id] = user.id
    render_json(200, { logged_in: true, user: })
  end

  def logout
    session.clear
  end

  def logged_in
    if @current_user
      render_json(200, { logged_in: true, user: @current_user })
    else
      render_json(200, { logged_in: false })
    end
  end

  private

  def auth_params
    params.require(:user).permit(:email, :password, :password_confirmation, :display_name)
  end
end
