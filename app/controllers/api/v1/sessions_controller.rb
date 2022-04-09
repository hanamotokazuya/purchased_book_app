class Api::V1::SessionsController < ApplicationController

    def check
        render json: current_user
    end

    def create
        user = User.find_by(email: params[:session][:email].downcase)
        if user && user.authenticate(params[:session][:password])
            # ユーザーがログインする処理を書く
            log_in user
            render json: user
        else
            # エラーメッセージをJSONで渡す
            render json: user
        end
    end

    def destroy
        log_out
    end
end
