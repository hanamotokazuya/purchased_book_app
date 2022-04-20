# Purchased Book App
書籍の表紙画像をアップロードすることで、これまでに購入した書籍を管理するサイトです。

これまでに購入した本をカテゴリー毎に分けることで、どういう本をよく購入しているかを俯瞰できます。

レスポンシブ対応しているのでスマホからもご確認いただけます。


![purchased-book-app1_github](https://user-images.githubusercontent.com/39664960/164188496-f5a4085e-c0f4-4584-acc1-ce319f1e65b7.png)


![purchased-book-app2_github](https://user-images.githubusercontent.com/39664960/164189448-2a655b32-e411-4f64-aab1-4e9b8e345d97.png)
# URL
[https://purchased-book-app.herokuapp.com/](https://purchased-book-app.herokuapp.com/)

# Features
書籍アップロードはタイトルとカテゴリーの入力および表紙画像ファイルの添付を必要とします。

カテゴリーとキーワードによる検索で書籍を絞り込むことができます。

# 使用技術
  - React 18.0.0
  - TypeScript 4.6.3
  - Ruby 3.1.1
  - Ruby on Rails 6.1.5
  - MySQL 8.0
  - Heroku
  - AWS S3

# 機能一覧
  - ユーザー登録、ログイン機能
  - 購入書籍投稿機能
    - 画像アップロード(activeStorage, axios, S3)
  - 購入書籍検索機能
  - カテゴリー円グラフ描画機能(recharts)

