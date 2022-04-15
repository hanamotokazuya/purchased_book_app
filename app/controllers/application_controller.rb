class ApplicationController < ActionController::Base
    include SessionsHelper
    # protect_from_forgery with: :null_session
    # protect_from_forgery :except => :complete
    # protect_from_forgery
    skip_before_action :verify_authenticity_token
end
