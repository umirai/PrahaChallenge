## 参考ページ

- [履歴テーブルについて](https://user-first.ikyu.co.jp/entry/history-table)
- [変更履歴を持つテーブルの設計](https://qiita.com/ak-ymst/items/2e8e92f212c807bb09a1)
- [データマイニングの実際](https://www.albert2005.co.jp/knowledge/data_mining/data_mining_basics/fact)

## task_01.pu で実装した場合

- メリット：SQL がシンプルで、履歴も取り回しやすい。
- デメリット：一覧表示本文見出しを表示したい場合に、結合処理が必要になるので重いかもしれない（？）

## task_01.pu で実装した場合

- メリット：一覧表示が早い
- デメリット：
  1. テーブルにカラム追加など変更があった場合に弱い
  2. 記事更新時に UPDATE と INSERT が必要。

## 分析用途のみで使用するデータを DB に保存する必要はあるのか

必要なし。データマートを活用して、元のテーブルデータを意味的に破壊することなく特定の条件下におけるデータを抽出して利用可能。
