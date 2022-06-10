# 課題１（質問）

## サードパーティクッキーとファーストパーティクッキーの違い

- 発行元に違いがある
  - ファーストパーティクッキー
    - 現在訪問しているドメインで発行されて送受信されているクッキー
  - サードパーティクッキー
    - 現在訪問しているドメインとは異なるドメインから発行されて送受信されているクッキー

## サードパーティ Cookie を用いて広告配信ネットワーク（例えば Google AdSense など）がどのようにユーザの訪問履歴を把握しているか

＊ユーザーが訪れた EC サイトを`shop.com`, 広告配信ネットワークを`ad.com`として考える

1. ユーザーは`shop.com`に訪問
2. そのショップに次ような`<iframe>`の広告が埋め込まれている
   ```html
   <main>
     <!-- 何かしらのコンテンツ。ECサイトで本を見ていたとする。 -->
   </main>
   <aside>
     <iframe src=https://ad.com?xxx=xxxxxx></iframe>
   </aside>
   ```
   → この時点で`ad.com`にリクエストが飛び、`ad.com`からユーザーに Cookie（id=XXXXXX など）が付与される
3. ユーザーは別のサイトに訪問する
4. そのサイトにも`ad.com`の広告が埋め込まれている
   ```html
   <main>
     <!-- 何かしらのコンテンツ -->
   </main>
   <aside>
     <iframe src=https://ad.com></iframe>
   </aside>
   ```
   → この`<ifram>`を取得するためにユーザーはリクエストを送信することになり、そこで`shop.com`アクセス時に付与されたクッキー情報が`ad.com`に送信される
   ```
   GET / HTTP/1.1
   Host: ad.com
   Cookie: id=XXXXXX
   ```
5. `ad.com`は cookie から、「この人は`shop.com`で本を見ていた人だ」と特定し、それにちなんだ広告をレスポンスで返す。

- [参照になった記事](https://blog.jxck.io/entries/2020-02-25/end-of-idyllic-cookie.html#analytics)

## サードパーティークッキーはどのように生成されるのか（画像埋め込みやスクリプト埋め込みなど）

前述の回答の通り、

1. サードパーティーなサイトにリクエストを飛ばす
2. サードパーティーなサイトからのリクエストでクッキーを付与する

という手順が必要。

- 画像埋め込み、`<iframe>`埋め込み: 前述の通り
- スクリプト埋め込み: これはちょっとわからない。XXS の文脈であれば、脆弱性のあるサイトにフィッシング用のフォームを設けたりしてリクエストさせるなど（？）
- その他: `a.com`, `b.com`, 共通の認証基盤である`auth.com`などすべて異なるドメインでも、リダイレクトしながらサードパーティクッキーを使ってシングルサインオンを実現したりするそう（[参照](https://blog.jxck.io/entries/2020-02-25/end-of-idyllic-cookie.html#sso)）。

## サードパーティクッキーの扱いはブラウザによってどのような差があるのか

### Chrome

- デフォルトで`SameSite`属性を`Lax`に指定するようになった
  - `SameSite`が`Lax`のとき、クロスサイトには`TopLevelNavigation`かつ`safe`メソッドの場合のみクッキーが送信される
  - つまり`<img>`や`<iframe>`によるクッキーの送受信ができない

### Safari

- ITP (Intelligent Tracking Prevention)による機械学習で、トラッキングに使用されていそうなクッキーを削除する
  - 機械学習がどのように行われているのかはブラックボックス

### FireFox, Edge など

- デフォルトでブロックリストを設定できるようになっているらしい
  - FieFox では[Enhanced Tracking Prevention](https://support.mozilla.org/ja/kb/enhanced-tracking-protection-firefox-desktop)
  - Edge では[Tracking Prevention](https://blogs.windows.com/msedgedev/2019/06/27/tracking-prevention-microsoft-edge-preview/)

**いずれにしてもサードパーティクッキーは個人情報保護の観点からブロックされていく方針っぽい**

[参照になった記事](https://blog.jxck.io/entries/2020-02-25/end-of-idyllic-cookie.html#tracking-prevention)

## ドメインは同一で、ポートが異なるクッキーはファーストパーティクッキーか、サードパーティクッキーか

ファーストパーティクッキー。ドメインで判断するため。

# 実装

- [GitHub: express-server](https://github.com/umirai/express-server)
