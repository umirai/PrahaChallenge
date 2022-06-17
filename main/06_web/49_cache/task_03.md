# キャッシュを使うべきではない状況

２つの観点がありそう

- 秘匿性（他人に見られてはいけない）
  - private でキャッシュすれば問題なし
- 鮮度（最新の情報が欲しい）
  - no-cache でバリデーションできる

しかし上記の通りディレクテブで対応できるのでは？と思い調べていくと・・・

> Therefore, HTTP cache requirements are focused on preventing a cache from either storing a non-reusable response or reusing a stored response inappropriately, rather than mandating that caches always store and reuse particular responses.

> したがって、HTTP キャッシュの要件は、キャッシュが常に特定のレスポンスを保存し再利用することを義務付けるのではなく、再利用できないレスポンスを保存したり、保存したレスポンスを不適切に再利用することを防ぐことに焦点が当てられています。（DeepL 翻訳）

キャッシュするためにヘッダ指定するのではなく、不適切なキャッシュを行わないため（＝原則キャッシュしようね）が仕様上の主張。キャッシュを「使うべきではない」という状況はなく、キャッシュの設定に気をつけるべき状況が冒頭のユースケースであるだけなのかも。

## 参照

- https://www.rfc-editor.org/rfc/rfc9111#name-overview-of-cache-operation）
