# 課題 2

## [画面分割レイアウトのサンプル](https://codesandbox.io/s/great-margulis-ir96j?file=/src/App.js)に潜む問題点

- 子が親に依存しているので、呼び出し箇所によって見た目が変わってしまう
  - 親（App）コンポーネントで`text-align:center`している
  - 子（SideMenu, MainContent）は自分が flex-item であることを前提としている

## 修正結果

```css
.App {
  font-family: sans-serif;
  display: flex;
}

.sideMenu {
  min-width: 300px;
  text-align: center;
  background-color: blue;
}

.mainContent {
  width: 100%;
  text-align: center;
  background-color: red;
}
```

## （メモ） flex のショートハンドについて

```css
.sample {
  flex: 0 0 300px;
}
```

左から順に、flex-grow, flex-shrink, flex-basis を表す。

### `flex-grow`:

フレックスコンテナに余白があった場合に、どう分割するかを設定している。0 に設定すると他のフレックスアイテムと余白を等分する。他が 1 で自分が 2 の場合、他のフレックスアイテムに比べて 2 倍伸びる。

[（参照）MDN - flex-grow](https://developer.mozilla.org/ja/docs/Web/CSS/flex-grow)

### `flex-shrink`:

フレックスアイテムの合計横幅が、フレックスコンテナの横幅を超える（コンテナからはみ出してしまう）場合、そのフレックスアイテムがどのくらい縮小するかを設定している。0 に設定すると、そのフレックスアイテムはオリジナルのサイズを維持する。

[（参照）MDN - flex-shrink](https://developer.mozilla.org/ja/docs/Web/CSS/flex-shrink)

### `flex-basis`:

フレックスアイテムの横幅。width と同じだが、flex のショートハンドに加えられるので便利。

[（参照）MDN - flex-basis](https://developer.mozilla.org/ja/docs/Web/CSS/flex-basis)
