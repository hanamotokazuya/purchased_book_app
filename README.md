# Purchased Book App
書籍の表紙画像をアップロードすることで、これまでに購入した書籍を管理するサイトです。<br>
これまでに購入した本をカテゴリー毎に分けることで、どういう本をよく購入しているかを俯瞰できます。<br>
レスポンシブ対応しているのでスマホからもご確認いただけます。

# デモ
https://user-images.githubusercontent.com/39664960/164224369-742ebf52-afbc-42fe-878c-06cb760395d0.mp4

# URL
[https://purchased-book-app.herokuapp.com/](https://purchased-book-app.herokuapp.com/)

# 特徴
書籍アップロードはタイトルとカテゴリーの入力および表紙画像ファイルの添付を必要とします。<br>
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

