# curl: httpbin.org にリクエストを送る

## その 1

- method は GET
- URL はhttps://httpbin.org/headers
- カスタムヘッダーを加える（X-Test='hello'）

```
// コマンド
curl -G -H "X-Test: hello" https://httpbin.org/headers
```

```
// 結果
{
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.79.1",
    "X-Amzn-Trace-Id": "Root=1-629615d6-6af33920131476716fdb40d6",
    "X-Test": "hello"
  }
}
```

## その２

- method は POST
- URL はhttps://httpbin.org/post
- Content-Type は"application/json"
- body は {"name": "hoge"}

```
// コマンド
curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"hoge\"}" https://httpbin.org/post
```

```
// 結果
{
  "args": {},
  "data": "{\"name\": \"hoge\"}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Content-Length": "16",
    "Content-Type": "application/json",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.79.1",
    "X-Amzn-Trace-Id": "Root=1-62961a00-3038eb8c484922556074e20b"
  },
  "json": {
    "name": "hoge"
  },
  "origin": "XXX.XXX.XXX.XX",
  "url": "https://httpbin.org/post"
}
```

## その３

- もう少し複雑な body を送信
  - {userA: {name: "hoge", age: 29}}

```
// コマンド
curl -X POST -H "Content-Type: application/json" -d "{\"userA\": {\"name\": \"hoge\", \"age\": 26}}" https://httpbin.org/post
```

```
// 結果
{
  "args": {},
  "data": "{\"userA\": {\"name\": \"hoge\", \"age\": 26}}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Content-Length": "38",
    "Content-Type": "application/json",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.79.1",
    "X-Amzn-Trace-Id": "Root=1-62961b3e-0e3631bb29ab624e0350a6ed"
  },
  "json": {
    "userA": {
      "age": 26,
      "name": "hoge"
    }
  },
  "origin": "XXX.XXX.XXX.XX",
  "url": "https://httpbin.org/post"
}
```

## その４

- json ではなく Content-Type は application/x-www-form-urlencoded で実行

```
// コマンド
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "{\"name\": \"hoge\"}" https://httpbin.org/post
```

```
// 結果
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "{\"name\": \"hoge\"}": ""
  },
  "headers": {
    "Accept": "*/*",
    "Content-Length": "16",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.79.1",
    "X-Amzn-Trace-Id": "Root=1-62961bc1-2f7253a820a8962f60bb8549"
  },
  "json": null,
  "origin": "XXX.XXX.XXX.XX",
  "url": "https://httpbin.org/post"
}
```

# postman

DONE

# クイズ

## curl に関して

1. curl で basic 認証の必要なサイトにアクセスするコマンドを実行してください。
2. userAgent を偽造して curl を実行してみてください。
3. リダイレクト先を追うためにはどのヘッダを追跡する必要がありますか？またコマンドを実行してみてください。

## postman に関して

1. どこで認証方法を指定するでしょうか？
2. postman では環境変数を設定できます。どこで設定できるでしょう。
3. デフォルトでは自己証明書を設定しているページにはエラーになりアクセスできません。どうすればアクセスできるようになるでしょうか。
