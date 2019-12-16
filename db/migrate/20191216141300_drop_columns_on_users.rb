class DropColumnsOnUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :profile_img_url
    remove_column :users, :cover_img_url
  end
end
