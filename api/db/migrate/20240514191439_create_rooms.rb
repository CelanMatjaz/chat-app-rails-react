class CreateRooms < ActiveRecord::Migration[7.1]
  def change
    create_table :rooms do |t|
      t.string :name
      t.string :image_url

      t.timestamps
    end

    add_reference :rooms, :user, foreign_key: true
  end
end
