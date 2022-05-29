# 課題１ 以下ヘッダーの意味・役割

## HTTP メッセージのサンプル

### リクエストメッセージ

```text
GET / HTTP/1.1

// ここがhttpヘッダー
Accept: image/gif, image/jpeg, */*
Accept-Language: ja
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0 (Compatible; MSIE 6.0; Windows NT 5.1;)
Host: www.xxx.zzz
Connection: Keep-Alive

// ここからbodyが続く...
```

### レスポンスメッセージ

```
HTTP/1.1 200 OK

// ここがhttpヘッダー
Date: Sun, 11 Jan 2004 16:06:23 GMT
Server: Apache/1.3.22 (Unix) (Red-Hat/Linux)
Last-Modified: Sun, 07 Dec 2003 12:34:18 GMT
ETag: "1dba6-131b-3fd31e4a"
Accept-Ranges: bytes
Content-Length: 4891
Keep-Alive: timeout=15, max=100
Connection: Keep-Alive
Content-Type: text/html

// ここからbodyが続く...
<!DOCTYPE html>
<html>
  :
</html>
```

このうちヘッダー部分について調査する。

【参照】https://www.tohoho-web.com/ex/http.htm

## Host

リクエスト先サーバーのホスト名・ポート番号

## Content-type

- メディアタイプを意味し、`<MIME_type>/<MIME_subtype>`の識別子形式で表される

  - テキストファイル：text/plain
  - HTML ファイル：text/html
  - JS ファイル: text/javascript
  - JPEG ファイル: image/jpeg
  - などなど

    - HTML の form 要素からデータを送るときは、`<form>`要素の`enctype`属性で Content-Type を指定することもできる

## User-agent

サーバーに伝えるブラウザ情報（種類、バージョン、プラットフォームなど）

- ex. `Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion`
- 各項目の意味詳細は[こちら](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/User-Agent#firefox_ua_string)

## Accept

- リクエスト時にブラウザが受信可能なデータ形式（MIME タイプ）をサーバに伝える
  - ex. `Accept: image/gif, image/jpeg, */*`

## Referer

- リクエスト時の URL を持っていた、リンク元の URL
  - ex. `Referer: http://xxx.yyy.zzz/index.html`

## Accept-Encoding

- ブラウザが受信可能なエンコーディング方式をサーバーに伝える

## Authorization

- 認証が必要なリソースにアクセスする際、サーバーに認証情報を伝える

  - ex. `Authorization: Basic dGFuYWthOmhpbWl0c3U=`
    - Basic 認証の例
    - `Basic`の文字で Basic 認証であることを、`dGFuYWthOmhpbWl0c3U=`でユーザー名と PW をコロンで連結して BASE64 形式にエンコードした文字列を送る

### 認証処理概要

1. 認証が必要なリソースに匿名リクエストした場合、サーバーからは`401 Unauthorized`が返ってくる
   - このレスポンスに`WWW-Authenticate`ヘッダーが含まれている（sample: `WWW-Authenticate: Basic realm="XXXXXX"`）
     - Basic が「認証方式」
     - realm に含まれる XXXX が「認証領域」
2. クライアントは認証領域をユーザーに提示して、ID や PW の入力を求める
3. ユーザーは ID と PW を送信する
   - このリクエスト内に`Authorization`ヘッダが含まれている

## Location

- レスポンスが 302 などのリダイレクト系だった場合、リダイレクト先 URL を示す
  - ex. `Location: http://www.yyy.zzz/aaa.html`

### referer について

1. `a`タグに`target="\_blank"`を設定の際「rel=noreferrer」の設定が必要な理由、rel=noreferrer を設定しなかった場合に起きうる問題

- 秘匿情報を外部サイトに流出させてしまう可能性がある
  - target="\_blank"で開かれたページは、元のページを window.opener オブジェクトとして持つので、リンク先ページから元ページを操作できてしまう
  - [わかりやすい記事](https://yoru9zine.hatenablog.com/entry/2017/03/17/230729)

2. 同じオリジンの時は referer の情報を全部送って、別オリジンの時は、オリジン情報だけを referer として送信する際、HTTP ヘッダーに追加する値

- `Referrer-Policy: strict-origin-when-cross-origin`
- `<meta>`タグでも追加できる
  - ex. `<meta name="referrer" content="strict-origin-when-cross-origin" />`

# 学習リソース

## 書籍・ウェブサイト

- [WEB を支える技術](https://www.amazon.co.jp/dp/4774142042)
- [Real world HTTP](https://www.amazon.co.jp/dp/4873119030/)
- [MDN Web Doc](https://developer.mozilla.org/ja/docs/Web/HTTP)

## API ドキュメント

- [Twitter API reference index](https://developer.twitter.com/en/docs/api-reference-index)
- [Slack API](https://api.slack.com/apis)
