# 課題 2

## 実装結果

[GitHub: next-render](https://github.com/umirai/next-render)

## SSR したファイル、SSG したファイルのビルド後の差分検証

### ssg:

- 生成されたファイル
  - ssg.html / ssg.js / ssg.js.nft.json / ssg.json
  - SSR にはない `html` と `json` があるぞ！
  - `json`には props が固定値で書かれていたのでこいつを参照しているっぽい
  ```json
  {
    "pageProps": {"data": {"subscribers": 6633, "stars": 188171}},
    "__N_SSG": true
  }
  ```

### ssr:

- 生成されたファイル
  - ssr.js / ssr.js.ntf.json
  - SSG にある `html` と `json`がない！
  - ssr.js が頑張ってリクエストごとに取得してくれているのだろうなと推察
