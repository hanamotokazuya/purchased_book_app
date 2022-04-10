class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :category
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :books, [:user_id, :created_at]
  end
end
