Rails.application.routes.draw do

  root "site#index"
  get "/pie_chart", to: "site#index"
  get "/signup", to: "site#index"

end
