Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
        origins 'http://localhost:3000'

        resource '*',
            headers: :any,
            methods: [:get, :post, :put, :patch, :delete, :options, :head],
            expose: ["X-CSRF_Token"],
            credentials: true
    end

    #本番環境用のオリジン設定
    allow do
        origins 'https://purchased-book-app.herokuapp.com'

        resource '*',
            headers: :any,
            methods: [:get, :post, :put, :patch, :delete, :options, :head],
            expose: ["X-CSRF_Token"],
            credentials: true
    end
end
