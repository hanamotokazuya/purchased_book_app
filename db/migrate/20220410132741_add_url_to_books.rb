class AddUrlToBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :url, :string
  end
end
