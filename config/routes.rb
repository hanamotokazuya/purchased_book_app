Rails.application.routes.draw do

  root to: "site#index"
  get "/books", to: "site#index"
  get "/pie_chart", to: "site#index"
  get "/signup", to: "site#index"
  get "/signin", to: "site#index"
  get "/signout", to: "site#index"
  get "/books/new", to: "site#index"

  namespace :api do
    namespace :v1 do
      get "sessions/check", to: "sessions#check"
      resources :users, only: %i[index show create update destroy]

      post "sessions/create", to: "sessions#create"
      delete "sessions/destroy", to: "sessions#destroy"
      get "books/index", to: "books#index"
      post "books/create", to: "books#create"
      delete "books/destroy/:id", to: "books#destroy"
    end
  end
end
