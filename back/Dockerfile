# Dockerfile

# ベースイメージとしてNode.js 20のAlpine Linux版を使用
# Alpine版は軽量でコンテナイメージサイズを抑えられる
FROM node:20-alpine

# コンテナ内の作業ディレクトリを設定
# これにより、後続のCOPYやRUNコマンドはこのディレクトリ内で実行されます
WORKDIR /app/back

# package.json と package-lock.json  をコピー
# 依存関係のインストール時にキャッシュが効くように、ソースコードより先にコピーします
COPY package.json ./
COPY package-lock.json ./

#  Knexの設定ファイルと環境変数をコピー
#    Knexがデータベースに接続するために必要なファイルです。
#    db/knexfile.js のパスは実際のプロジェクト構造に合わせてください。
#    aws ecsで環境変数を管理
COPY db/knexfile.js db/

COPY .env .env
# 依存関係をインストール
RUN npm install

# アプリケーションの残りのソースコードをコピー
# WORKDIRで設定した /app/back に、ローカルの back ディレクトリの内容がコピーされます
COPY . .


# entrypoint.sh スクリプトをコピーし、実行可能にする
#    このスクリプトはコンテナ起動時に実行され、データベースのマイグレーションとシードを処理します。
#    entrypoint.sh ファイルは Dockerfile と同じディレクトリに配置してください。
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# データベースのマイグレーションとシード
# RUN npm run db:reset



# Expressアプリケーションがリッスンするポートを公開
EXPOSE 3000

# アプリケーションを起動するコマンドを entrypoint.sh に変更
# これにより、コンテナ起動時にまずマイグレーションが実行され、その後アプリケーションが起動します。
# CMD ["entrypoint.sh"]
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]