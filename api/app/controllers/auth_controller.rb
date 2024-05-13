class AuthController < ApplicationController
  include CurrentUserConcern

  def register
    user = User.create(auth_params)

    if user.valid?
      render json: {
        status: 200
      }
    else
      render json: {
        status: 422,
        errors: user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: auth_params['email'])
    authenticated = user.try(:authenticate, auth_params['password'])

    if user.nil?
      render json: {
        status: 401,
        errors: ['User with provided email does not exist']
      }, status: :unauthorized
      return
    end

    unless authenticated
      render json: {
        status: 401,
        errors: ['Invalid password']
      }, status: :unauthorized
      return
    end

    if user && authenticated
      session[:user_id] = user.id
      logger.debug session[:user_id]
      render json: {
        status: 200,
        logged_in: true,
        user:
      }
      return
    end

    render json: {
      status: 500
    }, status: :internal_server_error
  end

  def logout
    return unless session[:user_id]

    session.clear
  end

  def logged_in
    if @current_user
      render json: {
        status: 200,
        logged_in: true,
        user: @current_user
      }
    else
      render json: {
        status: 200,
        logged_in: false
      }
    end
  end

  private

  def auth_params
    params.require(:user).permit(:email, :password, :password_confirmation, :display_name)
  end
end
