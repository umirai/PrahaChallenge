# `git diff`

- [よくまとまっていた記事](https://qiita.com/rana_kualu/items/09d2dd379019b8ef0335)に詳細を譲る
- これまで VSCode の差分比較しか使ったことがなかった（それで事足りていた）
  - コマンドでしかできない便利なユースケースってあるの？を聞いてみたい

# `git status`

[git status -s でちょっと幸せになれる - Qiita](https://qiita.com/tommy_aka_jps/items/af536a7c20747f99aa42)

```bash
# -s オプションは（short）の略：短く出力してくれるのでちょっと幸せになる
git status -s
```

# `git add -p`

[Git - 対話的なステージング](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%81%95%E3%81%BE%E3%81%96%E3%81%BE%E3%81%AA%E3%83%84%E3%83%BC%E3%83%AB-%E5%AF%BE%E8%A9%B1%E7%9A%84%E3%81%AA%E3%82%B9%E3%83%86%E3%83%BC%E3%82%B8%E3%83%B3%E3%82%B0)

- `-p` オプションはパッチモードの略

  - `git add -p` で 1 ファイルずつステージングするか聞いてくれる

    - そこで操作を選べる

      ```bash
      (1/1) Stage this hunk [y,n,q,a,d,e,?]? ?
      y - stage this hunk
      n - do not stage this hunk
      q - quit; do not stage this hunk or any of the remaining ones
      a - stage this hunk and all later hunks in the file
      d - do not stage this hunk or any of the later hunks in the file
      e - manually edit the current hunk
      ? - print help
      ```

      | 選択肢     | 意味                                                                                            |
      | ---------- | ----------------------------------------------------------------------------------------------- |
      | y (yes)    | このファイルを add する                                                                         |
      | n (no)     | このファイルを add しない                                                                       |
      | q (quit)   | パッチモードから抜ける （\* y を選択したファイルがあれば add された状態でパッチモードから抜ける |
      | a (all)    | y との違いがよくわからなかった                                                                  |
      | d (delete) | n との違いがよくわからなかった                                                                  |
      | e (edit)   | 手動でステージングする箇所を選ぶ（\* 今回の主役）                                               |
      | ?          | 上記のオプション表示                                                                            |

    - `e` を操作すると vim が起動
    - ステージングしたくない箇所を削除してファイル保存
    - 削除しなかった箇所のみステージングされる

  ## おまけ： `git add -i`

  - インタラクティブモードも便利そうだった
  - GUI でぽちぽちやっていたけど、Vimmer になるには使いこなしたい（？）

    - `git add -i` をすると次の操作を選べと出てくる

      1: status 2: update 3: revert 4: add untracked
      5: patch 6: diff 7: quit 8: help

    - よく使いそうなもの
      - `update`は、修正ファイルを 1 つずつ選んで add できる
      - `revert`は、add したファイルを 1 つずつ選んで reset できる
      - `add untracked`は、新規追加ファイルを 1 つずつ選んで add できる
      - `patch`は、前述の通りファイル内から指定箇所を add できる

# `git stash`

- デフォルトでは新規作成ファイルを含まないので、`git stash -u` で新規作成ファイルも退避する
  - `-u` は `—include-untracked` の略
- `git stash list`で退避中の作業を確認する

  ```bash
  ❯ git stash list
  stash@{0}: WIP on master: 9f609d9 add: test
  ```

- `git stash apply stash@{0}` で退避中の作業を元に戻す

  ```bash
  ❯ git stash apply stash@{0}
  On branch master
  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git restore <file>..." to discard changes in working directory)
  	modified:   index.css
  	modified:   index.html
  ```

# `git log <path>`

- 特定ファイルのコミットログを確認できる

# `git rebase`

<aside>
💡 **ユースケース**

1 - コミットログを一直線にする
2 - 複数コミットをまとめる

**注意点**
ローカルのみで使用する（リモートのコミットログを改変すると混乱を招く）

</aside>

[これで完璧! 図解でわかる git rebase の 2 つの使い方! | 侍エンジニアブログ](https://www.sejuku.net/blog/71919)

## コミットログを一直線にする

[【初心者向け】git rebase の基本](https://zenn.dev/mikaneko/articles/0fe1daf2e8a987)

1. `git rebase <branch>` : 現在の作業ブランチの開始地点に、最新の変更を取り込む
   1. その後コンフリクトあれば対応・・・

## 複数コミットをまとめる

[[小ネタ]git rebase でコミットをまとめる | DevelopersIO](https://dev.classmethod.jp/articles/putting-together-commits-with-git-rebase/)

1. `git rebae -i HEAD~5` : 直近 5 つのコミットを編集するモードに入る（Vim 起動）
2. `pick` などのプリフィックスを変更

   - プリフィックス

     | pick   | 何もしない     |
     | ------ | -------------- |
     | squash | 統合する       |
     | fixup  | 1 つにまとめる |
     | drop   | 削除する       |

3. ファイル保存して終了
4. コミットログを確認すると修正されている

# `git chekout -b <branch>`

<aside>
💡 現在のブランチから新しいブランチを生やす

</aside>

# `git clone --depth 1 <URL>`

<aside>
💡 最新履歴だけをクローンする（＊shallow cloneと呼ばれ、速いことがメリット）

</aside>

# コンフリクト対応

<aside>
💡 うまくコンフリクト解消するのが一番だが、ここではとりあえず元に戻す方法

</aside>

## 【前提】fetch, merge, pull について

[【初心者向け】git fetch、git merge、git pull の違いについて - Qiita](https://qiita.com/wann/items/688bc17460a457104d7d)

- master ブランチは３種類
  - リモートの `master` ブランチ
  - ローカルの `origin/master` **追跡ブランチ**（リモートの master ブランチを追跡する）
  - ローカルの `master` ブランチ
- master ブランチの情報を取り込む

  - `fetch`: リモートの master → ローカルの origin/master へ
  - `merge`: ローカルの origin/master → ローカルの master へ
  - `pull`: リモートの master → ローカルの master へ（`fetch` + `merge` を同時に行う）

  ```bash
  # ex1.
  $ git fetch origin master
  $ git merge origin/master

  # ex2. (1と同義）
  $ git pull origin master
  ```

## 1. `fetch` でコンフリクトしたとき

ローカルの master は更新されていないので、直前のコミットまで戻ってなかったことにする

```bash
$ git reset --hard HEAD
```

## 2. `pull` でコンフリクトしたとき

1. マージを取り消す

   ```bash
   $ git merge --abort
   ```

2. 直前のコミットまで戻ってなかったことにする

   ```bash
   $ git reset --hard HEAD
   ```

# エイリアスつくってみた

いい機会だったので！（＊どのくらい忘れずに使いこなせるかわからない）

| ss  | status      |
| --- | ----------- |
| co  | checkout    |
| cm  | commit -m   |
| adp | add -p      |
| rsa | resset .    |
| st  | stash       |
| stu | stash -u    |
| stl | stash list  |
| sta | stash apply |
