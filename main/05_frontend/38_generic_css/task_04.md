# 課題 4

## [汎用的すぎるコンポーネント](https://codesandbox.io/s/aged-glade-6grnuk)に潜む問題点

- 「特化」のためのアクセス可能領域がクラス名のみであること
  - props からデータを受け取れるように修正すべし

## 修正結果

```js
// CustomButton.js
import styles from "./CustomButton.module.css";
export function CustomButton({className, color}) {
  const colorStyle = {color: color};
  return (
    <button className={styles.custombutton} style={{...colorStyle}}>
      click me!
    </button>
  );
}
```

```js
import {CustomButton} from "./CustomButton";
import styles from "./CustomBlueButton.module.css";
export function CustomBlueButton({color}) {
  return <CustomButton color={color} />;
}
```
