# Atomic Design とは

コンポーネント単位でデザインを考える手法。
実装段階ではコンポーネントを以下５層に分類する。

## atom

- 最小単位のコンポーネント
- 他のコンポーネントに依存しない
- ドメイン知識を持たない

## molecule

- atom や molecule を組み合わせてつくるコンポーネント
- ドメイン知識を持たない

## organism

- atom や molecule を組み合わせて作るコンポーネント（よく挙げられる例にヘッダーやフッターなど）
- ドメイン知識を持つ（コンテンツが入る）

## template

- atom や molecule や organism を組み合わせてつくるレイアウトのようなもの（コンテンツは持たない）
- ロジックを持たない

## page

- すべてを組み合わせてつくる最終的なページコンポーネント
- API リクエストはここから

# FunctionComponent と ClassComponent の違い

## 関数コンポーネント

- React Hook が使える
- props を直接受け取る

## クラスコンポーネント（非推奨）

- React Hook は使えない
- ライフサイクルメソッドがある
- props を React.component クラスのプロパティとして継承して受け取る
- コードが長い
- ErrorBoundary になれるのはクラスコンポーネントだけ

## サンプルコード

[link: codesandbox](https://codesandbox.io/s/spring-moon-jw3enq?file=/src/App.js)

```js
export default function App() {
  const [count, setCount] = React.useState(0);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <p>Count: {count}</p>
      <div style={{display: "flex", justifyContent: "center"}}>
        <DecreaseButton setCount={setCount} />
        <IncreaseButton setCount={setCount} />
      </div>
    </div>
  );
}

// クラスコンポーネント
class DecreaseButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setCount: this.props.setCount,
    };
  }

  render() {
    return (
      <button onClick={() => this.props.setCount((prevCount) => prevCount - 1)}>
        -
      </button>
    );
  }
}

// 関数コンポーネント
const IncreaseButton = ({setCount}) => {
  return (
    <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
  );
};
```
