class ApplicationController < ActionController::Base
    include SessionsHelper
    # protect_from_forgery with: :null_session
    # protect_from_forgery :except => :complete
    skip_before_action :verify_authenticity_token
end
