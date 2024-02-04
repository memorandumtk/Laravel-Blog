## Blog課題_高木 晃介

### 使用した主要フレームワーク・ライブラリ

- Laravel 10
- Inertia.js
- Vite
- React.js
- Tailwind

---

### デプロイ方法

1. レポジトリClone

```text
git clone https://github.com/memorandumtk/final-answer-kosuke-blog.git test
// or
git clone git@github.com:memorandumtk/final-answer-kosuke-blog.git test
```

2. Cloneしたディレクトリに移動し、sailとnpmパッケージをインストール

```text
cd test
composer require laravel/sail --dev
npm install
```

3. sail起動&DBのマイグレートを行い、FakeデータとSampleイメージをシードする。

```text
./vendor/bin/sail up -d
./vendor/bin/sail artisan  migrate --seed
```

4. viteを起動し、ブラウザで`http://loglhost`にアクセスする。

```text
npm run dev
```

5. 事前に作成済みの以下のデータでログインを行うか、新規でユーザを登録する。

```text
Email:dummy@mail.com
Password:password
```

---

### *本ブログシステムの機能*

### All postsページ、My postsページの共通機能
- ページネーション
  - 9つのポストに設定
- カテゴリ一覧表示
- テキストによるサーチ機能
- ブログをクリックすると各詳細ページに移動
- 各ブログに表示されている情報（左上から）
    - カテゴリ
    - Like数
    - 作成日時(エディットされていた場合はアップデート日時)
    - ブログタイトル＆抜粋メッセージ

#### All postsページ

- Like数確認機能
  - ブログポストに対するLike数を確認可能。自分がLikeしたブログの表示はハートマークになる
- 各ブログ投稿ユーザ表示機能

#### My postsページ

- 各ポストのEdit、Delete機能
- ドラフト作成、表示機能
  - ポスト作成ページでドラフトかパブリッシュするかを選べるため、その値に基づきブログポストの表示を切り替える。
- Like数統計ページ
  - 最初のポストの隣で、総Like数と最新1週間のLike数を確認可能。

### 各ポストの詳細ページ
PostsページやMy Postページでブログポストをクリックした際に移動するページ
- 閲覧できる情報（左上から）
    - カテゴリ
    - Like機能
        - Likeボタンを押すことによってLike、Like取り消しが可能。
    - 作成日時(エディットされていた場合はアップデート日時)
    - ブログタイトル＆ブログメッセージボディ&イメージ
    - コメント
        - 閲覧中のブログに対するコメントが可能。
      
### Composeページ

- タイトル、テキスト、抜粋メッセージ
    - 入力したテキストを新規ブログポストとして保存する。
- イメージアップロード
    - ローカルフォルダからイメージファイルをアップロード可能。何も指定しない場合は`no-image`イメージが表示されるようになる。
- ブログポストのカテゴリを選択可能。
- ポスト前にドラフトとしてポストするかパブリッシュするかを選択可能。

### その他の機能
- auth機能
  - Breezeを以下のコマンドでインストールし、その機能を流用。
  - `sail php artisan breeze:install react`
- Landing pageやページ左上部分へのロゴ表示機能
- TailwindとReactを組み合わせたレスポンシブデザイン
- Laravelのシーダー機能を用いた、FactoryとFakerによる初期データ作成。
- 各モデルに合わせたコントローラーを作成することにより、web.phpファイルのルートをコンパクト化。
