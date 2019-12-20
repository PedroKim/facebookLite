class CreateFriends < ActiveRecord::Migration[5.2]
  def change
    create_table :friends do |t|
      t.integer :requestee_id, null: false
      t.integer :requester_id, null: false
      t.boolean :request_status, null: false
      t.timestamps
    end
    add_index :friends, :requestee_id
    add_index :friends, :requester_id
  end
end
