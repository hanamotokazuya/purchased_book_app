class ApplicationController < ActionController::Base
    include SessionsHelper
    # protect_from_forgery with: :null_session
    protect_from_forgery with: :exception
end
