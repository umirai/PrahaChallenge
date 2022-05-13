# 課題 1

## [ResusableButton](https://codesandbox.io/s/sad-davinci-51xe3?file=/src/App.js:119-120)に潜む問題点

- コンポーネントに余白が設定されていること
  - ボタン自身がレイアウトに関する責務を担ってしまっている

## 修正結果

```css
.reusable-button {
  color: red;
}
```
