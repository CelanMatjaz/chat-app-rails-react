class CreateRoomUsers < ActiveRecord::Migration[7.1]
  def change
    create_join_table :users, :rooms
  end
end
