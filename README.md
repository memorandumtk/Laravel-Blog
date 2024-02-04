## Blog課題_高木 晃介

### 使用した主要フレームワーク・ライブラリ
#### Laravel 10
#### Inertia.js
#### Vite
#### React.js
#### Tailwind

## デプロイ方法
1. レポジトリClone
```text
git clone https://github.com/memorandumtk/final-answer-kosuke-blog.git
// or
git clone git@github.com:memorandumtk/final-answer-kosuke-blog.git
```
2. Cloneしたディレクトリに移動し、.envファイルを.env.exampleのコピーとして作成。.envディレクトリのDBインフォメーションを以下のように修正。
```text
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=blog
DB_USERNAME=sail
DB_PASSWORD=password
```
3. sail & vite起動
```text
composer install
sudo chown -R kosuke:kosuke ./vendor/

```
