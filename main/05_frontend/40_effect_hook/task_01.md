# 課題 1

## 1. useEffect の中で何らかの関数を返す「cleanup」が必要な理由

- メモリリーク（実行中のプログラムが確保したメモリ領域を解放せずに放置されること）が発生しないようにするため
- バグ回避のため
- パフォーマンスの問題を引き起こさないため

[サンプルはこちら](https://ja.reactjs.org/docs/hooks-effect.html#explanation-why-effects-run-on-each-update)

### クリーンアップのタイミング

- コンポーネントが UI から削除される（アンマウントされる）前
- 新しい副作用が実行される前（ひとつ前の副作用をクリーンアップ）

### どんな実装になるのか

副作用内から何らかの関数を返せば、それがクリーンアップ関数になる。
クリーンアップが必要なければ、何も返す必要はなし。

```js
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

  // cleanup関数
  return function cleanup() {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };

  // 関数名は何でもいい（無名関数でもOK）
  // return () => {
  //   ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  // };
});
```

### React が DOM 更新後に追加のコードを実行したい場合がある

- クリーンアップを必要としない副作用の例：

  - リクエストの送信
  - 手動での DOM 改変
  - ログの記録など

    ＊コードが実行された後、React がそのことをすぐに忘れてもよいものにはクリーンアップは必要ない

- クリーンアップを必要とする副作用の例：

  - 外部のデータを購読する場合など

    ＊メモリリークが発生しないようにクリーンアップが必要

## 2. 下記の場合 useEffect のコールバックはいつ処理が実行されるか

- 第 2 引数に何も指定しなかった場合
  - 毎回のレンダー後
- 第 2 引数に空配列を指定した場合
  - マウント時のみ（クリーンアップはアンマウント時のみ）

### マウントとレンダー

- マウント：React コンポーネントを描画するために行われる処理（コンポーネントにあたるインスタンス作成、DOM ノード作成、DOM ツリーへの追加）
- アンマウント：DOM ツリーから DOM ノードを削除する処理
- レンダリング：React コンポーネントから DOM ノードを作成するための情報を読み込む処理

マウントは、最初に React コンポーネントが DOM に出力されるときに行われる一連の処理。
レンダリングは、React コンポーネントを DOM に出力するために様々な情報が読み込まれること。
マウント処理の中にレンダリングは含まれるが、レンダリングはマウント時のみ動くわけではなく、アップデートされる際にも動く。

[参照イメージ](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
