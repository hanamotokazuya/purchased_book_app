class Api::V1::BooksController < ApplicationController

    def index
        books = current_user.books.all
        render json: books
    end

    def create
        book = current_user.books.build(book_params)
        if book.save
            render json: book
        else
            render json: book.errors.full_messages
        end
    end

    def destroy
        book = current_user.books.find_by(id: params[:id])
        if book.destroy
            head :no_content
        else
            render json: { error: "Failed to destroy" }, status: 422
        end
    end

    private
        def book_params
            params.require(:book).permit(:title, :category)
        end
end
