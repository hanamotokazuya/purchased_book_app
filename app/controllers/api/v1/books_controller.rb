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
    end

    private
        def book_params
            params.require(:book).permit(:title, :category)
        end
end
