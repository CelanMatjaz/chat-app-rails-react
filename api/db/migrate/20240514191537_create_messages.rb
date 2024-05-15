class CreateMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :messages do |t|
      t.text :text

      t.timestamps
    end

    add_reference :messages, :channel, foreign_key: true
    add_reference :messages, :user, foreign_key: true
  end
end
