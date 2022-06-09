# 課題 1

## 前提： クロスオリジンとは

- プロトコル + ホスト + ポート = オリジン

  - プロトコル、ホスト、ポートが全て一致すれば、セイムオリジン
  - ひとつでも一致しなければ、クロスオリジン

- ちなみに、cookie をサードパーティー判定する際の、sameSite, crossSite はまた別
  - site はホストのみで比較する、要は別プロトコルでも sameSite 判定になる

## CORS の仕組み（必要な単語：プリフライトリクエスト、シンプルリクエスト、Access-control-allow-origin）

### `プリフライトリクエスト`

- 実際のリクエストの送信前に OPTIONS メソッドによる HTTP リクエストをクロスオリジンに向けて送信し、実際のリクエストを送信しても安全かどうかを確かめるリクエスト
  - シンプルリクエストの条件を満たさないリクエストの場合は全てプリフライトリクエストが飛ぶ
  - 安全であることが確認されたら、2 回目に通常のリクエストが飛ぶ

### `シンプルリクエスト`

- 以下条件を全て満たすリクエスト
  1. リクエストの HTTP メソッドが GET,HEAD,POST のいずれか
  2. 自動付与されるものを除き次のヘッダ以外は設定されていないこと
     - Connection
     - User-Agent
     - Accept
     - Accept-Language
     - Content-Language
     - Content-Type は以下のいずれか
       - application/x-www-form-urlencoded
       - multipart/form-data
       - text/plain
  3. リクエストに使用されるどの XMLHttpRequestUpload にもイベントリスナーが登録されていない
  4. リクエストに ReadableStream オブジェクトが使用されていないこと

### `Access-Control-Allow-Origin`

- リクエストを許可するオリジンを指定する http ヘッダー
  - `a.com`から`b.com`にリクエストをすると、`b.com`から帰ってくるリクエストのこのヘッダをチェックする
  - `Access-Control-Allow-Origin`に`a.com`を含む設定であれば 200、そうでなければエラーになる

### `CORS とは`

同一生成元ポリシー（`same-origin-policy`）によるオリジン間の通信制限を緩和し、オリジン間でリソースを共有するための手続きのこと

### `CORS のしくみ`

#### 概要

ブラウザはオリジン間リクエストの際、**オリジン間 HTTP リクエスト**を行う。オリジン間は HTTP リクエストは２種類に区別され、シンプルリクエストとプリフライトリクエストにわかれる（その違いについては前述の通り）。

#### シンプルリクエストの場合

1. プリフライトなしでサーバーにリクエストする
   - オリジン間リクエストの場合、ブラウザからのリクエストには`Origin`ヘッダが含まれる
2. サーバーはリクエストの`Origin`ヘッダを確認する
   - 信頼できる Web サイトのオリジンであれば、次に進む
     - 信頼できる Web サイトとは・・・？https であること？
3. サーバーは`Access-Control-Allow-Origin`ヘッダーをセットしてレスポンスする
4. ブラウザはレスポンスの`Access-Control-Allow-Origin`ヘッダーを確認する
   - サーバーから適切な許可があればレスポンスデータを使う
   - 許可が確認できなければエラーになる

#### プリフライトリクエストの場合

1. プリフライトリクエストする
   - ヘッダーにはオリジン情報の他、本リクエストしたい HTTP メソッド種別、ヘッダー情報などが含まれる
   ```
   // sample
   Origin: https://foo.example
   Access-Control-Request-Method: POST
   Access-Control-Request-Headers: X-PINGOTHER, Content-Type
   ```
2. サーバーはそのリクエストを受け入れ可能かどうか判断し、プリフライトレスポンスを返す
   - `Access-Control-Allow-***`ヘッダによってアクセスを許可するオリジン、メソッド、ヘッダー、プリフライトレスポンスをキャッシュしてよい時間を返す
   ```
   // sample
   Access-Control-Allow-Origin: https://foo.example
   Access-Control-Allow-Methods: POST, GET, OPTIONS
   Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
   Access-Control-Max-Age: 86400
   ```
3. その後本リクエストが実行される

## Access-Control-Allow-Origin: \* の設定が問題となるケースと設定すべきでない理由

- cookie を使用できなくなる
  - ワイルドカード指定ではセキュリティリスクが上がるため

## 「シンプルなリクエスト」に該当するための条件

- 前述の通り

## シンプルなリクエストでレスポンスの Access-Control-Allow-Origin ヘッダーに、リクエスト送信元のオリジンが含まれない場合のブラウザの挙動

ネットワークエラーを発生させる。が、エラーの内容（ステータス、ステータスメッセージ、ヘッダリスト、ボディなどが）はセキュリティ上の理由で表示しないため、エラーになった理由を知ることはできない。

## HTML の a タグを辿って異なるオリジンに移動する際に CORS 制約が発生しない理由

- Same-Origin Policy に該当しないため
  - 異なるオリジンへの「移動」は、オリジン A からクロスオリジンのリソースを「使う」こととは異なる

## XMLHttpRequest を使ったクロスオリジンリクエストでクッキー情報を含むための設定

### クライアント

XHMLHttpRequest オブジェクトの `withCredential`フラグを true にする

### サーバー

シンプルリクエストまたはプリフライトリクエストへのレスポンスに、以下のヘッダを設定する

- `Access-Control-Allow-Credential: true`
- `Access-Control-Allow-Origin: [リクエストを許可したいオリジン名]`
