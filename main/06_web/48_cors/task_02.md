# 課題 2（クイズ）

## 1. CORS を設定しなくても Same-Origin Pocily の影響を受けないケース（HTML タグの使い方）を３つあげてください（結構たくさんあるみたいです）。

<details>
<summary>回答</summary>

- `<img>`タグの`src`属性で読み込んだ画像
- `<link>`タグの`href`属性で読み込んだ CSS
- `<script>`タグの`src`属性で読み込んだ JS
- `<form>`タグの`action`属性で設定した送信先 URL
- `<video>`, `<audio>`の`src`属性で読み込んだマルチメディアファイル
- `<iframe>`, `<frame>`タグの`src`属性で読み込んだ別サイトのコンテンツ

[参照したブログ記事](https://pandadannikki.blogspot.com/2021/11/riss-http05.html)

</details>

## 2. XMLHttpRequest を使ったクロスオリジンリクエストでクッキーを設定するために、以下の設定を行いました。クッキーは設定できるでしょうか？

- XHMLHttpRequest オブジェクトの `withCredential`フラグを true にする
- レスポンスに以下のヘッダを設定する
  - `Access-Control-Allow-Credential: true`
  - `Access-Control-Allow-Origin: *`

<details>
<summary>回答</summary>
できない。ワイルドカードを設定すると`Credentials`の設定がサポートされないため。
</details>

## 3. XHR より新しい API である FetchAPI を使ったクロスオリジンリクエストでクッキー情報を含むための設定は何でしょうか？

<details>
<summary>回答</summary>

`{ credenteial: "include" }`オプションを設定する

</details>
