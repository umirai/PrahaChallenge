# 課題１

[実装後のリポジトリ（GitHub: hello-nextjs）](https://github.com/umirai/hello-nextjs)

1. 以下の props を受け取るボタンコンポーネントを作成

- children: ボタン内に表示される要素
- color: 'red', 'blue', 'green' のいずれか
- size: 'small', 'medium', 'large' のいずれか
- disabled: true/false のいずれか
- onClick: クリックされた際に実行される関数

2. 受け取った props の値に応じてボタンの見た目が変わるようにする

- children: ボタン内に表示される要素を変更できる
- color: 受け取った値に応じてボタンの背景色が変わる
- size: 受け取った値に応じてボタンの width と height が変わる
- disabled: ボタンの背景色が灰色になり、クリック不可になる
