# 課題 3

## `container`コンポーネント、`presentational`コンポーネントに分けるメリット

- SOLID になりテスト容易性を獲得できる
  - ロジックとビューを分離できるので、高凝集・低結合を実現できる
  - ロジックのテストが書きやすい
  - Storybook で状態も注入しやすい

## 自身のプロジェクトの任意コンポーネントを「Container」と「Presentational」に分割してみる

- [実装後のリポジトリ（GitHub: hello-nextjs）](https://github.com/umirai/hello-nextjs)

## その他コンポーネントを「controlled」と「uncontrolled」に区別するメリット・デメリット

- controlled コンポーネント（制御コンポーネント）

  - 普通に state を使う
  - ほとんどの場合で推奨されるらしい
  - メリット
    - 同期的に入力制御可能
  - デメリット
    - 普通に state を使うので再レンダリングは非制御の時より増える

- uncontrolled コンポーネント（非制御コンポーネント）

  - `stateを`で持つようなデータを`ref`を用いて DOM に保持する
  - 基本的には非推奨らしい（でも有名な react hook form は非制御らしい）
  - メリット
    - state を経由しないこと
      - その分再レンダリングが減る
      - 他のフォームの入力状態に応じて入力内容を変換したりできる
  - デメリット
    - ref で実装するので大変そう
