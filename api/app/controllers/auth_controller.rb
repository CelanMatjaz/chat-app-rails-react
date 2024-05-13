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
    user = User.find_by(email: auth_params['email']).try(:authenticate, auth_params['password'])

    if user
      session[:user_id] = user.id
      render json: {
        status: 200,
        logged_in: true,
        user:
      }
    else
      render json: {
        status: 401,
        errors: user.errors.full_messages
      }, status: :unauthorized

    end
  end

  def logout
    return unless session[:user_id]

    session.clear
  end

  def logged_in
    if @current_user
      render json: {
        logged_in: true,
        user: @current_user
      }
    else
      render json: {
        logged_in: false
      }
    end
  end

  private

  def auth_params
    params.require(:user).permit(:email, :password, :password_confirmation, :display_name)
  end
end
