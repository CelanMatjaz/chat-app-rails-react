class CreateRoomUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :room_users

    add_reference :room_users, :user, foreign_key: true
    add_reference :room_users, :room, foreign_key: true

    remove_column :room_users, :id
  end
end
