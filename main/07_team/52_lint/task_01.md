# 課題 1（質問）

## Lint を使う理由

- 不必要なバグを起こさない
- 可読性が良くなる
- 喧嘩にならないように w

## ESLint が定義するルールの中から便利そうな 5 つ

1. [no-console](https://eslint.org/docs/rules/no-console): `console.log`の消し忘れを教えてくれる
2. [sort-imports](https://eslint.org/docs/rules/sort-imports): import の並び替え、手動で意識していたので便利だと思った
3. [keyword-spacing](https://eslint.org/docs/rules/keyword-spacing): `{ key: 'hoge' }`のようにスペースを割り当てる（＊当たり前にやっているからこそ、チーム内で`{key:'hoge'}など詰まっていたら気になりそう
4. [prefer-template](https://eslint.org/docs/rules/prefer-template): 文字列連結にテンプレートリテラルを使用する
5. [array-callback-return](https://eslint.org/docs/rules/array-callback-return): 配列メソッドでは必ず return する（ループしたいだけなら for, forEach を使うようにする、意図が読みやすくなる）

- [参照: ESLint - rules](https://eslint.org/docs/rules/)

## [airbnb の ESLint](https://www.npmjs.com/package/eslint-config-airbnb)を使ってみる

[GitHub: express-server](https://github.com/umirai/express-server)で適用してみる。

1. ESLint をインストール - [Commit Log](https://github.com/umirai/express-server/commit/5ce4a2e58287c6043c73417d3e918c991d904f31)

```sh
# eslintをインストール
$ yarn add -D eslint eslint-plugin-import eslint-config-airbnb-base

# 設定ファイルを作成
$ yarn create @eslint/config

# 実行
$ yarn run eslint .
```

マッカッカだった！！

```
um@MirainoMacBook-Pro express-server % yarn run eslint .
yarn run v1.22.17
$ /Users/um/app/_praha/express-server/node_modules/.bin/eslint .

/Users/um/app/_praha/express-server/src/appServer.js
   1:35  error  Missing semicolon  semi
   3:28  error  Missing semicolon  semi
   5:30  error  Missing semicolon  semi
   8:48  error  Missing semicolon  semi
   9:3   error  Missing semicolon  semi
  13:18  error  Missing semicolon  semi
  15:33  error  Missing semicolon  semi
  16:3   error  Missing semicolon  semi
  18:27  error  Missing semicolon  semi

/Users/um/app/_praha/express-server/src/cacheServer.js
   1:35  error  Missing semicolon             semi
   3:30  error  Missing semicolon             semi
   6:51  error  Missing semicolon             semi
  13:18  error  Strings must use singlequote  quotes
  13:35  error  Strings must use singlequote  quotes
  13:57  error  Missing semicolon             semi
  14:6   error  Missing trailing comma        comma-dangle
  15:5   error  Missing trailing comma        comma-dangle
  16:2   error  Missing semicolon             semi
  23:18  error  Strings must use singlequote  quotes
  23:35  error  Strings must use singlequote  quotes
  23:60  error  Missing semicolon             semi
  24:6   error  Missing trailing comma        comma-dangle
  25:5   error  Missing trailing comma        comma-dangle
  26:2   error  Missing semicolon             semi
  28:29  error  Missing semicolon             semi

/Users/um/app/_praha/express-server/src/corsServer.js
   1:35  error    Missing semicolon             semi
   3:29  error    Missing semicolon             semi
   4:31  error    Missing semicolon             semi
  10:5   error    Missing semicolon             semi
  11:9   error    Missing semicolon             semi
  12:3   error    Missing semicolon             semi
  15:38  error    Missing semicolon             semi
  16:30  error    Missing semicolon             semi
  17:3   warning  Unexpected console statement  no-console
  17:19  error    Missing semicolon             semi
  18:3   error    Missing semicolon             semi
  21:40  error    Missing semicolon             semi
  22:16  error    Missing semicolon             semi
  23:3   warning  Unexpected console statement  no-console
  23:19  error    Missing semicolon             semi
  24:3   error    Missing semicolon             semi
  26:28  error    Missing semicolon             semi

/Users/um/app/_praha/express-server/src/index.js
   1:15  error    'ngrok' should be listed in the project's dependencies, not devDependencies  import/no-extraneous-dependencies
   1:31  error    Missing semicolon                                                            semi
   2:41  error    Missing semicolon                                                            semi
   3:35  error    Missing semicolon                                                            semi
   4:41  error    Missing semicolon                                                            semi
   5:43  error    Missing semicolon                                                            semi
   6:45  error    Missing semicolon                                                            semi
   8:32  warning  Unexpected console statement                                                 no-console
   8:56  error    Missing semicolon                                                            semi
   8:59  error    Missing semicolon                                                            semi
   9:29  warning  Unexpected console statement                                                 no-console
   9:53  error    Missing semicolon                                                            semi
   9:56  error    Missing semicolon                                                            semi
  10:32  warning  Unexpected console statement                                                 no-console
  10:56  error    Missing semicolon                                                            semi
  10:59  error    Missing semicolon                                                            semi
  11:33  warning  Unexpected console statement                                                 no-console
  11:57  error    Missing semicolon                                                            semi
  11:60  error    Missing semicolon                                                            semi
  12:34  warning  Unexpected console statement                                                 no-console
  12:58  error    Missing semicolon                                                            semi
  12:61  error    Missing semicolon                                                            semi
  16:1   error    Expected an assignment or function call and instead saw an expression        no-unused-expressions
  16:2   error    Move the invocation into the parens that contain the function                wrap-iife
  16:3   warning  Unexpected unnamed async function                                            func-names
  18:19  error    Missing semicolon                                                            semi
  20:31  error    Missing semicolon                                                            semi
  21:40  error    Missing semicolon                                                            semi
  22:3   warning  Unexpected console statement                                                 no-console
  22:29  error    Missing semicolon                                                            semi
  25:34  error    Missing semicolon                                                            semi
  26:5   error    Missing semicolon                                                            semi

/Users/um/app/_praha/express-server/src/mySite.js
   1:35  error  Missing semicolon  semi
   2:46  error  Missing semicolon  semi
   4:25  error  Missing semicolon  semi
   5:27  error  Missing semicolon  semi
   6:33  error  Missing semicolon  semi
  10:25  error  Missing semicolon  semi
  11:3   error  Missing semicolon  semi
  13:24  error  Missing semicolon  semi

/Users/um/app/_praha/express-server/src/otherSite.js
   1:35  error  Missing semicolon       semi
   3:28  error  Missing semicolon       semi
  26:9   error  Missing semicolon       semi
  27:4   error  Missing trailing comma  comma-dangle
  28:4   error  Missing semicolon       semi
  30:27  error  Missing semicolon       semi

✖ 88 problems (79 errors, 9 warnings)
  77 errors and 0 warnings potentially fixable with the `--fix` option.
```

2. ひとまず一度実行してみた。- [Commit Log](https://github.com/umirai/express-server/commit/8743e1a19c8926bbf8e49254debcc8a918780f84)

```
um@MirainoMacBook-Pro express-server % yarn run eslint . --fix
yarn run v1.22.17
$ /Users/um/app/_praha/express-server/node_modules/.bin/eslint . --fix

/Users/um/app/_praha/express-server/src/corsServer.js
  17:3  warning  Unexpected console statement  no-console
  23:3  warning  Unexpected console statement  no-console

/Users/um/app/_praha/express-server/src/index.js
   1:15  error    'ngrok' should be listed in the project's dependencies, not devDependencies  import/no-extraneous-dependencies
   8:32  warning  Unexpected console statement                                                 no-console
   9:29  warning  Unexpected console statement                                                 no-console
  10:32  warning  Unexpected console statement                                                 no-console
  11:33  warning  Unexpected console statement                                                 no-console
  12:34  warning  Unexpected console statement                                                 no-console
  16:1   error    Expected an assignment or function call and instead saw an expression        no-unused-expressions
  16:3   warning  Unexpected unnamed async function                                            func-names
  22:3   warning  Unexpected console statement                                                 no-console

✖ 11 problems (2 errors, 9 warnings)
```
