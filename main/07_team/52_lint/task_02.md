# 課題 2（実装）

## ローカル環境で commit を行う際に lint エラーがある場合は commit を禁止するような pre-commit hook を作成

1. husky と lint-staged をインストール - [Commit Log](https://github.com/umirai/express-server/commit/497a66d69d07535898595b6e40535028aecbafa7)

```sh
$ yarn add -D husky lint-staged
```

2. lint-staged の設定 - [Commit Log](https://github.com/umirai/express-server/commit/acc3732eef544b9b754a4bc5604427b1a811cc82)

```json
// package.jsonに以下の設定を追加しておくと、ステージング状態の時に対象ファイルにeslint --fixを実行できる
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
  ]
}
```

3. Git hooks の有効化、hooks の作成 - [Commit Log](https://github.com/umirai/express-server/commit/2df80372c50e23269ea8fe69c0075ab2fa4b5df4)

`.husky`ディレクトリが作成される

```sh
$ yarn husky install
```

```json
// package.jsonに次のスクリプトを追加しておくと、git clone時にも自動でGit hooksを有効化できる
"scripts": {
  "prepare": "husky install"
}
```

```sh
# pre-commit時の実行ファイルを作成
$ yarn husky add .husky/pre-commit "yarn lint-staged"
```

4. この状態で ESLint エラーになるファイルを追加してコミットするとしっかりとエラーになった

```
um@MirainoMacBook-Pro express-server % git commit -m 'add: huskyTest.jsを追加'
yarn run v1.22.17
$ /Users/um/app/_praha/express-server/node_modules/.bin/lint-staged
✔ Preparing lint-staged...
❯ Running tasks for staged files...
  ❯ package.json — 1 file
    ❯ *.{js,jsx,ts,tsx} — 1 file
      ✖ eslint --fix [FAILED]
↓ Skipped because of errors from tasks. [SKIPPED]
✔ Reverting to original state because of errors...
✔ Cleaning up temporary files...

✖ eslint --fix:

/Users/um/app/_praha/express-server/src/huskyTest.js
  1:7  error  'hogehoge' is assigned a value but never used  no-unused-vars

✖ 1 problem (1 error, 0 warnings)
```

### 参照

- [husky - 公式マニュアル](https://typicode.github.io/husky/#/?id=manual)
- [husky v6 のインストール方法と使い方。lint-staged も導入して、品質を保とう](https://fwywd.com/tech/husky-setup)

## ローカル環境での pre-commit hook だけで防げないこと、問題点

- 普通に無視できちゃうため。仕組みでの解決からは一歩遠い。
