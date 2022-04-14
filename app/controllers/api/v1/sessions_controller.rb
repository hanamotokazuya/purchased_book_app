class Api::V1::SessionsController < ApplicationController

    def check
        render json: current_user
    end

    def create
        @user = User.find_by(email: params[:session][:email].downcase)
        if @user && @user.authenticate(params[:session][:password])
            # ユーザーがログインする処理を書く
            log_in @user
            params[:session][:remember_me] ? remember(user) : forget(user)
            render json: @user
        else
            # エラーメッセージをJSONで渡す
            render json: @user
        end
    end

    def destroy
        log_out if logged_in?
    end
end
