Rails.application.routes.draw do

  root to: redirect("/book")
  get "/book", to: "site#index"
  get "/pie_chart", to: "site#index"
  get "/signup", to: "site#index"
  get "/signin", to: "site#index"
  get "/signout", to: "site#index"

  namespace :api do
    namespace :v1 do
      delete 'todos/destroy_all', to: 'todos#destroy_all'
      resources :users, only: %i[index show create update destroy]
    end
  end
end
