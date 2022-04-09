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
      get "sessions/check", to: "sessions#check"
      resources :users, only: %i[index show create update destroy]

      resources :sessions, only: %i[create destroy]
    end
  end
end
