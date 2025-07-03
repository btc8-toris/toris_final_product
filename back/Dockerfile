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

# 依存関係をインストール
RUN npm install

# データベースのマイグレーションとシード
RUN npm run db:reset


# アプリケーションの残りのソースコードをコピー
# WORKDIRで設定した /app/back に、ローカルの back ディレクトリの内容がコピーされます
COPY . .

# Expressアプリケーションがリッスンするポートを公開
EXPOSE 3000

# アプリケーションを起動するコマンド
# 'npm start'
# ない場合、Node.jsのメインエントリファイルを指定。もし npm start がない場合: CMD ["node", "src/index.js"] 
CMD ["npm", "start"]
