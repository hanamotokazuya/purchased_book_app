class Api::V1::SessionsController < ApplicationController

    def check
        debugger
        render json: current_user
    end

    def create
        debugger
        user = User.find_by(email: params[:session][:email].downcase)
        if user && user.authenticate(params[:session][:password])
            # ユーザーがログインする処理を書く
            log_in user
            debugger
            render json: user
        else
            # エラーメッセージをJSONで渡す
            debugger
            render json: user
        end
    end

    def destroy
        log_out
        # ここに確かにlog outできたと知らせる処理を書くべきでは？
    end
end
