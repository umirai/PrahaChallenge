# クイズ

## 1. 次のレスポンスには `Cache-Control`は付与されていませんが、この場合キャッシュの仕様はどうなるでしょうか。

```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 256
Last-Modified: Tue, 22 Feb 2022 22:22:22 GMT
Date: Thu, 20 Feb 2020 00:00:00 GMT

<!doctype html>
...
```

## 2. `Cache-Contorl`:`private`を指定する他に、Basic 認証を行うページなど、`Authorization`ヘッダのついたリクエストでは、共有キャッシュにはレスポンスが保存されませんが（[参照](https://www.rfc-editor.org/rfc/rfc9111#section-3.5-1)）、そのようなページでも共有キャッシュに保存した方が効果的なリソースはあるはずです。

1. どのようなリソースが考えられるでしょうか？
2. その場合（`Authorization`ヘッダがある場合）でも、共有キャッシュにそれらのリソースを保存するにはどうすればいいでしょうか？

## 3. キャッシュの検証の流れについて「強い検証」「弱い検証」のキーワードを用いて簡単に説明してください。
