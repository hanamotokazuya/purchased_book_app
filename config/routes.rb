Rails.application.routes.draw do

  root "site#index"
  get "/book", to: "site#index"
  get "/pie_chart", to: "site#index"
  get "/signup", to: "site#index"

end
