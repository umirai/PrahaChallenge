# 実装

## アトミックデザインによる実装

- [デザイン](https://tailwindcomponents.com/component/blog-page/landing)
- [実装後のリポジトリ（GitHub: hello-nextjs）](https://github.com/umirai/hello-nextjs)

※ 必ず atom, molecule, organism, template, page 層を含める

## 「position: absolute」を使ってはいけない理由

表示崩れの原因になりやすいから

## 各層ごとに設けたいルール

### atom & molecule

- 汎用的に作る
  - ドメイン知識を持たない（＝いろんなコンテンツが入るように作る）
  - スタイル（特に余白など配置に関連してくるもの）は呼び出し側から自由に設定できるように
  - できるだけ状態を持たないように作る

### organism

- ドメイン知識を持つ
  - 汎用的につくられた atom, molecule に特定ドメインのデータが入って具体的なコンテンツになるイメージ

### template

- レイアウトに徹する
- ロジックは持たない

### page

- API 通信はここから
- スタイルを持たない
