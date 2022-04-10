class Api::V1::BooksController < ApplicationController

    def index
        books = current_user.books.all
        render json: books
    end
# Rails.application.routes.url_helpers.rails_representation_url(book.image.variant({}), only_path: true)
    def create
        book = current_user.books.build(book_params)
        if params[:book][:image]
            blob = ActiveStorage::Blob.create_after_upload!(
                io: StringIO.new(decode(params[:book][:image][:data]) + "\n"),
                filename: params[:book][:image][:name]
            )
            book.image.attach(blob)
            url_book = url_for(book.image)
            debugger
            book[:url] =  url_book
        end
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
            params.require(:book).permit(:title, :category, :image)
        end

        def decode(str)
            Base64.decode64(str.split(',').last)
        end
end
