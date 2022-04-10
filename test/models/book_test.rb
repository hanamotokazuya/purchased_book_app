require "test_helper"

class BookTest < ActiveSupport::TestCase

  def setup
    @user = users(:nobita)
    @book = @user.books.build(title: "React", category: "programming")
  end

  test "should be valid" do
    assert @book.valid?
  end

  test "title should be present" do
    @book.title = "  "
    assert_not @book.valid?
  end

  test "category should be present" do
    @book.category = "  "
    assert_not @book.valid?
  end

  test "title should be at most 50 characters" do
    @book.title = "a" * 51
    assert_not @book.valid?
  end

  test "associated books should be destroyed" do
    @user.save
    @user.books.create!(title: "hoge", category: "hoge")
    assert_difference "Book.count", -1 do
      @user.destroy
    end
  end
end
