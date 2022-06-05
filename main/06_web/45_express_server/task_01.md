# 課題１

## node.js と express で WEB サーバーを実装する

- curl コマンドで動作確認する
- 2 つのエンドポイント（localhost:8080 の場合）
  1. localhost:8080 に対して GET リクエスト時、JSON で`{text: hello world}`、HTTP ステータスコードは 200 を返す
  2. localhost:8080 に対して POST リクエスト時、リクエスト body に含まれる JSON データをレスポンス body に含め、HTTP ステータスコードは 201 を返す
     - POST リクエストを受け付けるエンドポイントは、Contet-Type が application/json 以外のとき、HTTP ステータスコード 400 を返す

[GitHub: express-server](https://github.com/umirai/express-server)

## 動作確認

1. `curl localhost:8080 -H "Content-Type: application/json"`: `{text: hello world}` が返ってくる
   -> OK!
2. `curl localhost:8080 -d '{"name": "hoge"}' -H "Content-Type: application/json"`: `{name: hoge}` が返ってくる
   -> OK!
3. `curl localhost:8080 -d '{"name": "hoge"}'`: HTTP ステータス 400（エラー）が発生する
   -> OK!

## Check it out!

実務で使用する場合、以下のようなセキュリティ面での対策は必要
https://expressjs.com/ja/advanced/best-practice-security.html

node.js 製のアプリケーションを開発する際に役立つベストプラクティス集
https://github.com/goldbergyoni/nodebestpractices
