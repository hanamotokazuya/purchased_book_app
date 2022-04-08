require "test_helper"

class UsersSignupTest < ActionDispatch::IntegrationTest

  test "invalid signup information" do
    assert_no_difference "User.count" do
      post "/api/v1/users", params: { user: {  name: "",
                                          email: "user@invalid",
                                          password:               "foo",
                                          password_confirmation:  "bar" } }
    end
  end
end
