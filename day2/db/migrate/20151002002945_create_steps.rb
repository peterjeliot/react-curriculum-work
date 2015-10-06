class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.text :body
      t.integer :todo_id
      t.integer :order

      t.timestamps null: false
    end
  end
end
