# Task3

## ビルド時間短縮のためにできること

- `node_modules`をキャッシュする
  https://docs.github.com/ja/actions/using-workflows/about-workflows#caching-dependencies

## GitHub 外のワークフローをフックする

- repository_dispatch を使う
  https://docs.github.com/ja/actions/using-workflows/events-that-trigger-workflows#repository_dispatch

## 特定のディレクトリ配下の変更を検知する

- paths 指定
- https://docs.github.com/ja/actions/using-workflows/triggering-a-workflow#using-filters-to-target-specific-paths-for-pull-request-or-push-events
- https://docs.github.com/ja/actions/using-workflows/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet

## ジョブの実行順序を指定する

- needs 指定
  https://docs.github.com/ja/actions/using-workflows/about-workflows#creating-dependent-jobs

## 秘匿性の高い環境変数を yml ファイル内で扱う

- GitHub アカウントに登録
  https://docs.github.com/ja/actions/using-workflows/about-workflows#storing-secrets
