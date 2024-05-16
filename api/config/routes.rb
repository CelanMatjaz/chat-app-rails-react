Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  namespace :api do
    get 'messages', to: 'messages#get'
    get 'messages/channel/:channel_id', to: 'messages#get_from_channel'
    post 'messages', to: 'messages#create'
    patch 'messages/:id', to: 'messages#update'
    delete 'messages/:id', to: 'messages#delete'

    get 'channels/room/:room_id', to: 'channels#get_from_room'
    post 'channels', to: 'channels#create'
    patch 'channels/:id', to: 'channels#update'
    delete 'channels/:id', to: 'channels#delete'

    get 'rooms', to: 'rooms#get_all_added'
    get 'rooms-from-user', to: 'rooms#get_all_created'
    get 'rooms/:id', to: 'rooms#get_single'
    post 'rooms', to: 'rooms#create'
    patch 'rooms/:id', to: 'rooms#update'
    delete 'rooms/:id', to: 'rooms#delete'
  end

  post 'auth/register', to: 'auth#register'
  post 'auth/login', to: 'auth#login'
  get 'auth/logged_in', to: 'auth#logged_in'
  delete 'auth/logout', to: 'auth#logout'
end
