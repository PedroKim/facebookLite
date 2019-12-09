class AddColumnsOnUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :fname, :string, null: false
    add_column :users, :lname, :string, null: false
    add_column :users, :birth_date, :date, null: false
    add_column :users, :gender, :string, null: false
    add_column :users, :phone_number, :string
    add_column :users, :current_city, :string
    add_column :users, :hometown, :string
    add_column :users, :bio, :text
    add_column :users, :profile_img_url, :string
    add_column :users, :cover_img_url, :string
  end
end
