class CreateChannels < ActiveRecord::Migration[7.1]
  def change
    create_table :channels do |t|
      t.string :name

      t.timestamps
    end

    add_reference :channels, :room, foreign_key: true
  end
end
