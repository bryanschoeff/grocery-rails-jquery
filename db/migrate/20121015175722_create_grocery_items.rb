class CreateGroceryItems < ActiveRecord::Migration
  def change
    create_table :grocery_items do |t|
      t.string :item
      t.string :section
      t.boolean :done

      t.timestamps
    end
  end
end
